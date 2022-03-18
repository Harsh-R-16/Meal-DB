let categories = document.querySelector("#categories");
let areas = document.querySelector("#areas");
// let sec = document.querySelector("#meals");

async function getOptionsByC() {
  let a = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );
  let b = await a.json();
  displayOptionsC(b.meals);
}
function displayOptionsC(arr) {
  for (let i = 0; i < arr.length; i++) {
    categories.innerHTML += `<option value=${arr[i].strCategory}>${arr[i].strCategory}</option>`;
  }
}
getOptionsByC();
async function getOptionsByA() {
  let a = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let b = await a.json();
  displayOptionsA(b.meals);
}
function displayOptionsA(arr) {
  for (let i = 0; i < arr.length; i++) {
    areas.innerHTML += `<option value=${arr[i].strArea}>${arr[i].strArea}</option>`;
  }
}
getOptionsByA();

categories.addEventListener("change", function () {
  areas.value = "";
  fetchMeals("c", categories.value);
});

areas.addEventListener("change", function () {
  categories.value = "";
  fetchMeals("a", areas.value);
});

async function fetchMeals(type, q) {
  let a = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${q}`
  );
  let b = await a.json();
  if (type) displayMeals(b.meals, q);
}

function displayMeals(arr, type) {
  sec.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let { idMeal: id, strMeal: meal, strMealThumb: img } = arr[i];
    sec.innerHTML += `<div id=${id}>
            <img src=${img} alt="">
            <h2>${meal}</h2>
            <h3>${type}</h3>
            <p>Yummy</p>
        </div>`;
  }
}
