import {IResult, IMapInteface} from '../types';
import HashMap from './Map/HashMap';
import PolyMap from './Map/PolyMap';

export function getMapInstance(
  findKeyCallback: any
): IMapInteface<any, number> {
  if (typeof Map === 'function') {
    return new Map();
  }
  if (findKeyCallback) {
    return new HashMap();
  }
  return new PolyMap();
}

export function diff<T>(
  prevList: T[],
  newList: T[],
  findKeyCallback?: (e: T, i: number, arr: T[]) => any
): IResult<T> {
  const prevKeyMap: IMapInteface<any, number> = getMapInstance(findKeyCallback);
  const newKeyMap: IMapInteface<any, number> = getMapInstance(findKeyCallback);
  const removedMap: IMapInteface<any, number> = getMapInstance(findKeyCallback);
  const defaultCallback = findKeyCallback || ((e: T) => e);
  const prevKeys = prevList.map(defaultCallback);
  const newKeys = newList.map(defaultCallback);
  const maintained: number[][] = [];
  const changedBeforeAdded: number[][] = [];
  const fixed: boolean[] = [];
  const changed: number[][] = [];
  const added: number[] = [];
  const removed: number[] = [];
  let removedCount = 0;
  let addedCount = 0;
  // prevKeys: [1, 2, 3, 4], newKeys: [2, 1, 6, 4, 8]
  // 1. Setting prevKeyMap, newKeyMap
  prevKeys.forEach((key, index): void => {
    prevKeyMap.set(key, index);
  });

  newKeys.forEach((key, index): void => {
    newKeyMap.set(key, index);
  });

  // 2. Setting removed and removedMap
  prevKeys.forEach((key, prevListIndex): void => {
    const newListIndex = newKeyMap.get(key);

    if (newListIndex === undefined) {
      removed.push(prevListIndex);
      ++removedCount;
    } else {
      removedMap.set(prevListIndex, removedCount);
    }
  });

  // 3. Setting maintained, changed, fixed, added, changeBeforeAdded
  newKeys.forEach((key, newListIndex): void => {
    const prevListIndex = prevKeyMap.get(key);

    if (prevListIndex === undefined) {
      added.push(newListIndex);
      ++addedCount;
    } else {
      const removedCount = removedMap.get(prevListIndex) || 0;
      maintained.push([prevListIndex, newListIndex]);
      fixed.push(prevListIndex === newListIndex);
      if (prevListIndex !== newListIndex) {
        changed.push([prevListIndex, newListIndex]);
      }
      changedBeforeAdded.push([
        prevListIndex - removedCount,
        newListIndex - addedCount,
      ]);
    }
  });

  removed.reverse();

  return {
    prevList,
    newList,
    added,
    removed,
    changed,
    maintained,
    changedBeforeAdded,
  };
}
