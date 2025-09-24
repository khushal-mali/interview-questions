console.log("Method chaining");
// calculate().sum(10, 20).add(4).substaction(3).multiply(2).divide(2)

// const Calculate = {
//   value: 0,
//   sum(...args) {
//     const sumOfArgs = args.reduce((acc, curr) => acc + curr, 0);
//     this.value = sumOfArgs;
//     return this;
//   },
//   add(val) {
//     this.value = val + this.value;
//     return this;
//   },
//   multiply(val) {
//     this.value = this.value * val;
//     return this;
//   },
//   divide(val) {
//     this.value = this.value / val;
//     return this;
//   },
//   resultValue() {
//     return this.value;
//   },
// };

// console.log(Calculate.sum(3, 4).add(7).multiply(2).divide(3).resultValue());

// Using Classes
/////////////////////////////////////////////////////////////////////////////////////////

class Calculator {
  #initialValue; // # create private value

  constructor(initialVal) {
    this.#initialValue = initialVal;
    return this;
  }

  sum(...args) {
    const sumOfArgs = args.reduce((acc, curr) => acc + curr, 0);
    this.#initialValue = sumOfArgs;
    return this;
  }
  add(val) {
    this.#initialValue = val + this.#initialValue;
    return this;
  }
  multiply(val) {
    this.#initialValue = this.#initialValue * val;
    return this;
  }
  divide(val) {
    this.#initialValue = this.#initialValue / val;
    return this;
  }
  resultValue() {
    return this.#initialValue;
  }
}

const Calculate = new Calculator(0);

console.log(Calculate.sum(3, 4).add(7).multiply(3).divide(2).resultValue());
