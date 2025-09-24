/*
Hoisting is Javascript's default behavior of moving declarations to the top.
Why hoisting exists ? - Because JS has to allocate memory for variables.
*/

// console.log(a);
var a = 10;

// ;) ////////////////////////////////
// test();
// console.log(test);

var test = function () {
  console.log("Testing Function.");
};

// ;) ////////////////////////////////
var x = 10;

function printX() {
  // console.log(x);
  var x = 20;
  // console.log(x);
}

printX();
// console.log(x);

// ;) ////////////////////////////////
var y = 0;
while (y < 5) {
  // console.log(v);
  // var is getting stored in global/window scope not in block {} scope like (let & const)
  // That's why var is function scoped not block scope like (let & const)
  // var always looks up for function scope but in this case it does not have any function as parent so it is stored in global scope
  var v = "type";
  y++;
}

// same as above
function show() {
  if (true) {
    console.log(p);
    // var p will be hoisted in show() function because it is function scoped. it won't be accessible outside of the scope
    var p = 2;
    console.log(p);
  }
  console.log(p);
}

// show();
// console.log(p);

// ;) //////////////////////////////////
var pname = "name 1";
function print() {
  pname = "name 2";
  if (1 === 2) {
    // This line will create new var pname for print function using hoisting and pname will be seperate from pname which is outside of print function
    var pname = "name 3";
  }
}

print();

console.log(pname); // pname = "name 1", Reason:⬆️
