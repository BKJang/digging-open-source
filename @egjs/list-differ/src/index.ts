import ListDiffer from './components/ListDiffer';

// prevKeys: [1, 2, 3, 4], newKeys: [2, 1, 6, 4, 8]

const listDiffer = new ListDiffer([1, 2, 3, 4]);
const result = listDiffer.update([2, 1, 6, 4, 8]);
console.log(result);
export default ListDiffer;
