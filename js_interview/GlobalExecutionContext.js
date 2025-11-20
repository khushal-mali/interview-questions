// Javascript will create a global execution context having two phases names memory phase and code phase and will load all the variable in memory phase

console.log("A");

new Promise((res, rej) => {
  setTimeout(() => {
    res();
  }, 1000);
}).then(() => {
  console.log("C");
});

setTimeout(() => {
  console.log("D");
}, 0);

console.log("B");
