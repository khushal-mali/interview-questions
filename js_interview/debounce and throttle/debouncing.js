// Debouncing

function debouncedFunction(fn, delay) {
  let deboucing;

  return function () {
    const args = arguments;

    clearTimeout(deboucing);
    deboucing = setTimeout(() => fn(...args), delay);
  };
}

// result
const callApi = (value) => {
  console.log(value);
};

const debouncedApi = debouncedFunction(callApi, 500);

document.getElementById("search-input").addEventListener("input", function (e) {
  debouncedApi(e.target.value);
});
