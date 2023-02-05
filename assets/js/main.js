var today = dayjs();
var currentDay = dayjs().format("dddd, MMM D, YYYY");

console.log(currentDay);

// Start search
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('button').addEventListener('click', (e) => {
    let searchText = document.querySelector('input').value;
    getMovie(searchText);
    e.preventDefault();
   })
  });

// Search for movie
function getMovie(searchText) {
    fetch(`http://www.omdbapi.com/?apikey=d5dbe20a&s=${searchText}`)
    .then(function (response) {
        return response.json();
    })
        .then(function (data) {
            let movies = data.Search;
            console.log(movies);
    })
}
document.querySelector('button').addEventListener('click', getMovie);