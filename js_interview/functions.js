console.log("Arrow Vs Normal Functions");

// ;) Arguments object doesn't work in arrow function

function add() {
  const [a, b] = arguments;
  return a + b;
}

const arrAdd = (a, b) => a + b;

// console.log(add(1, 2));
// console.log(arrAdd(1, 2));

// ;) Arrow Function cannot be used as constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

const khushal = new Person("Khushal", 21);
// console.log(khushal);

// ;) this keyword does not work with Arrow Function.
const obj = {
  name: "suresh",
  age: 21,
  sayHello() {
    console.log(this);
    console.log("Hello " + this.name + `, this is your ${this.age}st birthday.`);

    // this keyword works here, why because this keywork will try to look up the nearest non arrow function scope and it finds obj as the scope
    const greetBirthday = () => {
      console.log(`Happy birthday, ${this.name}`);
    };
    greetBirthday();
  },

  sayBye: () => {
    // Won't work (this will refer to global/window object)
    console.log(this);
    console.log(`Bye ${this?.name}`);
  },
};

obj.sayHello();
obj.sayBye();
