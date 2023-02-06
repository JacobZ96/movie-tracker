var today = dayjs();
var currentDay = dayjs().format("dddd, MMM D, YYYY");

console.log(currentDay);

// Start search
document.querySelector('button').addEventListener('click', () => {
    let searchText = document.querySelector('input').value;
getMovie(searchText);
})

// Search for movie and get data 
function getMovie(searchText) {
fetch(`https://www.omdbapi.com/?apikey=d5dbe20a&s=${searchText}`)
.then(function (response) {
    return response.json();
})
    .then(function (data) {
        let movies = data.Search;
        console.log(movies)
        for (let i = 0; i < movies.length; i++){
            let title = movies[i].Title;
           let titleForAttribute = title.replace(/["" & :]/g, '-');
            console.log(title.replace(/["" & :]/g, ' '));
            // localStorage.setItem('id', movies[i].imdbID);
            document.querySelector("#movie-info").innerHTML += `
            <p>${movies[i].Title}</p>
            <p>${movies[i].Year}</p>
            <img src="${movies[i].Poster}" alt="${"Poster for"}${movies[i].Title}">
            <a href="http://imdb.com/title/${movies[i].imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <button class="buttons" id=${movies[i].imdbID} data-title = ${titleForAttribute}>Add to list</button>
         `
        }
       
    })
    .catch((err) => {
      alert(err)
    });
    document.querySelector("#movie-info").innerHTML = '';
}

function movieSelected(event) {
let selected = event.target;
let atrr = selected.getAttribute('data-title');
console.log(selected.id);
localStorage.setItem('movieId', atrr);
console.log(localStorage.getItem('movieId'));
let listOfMovies = document.querySelector('.list');
let buttons = document.createElement('button');
buttons.textContent = innerHTML = atrr.replace(/[-]/g, ' ');
listOfMovies.appendChild(buttons);
}
document.querySelector('#movie-info').addEventListener('click', movieSelected);