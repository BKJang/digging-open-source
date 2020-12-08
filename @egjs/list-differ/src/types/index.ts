export interface IMapInteface<T, U> {
  get(key: T): U | undefined;
  set(key: T, value: U): void;
}
export type tMapConstructor<T, U> = new () => IMapInteface<T, U>;

export interface IListFormat<T> {
  [index: number]: T;
  length: number;
}

export interface IResult<T> {
  prevList?: T[];
  newList?: T[];
  added?: number[];
  removed?: number[];
  changed?: number[][];
  ordered?: number[][];
  pureChanged?: number[][];
  maintained?: number[][];
  changedBeforeAdded?: number[][];
}

export type tLiteralObject<T> = {
  [key in string | number]: T;
};
