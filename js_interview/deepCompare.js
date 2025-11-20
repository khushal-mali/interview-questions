const obj1 = {
  a: 1,
  b: 2,
  c: { d: 4 },
  e: new Date("2025-09-27"),
  f: [1, 2, 3, 4],
};

const obj2 = {
  a: 1,
  b: 2,
  c: { d: 4 },
  e: new Date("2025-09-27"),
  f: [1, 2, 3, 4],
};

function compare(o1, o2) {
  if (typeof o1 !== "object" || typeof o2 !== "object") {
    return false;
  }

  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);

  if (keys1.length !== keys2.length) return false;

  for (const k of keys1) {
    if (!keys2.includes(k)) {
      return false;
    }

    const val1 = o1[k];
    const val2 = o2[k];

    if (val1 instanceof Date && val2 instanceof Date) {
      if (val1.getTime() !== val2.getTime()) {
        return false;
      }
    } else if (typeof val1 === "object" && typeof val2 === "object") {
      if (!compare(val1, val2)) return false;
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
}

console.log(compare(obj1, obj2));
