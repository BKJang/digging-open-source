interface DiffResult<T> {
  prevList: T[];
  list: T[];
  added: number[];
  removed: number[];
  changed: number[][];
  maintained: number[][];
  // fixed: boolean[];
  // ordered: number[][];
  // pureChanged: number[][];
}

class PolyMap<T> {
  private keys: T[] = [];
  private values: number[] = [];
  public get(key: T): number {
    return this.values[this.keys.indexOf(key)];
  }
  public set(key: T, value: number) {
    const keys = this.keys;
    const values = this.values;
    const prevIndex = keys.indexOf(key);
    const index = prevIndex === -1 ? keys.length : prevIndex;

    keys[index] = key;
    values[index] = value;
  }
}

export function diff<T>(prevList: T[], list: T[]): DiffResult<T> {
  const mapClass = Map;
  const prevKeyMap = new mapClass();
  const keyMap = new mapClass();
  const callback = (e:T) => e;
  const prevKeys = prevList.map(callback);
  const keys = list.map(callback);
  const added:number[] = [];
  const removed:number[] = [];
  const maintained:number[][] = [];
  const fixed:boolean[] = [];
  const changed:number[][] = [];
  // const changedBeforeAdded:[][] = [];

  prevKeys.forEach((key, index) => {
    prevKeyMap.set(key, index);
  });
  keys.forEach((key, index) => {
    keyMap.set(key, index);
  })

  prevKeys.forEach((key, prevListIndex) => {
    const listIndex = keyMap.get(key);
    if (typeof listIndex === 'undefined') {
      removed.push(prevListIndex);
    } else {
      // TODO: 삭제 안된 데이터 removeMap 에 담기
    }
  })

  keys.forEach((key, listIndex) => {
    const prevIndex = prevKeyMap.get(key);
    if (typeof prevIndex === 'undefined') {
      added.push(listIndex);
    } else {
      maintained.push([prevIndex, listIndex]);
      // TODO: changedBeforeAdded
      fixed.push(prevIndex === listIndex);
      if(prevIndex !== listIndex) {
        changed.push([prevIndex, listIndex]);
      }
    }
  })

  return {
    prevList,
    list,
    removed,
    added,
    maintained,
    changed,
    // fixed,
    // ordered: [],
    // pureChanged: [],
  }
}

