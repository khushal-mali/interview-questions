// Sorting

const prices = [2, 64, 23, 75, 3, 7, 43];
const names = ["khushal", "mali", "Rekha", "kunal", "kohli"];

// console.log(prices.sort((a, b) => a - b));

// use localCompare for string sorting
console.log(names.sort((a, b) => a.localeCompare(b)));
