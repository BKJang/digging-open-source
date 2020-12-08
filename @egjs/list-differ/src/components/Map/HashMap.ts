import {tLiteralObject} from '../../types';

export default class HashMap<T> {
  private obj: tLiteralObject<T> = {};

  get(key: number | string): T {
    return this.obj[key];
  }

  set(key: number | string, value: T) {
    this.obj[key] = value;
  }
}
