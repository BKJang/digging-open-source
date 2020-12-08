export default class PolyMap<T> {
  private keys: T[] = [];
  private values: T[] = [];

  get(key: T): T {
    const keyIndex: number = this.keys.indexOf(key);
    return this.values[keyIndex];
  }

  set(key: T, value: T) {
    const keys: T[] = this.keys;
    const values: T[] = this.values;
    const keyIndex: number = this.keys.indexOf(key);
    const index: number = keyIndex > 0 ? keyIndex : keys.length;

    keys[index] = key;
    values[index] = value;
  }
}
