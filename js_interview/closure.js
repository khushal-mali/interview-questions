// Closure ;)

function increment() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const plus = increment();

// console.log(plus());
// console.log(plus());
// console.log(plus());

// Memoization
const memoizedSquare = () => {
  const cached = {};

  return function (n) {
    if (n in cached) return cached[n];

    cached[n] = n * n;
    return cached[n];
  };
};

const memoSquare = memoizedSquare();

console.time();
console.log(memoSquare(5)); // calculates square
console.timeEnd();

console.time();
console.log(memoSquare(5)); // returns from cache
console.timeEnd();
