import { diff } from './utils';
// console.log('Try npm run lint/fix!');

// const longString =
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut aliquet diam.';

// const trailing = 'Semicolon';

// const why = 'am I tabbed?';

// export function doSomeStuff(
//   withThis: string,
//   andThat: string,
//   andThose: string[]
// ) {
//   //function on one line
//   if (!andThose.length) {
//     return false;
//   }
//   console.log(withThis);
//   console.log(andThat);
//   console.dir(andThose);
//   return;
// }
// TODO: more examples

const diffA = diff([1,2,3,4], [2,1,6,4,8]);
console.log(JSON.stringify(diffA, null, 2));