import {IResult, IListFormat} from '../types';
import {diff} from './utils';

class ListDiffer<T> {
  private list: T[];

  constructor(
    list: IListFormat<T> = [],
    private findKeyCallback?: (e: T, i: number, arr: T[]) => number | string
  ) {
    this.list = [].slice.call(list);
  }

  public update(list: IListFormat<T>): IResult<T> {
    const newData: T[] = [].slice.call(list);
    const result = diff<T>(this.list, newData, this.findKeyCallback);

    this.list = newData;
    return result;
  }
}

export default ListDiffer;
