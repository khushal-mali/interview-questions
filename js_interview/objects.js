// function Person(name, age, profession, contact) {
//   this.name = name;
//   this.profession = profession;
//   this.age = age;
//   this.contact = contact;
// }

class Person {
  constructor(name, age, profession, contact) {
    this.name = name;
    this.profession = profession;
    this.age = age;
    this.contact = contact;

    this.getInfo = function () {
      console.log(`My name is ${this.name}, and age is ${this.age}`);
    };
  }
}

const person1 = new Person("Khushal", 22, "Software Developer", 8479389483);
const person2 = new Person("Ramesh", 21, "Engineer", 8474943728);
console.log(person1.getInfo());
console.log(person2.getInfo());
