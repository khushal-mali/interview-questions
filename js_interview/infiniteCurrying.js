console.log("Infinite Currying...");
// multiply(2)(3)(4)()

function multiply(a) {
  // console.log("a", a);

  return function (b) {
    // console.log("b", b);

    if (b) return multiply(a * b);
    return a;
  };
}

console.log(multiply(2)(3)(4)());
