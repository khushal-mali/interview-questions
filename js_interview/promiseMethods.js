console.log("Promise Methods");

function getSquare(n, delay) {
  const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n % 2 === 0) {
        resolve(n * n);
      } else {
        reject("Cannot find Square.");
      }
    }, delay);
  });

  return newPromise;
}

const getData = async () => {
  // 1)
  // const squ4 = await getSquare(4);
  // const squ6 = await getSquare(6);
  //////////////////////////////////////////////////////
  // 2) Promise.all in this methode if one of the requests get failed then all the requests fail.
  // try {
  //   const [squ4, squ6] = await Promise.all([getSquare(4, 1000), getSquare(6, 2000)]);
  //   console.log(squ4, squ6);
  // } catch (error) {
  //   console.error(error);
  // }
  //////////////////////////////////////////////////////////////
  // 3) Promise.allSettled here we get proper error handling
  try {
    const [squ4, squ6] = await Promise.allSettled([
      getSquare(3, 1000),
      getSquare(6, 2000),
    ]);
    console.log(squ4, squ6);
  } catch (error) {
    console.error(error);
  }

  //////////////////////////////////////////////////////////////
  // 4) Promise.race in this method from all the requests the one finishes first will be returned not matter the request is fullfilled or rejected. 

  //////////////////////////////////////////////////////////////
  // 5) Promise.any in this method from all the requests the one finishes first will be returned only the fullfilled one.
};

getData();
