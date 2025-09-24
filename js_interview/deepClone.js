console.log("Deep Cloning...");

const obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 4,
    e: new Date(),
    f: undefined,
  },
};

// const obj2 = JSON.parse(JSON.stringify(obj1));

// obj2.c.d = 10;

function createDeepClone(obj) {
  let copyObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];
    if (value instanceof Date) {
      copyObj[key] = new Date(value.getTime());
    } else if (typeof value !== "object") {
      copyObj[key] = value;
    } else {
      copyObj[key] = createDeepClone(value);
    }
  }
  console.log("CopyObj", copyObj);
  return copyObj;
}

// console.log(obj1);
const obj2 = createDeepClone(obj1);
const obj3 = structuredClone(obj1);
console.log(obj1);
console.log(obj2);
obj2.c.e = new Date();
obj3.c.e = new Date();
console.log(obj1);
console.log(obj2);
console.log(obj3);
