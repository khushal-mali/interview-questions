// const arr = [
//   [1, 2],
//   [3, 4],
//   [5, 6, [7, 8, 9, [10, 11, 12]]],
// ];

// const flattenArr = (arr) => {
//   const newArr = [];

//   for (const el of arr) {
//     if (Array.isArray(el)) {
//       newArr.push(...flattenArr(el));
//     } else {
//       newArr.push(el);
//     }
//   }

//   return newArr;
// };

// console.log(flattenArr(arr));
// console.log(arr.flat(3));

// console.log("4" * 6 + 5);
// console.log('5' - '3' + 6);

// const arr = ["z", "a", "d", "b", "e"];

// const sortedArr = (arr) => {
//   const newArr = [];

//   for (let i = 0; i < arr.length - 1; i++) {
//     const a = arr[i];
//     const b = arr[i + 1];

//   }
// };

// console.log(NaN == NaN)
// console.log(NaN === NaN)

// const str = "i am khushal mali";

// function getLongestString(str) {
//   if (typeof str !== "string") return;
//   const arr = str.split(" ");

//   let longestString = { string: "", length: 0 };

//   for (let i = 0; i < arr.length; i++) {
//     const currString = arr[i];
//     if (longestString.length < currString.length) {
//       longestString.string = currString;
//       longestString.length = currString.length;
//     }
//   }

//   return longestString;
// }

function getLongestWord(str) {
  if (typeof str !== "string") return;
  let longestWord = { string: "", length: 0 };

  str.split(" ").forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord.length = word.length;
      longestWord.string = word;
    }
  });

  return longestWord.string;
}

// console.log(getLongestWord(str));

function getFactorial(num) {
  if (num < 0) return;
  if (num === 1 || num === 0) return 1;

  const factorial = num * getFactorial(num - 1);
  return factorial;
}

// console.log(getFactorial(5));

// const arr1 = [1, 2, 3];
// console.log(arr1.find((el) => el < 10));

// Reverse a string without using built-in reverse()
// const revStr = "khushal";
// function reverseStr(str) {
//   let newStr = "";
//   for (let i = str.length - 1; i >= 0; i--) {
//     newStr += str[i];
//   }
//   return newStr;
// }
// console.log(reverseStr(revStr));

// Check if a string is a palindrome
// const palStr = "rtr";
// function palindromeString(str) {
//   if (typeof str !== "string") return;
//   const reversedStr = str.split("").reverse().join("");
//   return str === reversedStr;
// }
// console.log(palindromeString(palStr));

// Find factorial of a number (iterative & recursive)
// function factorialOfNumber(num) {
//   if (num === 0 || num === 1) return 1;
//   return num * factorialOfNumber(num - 1);
// }

// console.log(factorialOfNumber(5));

// Find Fibonacci sequence up to n terms

