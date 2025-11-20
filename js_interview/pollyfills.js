console.log("Pollyfills");

////////////////////////////////////////// Array PollyFills /////////////////////////////////////////

Array.prototype.myMap = function (fn) {
  const newArr = [];

  for (const key of this) {
    const resultForEachEl = fn(key);
    newArr.push(resultForEachEl);
  }

  return newArr;
};

Array.prototype.myFilter = function (fn) {
  const newArr = [];

  for (const key of this) {
    const isValid = fn(key);
    if (isValid) newArr.push(key);
  }

  return newArr;
};

Array.prototype.myReduce = function (fn, acc) {
  const isAccAvailable = !!acc;

  let result = isAccAvailable ? acc : this[0];
  const thisArray = isAccAvailable ? this : this.slice(1);

  for (const elm of thisArray) {
    const newResult = fn(result, elm);
    result = newResult;
  }

  return result;
};

const resultArrMap = [2, 3, 4, 5].myMap((num) => num * 3);
const resultArrFilter = [2, 3, 4, 5].myFilter((num) => num < 3);
const resultArrReduce = [2, 3, 4, 5].myReduce((acc, num) => acc + num, 2);

// console.log(resultArrMap);
// console.log(resultArrFilter);
// console.log(resultArrReduce);

//////////////////////////////////// Call, Apply, Bind PollyFills ///////////////////////////////////

const person1 = {
  name: "Khushal",
  age: 21,
};

const person2 = {
  name: "Vishal",
  age: 22,
};

function Introduction(status, salery) {
  console.log(
    `Myself ${this.name}, i am ${this.age} years old. My profession is ${status} with salery of ${salery} per month.`
  );
}

// Introduction.call(person1, "software developer", 50000);

Function.prototype.myCall = function (obj, ...args) {
  const key = Symbol();

  obj[key] = this;
  obj[key](...args);

  delete obj[key];
};

Function.prototype.myAppy = function (obj, args) {
  const key = Symbol();

  obj[key] = this;
  obj[key](...args);

  delete obj[key];
};

Function.prototype.myBind = function (obj, ...args) {
  const key = Symbol();

  obj[key] = this;

  return () => {
    obj[key](...args);
    delete obj[key];
  };
};

// Introduction.myCall(person1, "software developer", 50000);
// Introduction.myAppy(person2, ["software developer", 50000]);
// const KhushalInfo = Introduction.myBind(person1, "software developer", 50000);

// KhushalInfo();

///////////////////////////////////////// Promise PollyFills ////////////////////////////////////////

const timePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {
      resolve(randomNumber);
    } else {
      reject("Operation Failed");
    }
  }, 1000);
});

timePromise.then((res) => console.log(res)).catch((err) => console.log(err));

class MyPromise {
  constructor(executor) {
    this.onSuccess = null;
    this.onFailed = null;

    this.then = function (cb) {
      this.onSuccess = cb;
      return this;
    };

    this.catch = function (cb) {
      this.onFailed = cb;
      return this;
    };

    executor(this.resolve, this.reject);
  }

  resolve = (successData) => {
    this.onSuccess(successData);
  };

  reject = () => {};
}

const myPromise = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("Promise Resolved.");
  }, 1000);
});

myPromise.then((data) => {
  console.log(data);
});
