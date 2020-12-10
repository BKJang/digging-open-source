interface DiffResult<T> {
  prevList: T[];
  list: T[];
  added: number[];
  removed: number[];
  changed: number[][];
  maintained: number[][];
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
  const maintained:[][] = [];
  const fixed:boolean[] = [];
  const changed:[][] = [];
  // const changedBeforeAdded:[][] = [];

  prevKeys.forEach((key, index) => {
    
  });
  console.log('hellow diff')


  return {
    prevList,
    list,
    added: [],
    removed: [],
    changed: [],
    maintained: [],
    // ordered: [],
    // pureChanged: [],
  }
}

