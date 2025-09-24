// Flattern the Array
// input = [1, 2, 3, [4, 5, 6, [7, 8], 9], 10];
// output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const inputArr = [
  1,
  2,
  3,
  [4, 5, 6, [7, 8], 9],
  10,
  [11, [12, 13], [14, 15, 16], 17, 18],
  [19, 20],
];

////////////////////////////////////////////////////////////

// function flattenArray(arr) {
//   if (!Array.isArray(arr)) return;
//   const result = [];

//   const nestedFlattenArray = function (arr2) {
//     for (let i = 0; i < arr2.length; i++) {
//       if (Array.isArray(arr2[i])) {
//         nestedFlattenArray(arr2[i]);
//       } else {
//         result.push(arr2[i]);
//       }
//     }
//   };

//   nestedFlattenArray(arr);

//   return result;
// }

////////////////////////////////////////////////////////////

// function flattenArray(arr) {
//   if (!Array.isArray(arr)) return;

//   return arr.flat(Infinity);
// }

////////////////////////////////////////////////////////////

const flattenArray = (arr) =>
  arr.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flattenArray(curr) : curr),
    []
  );

console.log(flattenArray(inputArr));
