// Curring ;)

// Non-Curring Function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3));

// Curring Function
function curringAddFunction(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// Curring Function using Arrow Function
const currAddFunction = (a) => (b) => (c) => a + b + c;

console.log(curringAddFunction(1)(2)(3));
console.log(currAddFunction(1)(2)(3));

// const dressPrice = (price) => (discountPercentage) =>
//   price - (discountPercentage / 100) * price;

const dressPrice = (price) => (discountPercentage) =>
  price * (1 - discountPercentage / 100);

const calAmountAfterAddDiscount = dressPrice(1000);

console.log(calAmountAfterAddDiscount(20));
console.log(calAmountAfterAddDiscount(40));
console.log(calAmountAfterAddDiscount(60));

