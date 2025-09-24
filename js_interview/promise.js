const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      resolve(randomNumber);
    } else {
      reject("Operation Failed");
    }
  }, 1000);
});

const result = await myPromise;
// console.log(result);

function getSquare(n) {
  const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n % 2 === 0) {
        resolve(n * n);
      } else {
        reject("Cannot find Square.");
      }
    }, 1000);
  });

  return newPromise;
}

const squ4 = await getSquare(4);
console.log(squ4);
