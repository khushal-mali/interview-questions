// // // // // // let x = {},
// // // // // //   y = { name: "Satish" },
// // // // // //   z = { name: "Pratik" };

// // // // // // console.log(x);

// // // // // // x[y] = { name: "Salman" };
// // // // // // x[z] = { name: "Shahrukh" };

// // // // // // console.log(x[y]);

// // // // // // console.log(x); // output: shahrukh

// // // // // console.log(isNaN(undefined));
// // // // // console.log(isNaN("Khushal"));
// // // // // console.log(undefined === "Khushal");

// // // // // console.log(1 > 2 < 3);

// // // // // function add(a) {
// // // // //   return function (b) {
// // // // //     return function (c) {
// // // // //       return a + b + c;
// // // // //     };
// // // // //   };
// // // // // }

// // // // // const add = (a) => (b) => (c) => a + b + c;

// // // // // console.log(add(2)(3)(4));

// // // // const [a, b, c, ...d] = [1, 2, 3, 4, 5];

// // // // const { name } = { name: "Khushal", surname: "Mali" };

// // // // console.log(a, b, c, ...d);
// // // // console.log(name);

// // // // for (var i = 0; i < 3; i++) {
// // // //   // console.log(i);
// // // //   setTimeout(() => console.log(i), 2000);
// // // // }

// // // let a = 5;
// // // let b = 6;

// // // [b, a] = [a, b];

// // // // console.log(a, b);

// // // const reverseStr = (str) => {
// // //   if (typeof str !== "string") {
// // //     throw new Error("Only strings will be accepted");
// // //   }

// // //   return str.split("").reverse().join("");
// // // };

// // // console.log(reverseStr("khushal"));

// // let x;

// // console.log(x);

// console.log(b);

// var b;

function outer() {
  const a = 4;

  function inner() {
    console.log(a);
  }

  inner();
}

outer();

// console.log(a);
