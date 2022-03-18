let inp = document.querySelector("input");
let sec = document.querySelector("#meals");
inp.addEventListener("input", function () {
  searchMeal(inp.value);
  sec.innerHTML = `
  <img src="https://www.bing.com/th/id/OGC.ad069c63807cc0c99b0ff9b127b72c37?pid=1.7&rurl=https%3a%2f%2fi.pinimg.com%2foriginals%2fcb%2f17%2fb8%2fcb17b80a942d7c317a35ff1324fae12f.gif&ehk=VoIjHurBTObvgNg8%2bR6vVIF9B3cJtt8Vz84e8ky5HGQ%3d">
  `;
});

async function searchMeal(inp) {
  let a = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inp}`
  );
  let b = await a.json();

  if (b.meals) displaySearchResults(b.meals);
  else sec.innerHTML = "<h5>No Meals Found!</h5>";
  if ((inp = "")) searchMeal("a");
}

function displaySearchResults(arr) {
  sec.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let {
      idMeal: id,
      strMeal: meal,
      strCategory: category,
      strArea: area,
      strMealThumb: img,
    } = arr[i];
    sec.innerHTML += `<div id=${id}>
            <img src=${img} alt="">
            <h2>${meal}</h2>
            <h3>${category}</h3>
            <h3>${area}</h3>
            <p>Yummy</p>
        </div>`;
  }
}
searchMeal("a");

sec.addEventListener("click", function (e) {
  if (e.target.parentElement.tagName == "DIV") {
    localStorage.setItem("id", e.target.parentElement.id);
    window.open("oneMeal.html");
  } else if (e.target.tagName == "DIV") {
    localStorage.setItem("id", e.target.id);
    window.open("oneMeal.html");
  }
});

async function oneMeal(id) {
  let a = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let b = await a.json();
  console.log(b.meals);
}
