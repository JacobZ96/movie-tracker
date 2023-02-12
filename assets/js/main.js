// Variables
const searchButton = document.querySelector('.btn-search');
const modal = document.querySelector('.modal');
const errorMessage = document.querySelector('.modal-err ');
const closeMessageBox = document.querySelector('.delete');
const closeModal = document.querySelector('.modal-close');
const mainEl = $('.main');

// Start search
searchButton.addEventListener('click', function () {
    let searchText = document.querySelector('input').value;
    getMovie(searchText);
})

// Search for movie and get data 
function getMovie(searchText) {
    fetch(`https://www.omdbapi.com/?apikey=d5dbe20a&s=${searchText}&plot`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let movies = data.Search;
            console.log(movies)
            for (let i = 0; i < movies.length; i++) {
                let title = movies[i].Title;
                localStorage.setItem('movieId', title);
                let titleForAttribute = title.replace(/["" & :]/g, '-');
                let parent = document.querySelector('.main');
                parent.innerHTML += `
                <article class="flex-column box mt-3">
                <p class=" has-text-weight-bold" >${movies[i].Title}</p>
                    <p class="" >${movies[i].Year}</p>
                    <figure>
                    <img src="${movies[i].Poster} alt="${"Poster for"}${movies[i].Title}"></figure> 
                    <a href="http://imdb.com/title/${movies[i].imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <button class="button buttons is-info" id=${titleForAttribute} data-title = ${titleForAttribute}>Add to list</button>
                </article>`
            }
        })
        .catch((err) => {
            showError(err);
        });
    document.querySelector(".main").innerHTML = '';
}

// Show error message
function showError() {
    errorMessage.classList.toggle('is-active');
}
closeMessageBox.addEventListener('click', showError);

// Show modal
function showModal() {
    modal.classList.toggle('is-active');
}
closeModal.addEventListener('click', showModal);

// Datepicker widget
$(function () {
    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
    });
});

let movieId = localStorage.getItem('movieId');

// Create buttons
mainEl.on('click', '.buttons', function () {
    printDate();
});

let printDate = function () {
    let selectDate = document.querySelector('.input-date').value;
    modal.classList.toggle('is-active');
    localStorage.setItem('date', selectDate);
    let selected = event.target;
    localStorage.setItem('movie', selected.id);
}

// Create buttons
function movieSelected() {
    let listOfButtons = document.querySelector('.list-buttons');
    let list = document.createElement('li');
    let btn = document.createElement('button');
    let date = document.querySelector('.input-date').value;
    localStorage.setItem('date', date);
    btn.classList.add('is-info', 'button', 'is-small');
    list.classList.add('is-flex','is-justify-content-space-between','is-info','is-align-items-center','is-align-content-center');
    list.setAttribute('id', movieId);
    let dataTitle = localStorage.getItem('movie').replace(/["" -- - & :]/g, ' ');
    let movieSeenOn = localStorage.getItem('date');
    list.innerHTML = `${dataTitle} ${movieSeenOn}`;
    btn.setAttribute('id',localStorage.getItem('id'));
    btn.textContent = "❌";
    listOfButtons.appendChild(list);
    list.appendChild(btn);
    localStorage.clear();
    modal.classList.toggle('is-active');
}
document.querySelector('.btn-submit').addEventListener('click', movieSelected);

// Shows Chuk's joke
function getChuck() {
    fetch(`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
        .then((data) =>
            document.querySelector('.chuck-joke').textContent = data.value)
};
 document.querySelector('.btn-chuck').addEventListener('click', function(){
    getChuck()
 });

//  Shows movie by default
 document.addEventListener('DOMContentLoaded', (event) => {
            fetch(`https://www.omdbapi.com/?apikey=d5dbe20a&s=avatar`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let movies = data.Search;
                    document.querySelector('.heading').textContent =`${'Upcoming movie'}`;
                    document.querySelector('.title-movie').textContent =`${ movies[2].Title}`;
                    document.querySelector('.subtitle-movie').textContent = `${'Year'} ${movies[2].Year}`;
                    document.querySelector('.poster').src = movies[2].Poster;
                    document.querySelector('.id-movie').href = `http://imdb.com/title/${movies[2].imdbID}`;
                })
                .catch((err) => {
                    showError(err);
                });
 });

//  Delete list of movies
function handleRemoveItem(event) {
    let e = event.target;
    e.parentElement.remove('li');
  }
document.querySelector('.list-buttons').addEventListener('click', handleRemoveItem);
 
// Burger menu 

document.querySelector('#burger').addEventListener('click', () => {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
})
