type ToMapFromList<T> = (e: T, i: number, arr: T[]) => [T, number];

/**
 *
 * @memberof eg.ListDiffer
 * @static
 * @function
 * @param - Previous List <ko> 이전 목록 </ko>
 * @param - List to Update <ko> 업데이트 할 목록 </ko>
 * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
 * @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
 * @example
 * import { diff } from "@egjs/list-differ";
 * // script => eg.ListDiffer.diff
 * const result = diff([0, 1, 2, 3, 4, 5, 9, 10, 11], [7, 8, 0, 4, 3, 6, 2, 1, 11], e => e);
 * [ 0, 1, 2, 3, 4, 5, 9, 10, 11 ]
 * [ 7, 8, 0, 4, 3, 6, 2, 1, 11 ]
 * [ 0, 1, 5 ]
 * [ 7, 6, 5 ]
 * [ [ 0, 2 ], [ 4, 3 ], [ 3, 4 ], [ 2, 6 ], [ 1, 7 ] ]
 * [ [ 0, 2 ], [ 4, 3 ], [ 3, 4 ], [ 2, 6 ], [ 1, 7 ], [ 8, 8 ] ]
 * [ [ 0, 0 ], [ 4, 1 ], [ 3, 2 ], [ 2, 3 ], [ 1, 4 ], [ 5, 5 ] ]
 * [ false, false, false, false, false, true ]
 * console.log(result.prevList);
 * console.log(result.list);
 * console.log(result.added);
 * console.log(result.removed);
 * console.log(result.changed);
 * console.log(result.maintained);
 * console.log(result.changedBeforeAdded);
 * console.log(result.fixed);
 */
function diff<T>(
  prevList: T[],
  list: T[],
  findKeyCallback?: (e: T, i: number, arr: T[]) => any
) {
  const findKey = findKeyCallback
    ? findKeyCallback
    : (e: T, i: number, arr: T[]) => e;
  const toMapFromList: ToMapFromList<T> = (e: T, i: number, arr: T[]) => [
    findKey(e, i, arr),
    i,
  ];
  const makeCoupleIndexes = (findPrevKey: Function, findKey: Function) => (
    e: T
  ) => [findPrevKey(e), findKey(e)];
  const prevListMap = new Map(prevList.map(toMapFromList));
  const listMap = new Map(list.map(toMapFromList));

  const removedKeyList: T[] = [];
  const remainedKeyList: T[] = [];
  const addedKeyList: T[] = [];
  const changedKeyList: T[] = [];
  const maintainedKeyList: T[] = [];

  const fixed: boolean[] = [];

  prevListMap.forEach((i, e) => {
    if (listMap.has(e)) {
      remainedKeyList.push(e);
    } else {
      removedKeyList.push(e);
    }
  });
  listMap.forEach((i, e) => {
    if (prevListMap.has(e)) {
      maintainedKeyList.push(e);
      const isEqual = prevListMap.get(e) === listMap.get(e);
      fixed.push(isEqual);
      if (!isEqual) {
        changedKeyList.push(e);
      }
    } else {
      addedKeyList.push(e);
    }
  });

  const coupleIndexes = makeCoupleIndexes(
    prevListMap.get.bind(prevListMap),
    listMap.get.bind(listMap)
  );
  const changeBeforeAddedCoupleIndexes = makeCoupleIndexes(
    remainedKeyList.indexOf.bind(remainedKeyList),
    maintainedKeyList.indexOf.bind(maintainedKeyList)
  );

  const added = addedKeyList.map(listMap.get.bind(listMap));
  const removed = removedKeyList
    .map(prevListMap.get.bind(prevListMap))
    .reverse();
  const changed = changedKeyList.map(coupleIndexes);
  const maintained = maintainedKeyList.map(coupleIndexes);
  const changedBeforeAdded = maintainedKeyList.map(
    changeBeforeAddedCoupleIndexes
  );

  /**
   * 각각의 배열요소에는 3가지 상태가 있다.
   * 1. 새로운 요소인가
   * 2. 삭제한 요소인가
   * 3. 이동한 요소인가
   * added: 새로운 요소의 인덱스 목록
   * removed: 삭제한 요소의 인덱스 목록
   * changed: 이동한 요소의 prev 인덱스와 인덱스 쌍 목록
   * maintained: 새롭지도 않고 삭제하지도 않은 prev 인덱스와 list 인덱스 쌍 목록
   * changedBeforeAdded: 새롭지도 않고 삭제하지도 않은, 삭제를 먼저한 prev 인덱스와 추가를 하기 전의 list 인덱스 쌍 목록
   * fixed: 새롭지도 않고 삭제하지도 않았으며 이동하지도 않은 인덱스 목록
   *
   * 1. prevList를 삭제한 리스트와 삭제하지 않은 리스트로 나눈다
   * 2. List를 추가한 리스트와 추가하지 않은 리스트로 나눈다
   * 3. added 추가한 리스트 리턴
   * 4. removed 삭제한 리스트 리턴
   * 5. changed 삭제하지 않은 리스트에 추가하지 않은 리스트로 생성
   * 6. changedBeforeAdded 삭제하지 않은 리스트의 prev 인덱스 리스트와 추가하지 않은 리스트의 list 인덱스 쌍으로 생성
   * 7. maintained
   */
  return {
    prevList,
    list,
    added,
    removed,
    changed,
    maintained,
    changedBeforeAdded,
    fixed,
  };
}
