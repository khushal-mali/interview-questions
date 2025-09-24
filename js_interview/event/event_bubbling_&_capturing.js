console.log("Event Bubbling");

const card = document.getElementById("card");
const btn = document.getElementById("button");

card.addEventListener("click", (e) => {
  console.log("Clicked on the card");
});

btn.addEventListener("click", (e) => {
  console.log("Clicked on the Button");
  e.stopImmediatePropagation();
});

btn.addEventListener("click", (e) => {
  console.log("Clicked on the Button2");
  btn.style.backgroundColor = "red";
});
