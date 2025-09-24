console.log("Call, Apply, Bind");

const per1 = {
  name: "Ramesh",
  age: 20,
};

const per2 = {
  name: "Mangesh",
  age: 21,
};

const per3 = {
  name: "Kalpesh",
  age: 22,
};

function Introduce(status, salary) {
  console.log(
    `My self ${this.name}, I am ${this.age} year old. I am ${status} and my salary is ${salary}.`
  );
}

console.log("Call");
Introduce.call(per1, "Software Engineer", 100000);

console.log("Apply");
Introduce.apply(per2, ["Mechanical Engineer", 10000]);

console.log("Bind");
const biIntroduce = Introduce.bind(per3, "Electrical Engineer", 30000);
biIntroduce();
