function throttleFunction(fn, limit) {
  let isThrottling;

  return function () {
    const args = arguments;
    
    if (!isThrottling) {
      fn(...args);
      isThrottling = true;
      setTimeout(() => (isThrottling = false), limit);
    }
  };
}

function shoot() {
  console.log("Clicked!");
}

const throttleShoot = throttleFunction(shoot, 5000);

document.getElementById("btn").addEventListener("click", function (e) {
  throttleShoot();
});
