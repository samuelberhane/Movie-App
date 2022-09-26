const movies = document.querySelector(".movies");
const form = document.getElementById("form");
const search = document.querySelector("#search");
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

window.addEventListener("DOMContentLoaded", () => {
  xmlRequest(APIURL);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = search.value;
  xmlRequest(`${SEARCHAPI}${searchValue}`);
});

function xmlRequest(url) {
  let xml = new XMLHttpRequest();
  xml.open("GET", url);
  xml.onload = function () {
    if (xml.status == 200) {
      const page = xml.responseText;
      const pageParse = JSON.parse(page);
      const pageResults = pageParse.results;
      getMovie(pageResults);
    }
  };
  xml.send();
}

function getMovie(pageResults) {
  movies.innerHTML = "";
  pageResults.forEach((element) => {
    const movie = document.createElement("div");
    movie.classList.add("movie");
    if (checkImage(element.backdrop_path)) {
      movie.innerHTML = `
      <img
        src="${IMGPATH}${element.backdrop_path}"
        alt=""
      />
      <div class="movie-info">
        <h4 class="title">${element.title}</h4>
        <span class="${getRate(element.vote_average)}">${
        element.vote_average
      }</span>
      </div>   
      <div class="overview">
      <h3>Overview:</h3>
        ${element.overview}
      </div>
    `;
      movies.appendChild(movie);
    }
  });
}

function checkImage(src) {
  if (src != null) return true;
}

function getRate(rating) {
  if (rating > 7.5) return "green";
  else if (rating > 6) return "orange";
  else return "red";
}
