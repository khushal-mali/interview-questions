// Prototype

Array.prototype.sum = function () {
  return this.reduce((acc, ele) => acc + ele, 0);
};

console.log([1, 2, 3, 4].sum());

Date.prototype.getLastYear = function () {
  return this.getFullYear() - 1;
};

console.log(new Date().getLastYear());

class Animal {
  constructor(name) {
    this.name = name;
  }

  changeName(newName) {
    this.name = newName;
  }
}

const dog = new Animal("Tommy");

dog.changeName("Lily");
console.log(dog);
