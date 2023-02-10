// Variables
const mainEl = $('.main');
const searchButton = document.querySelector('.btn-search');
const modal = document.querySelector('.modal');
const errorMessage = document.querySelector('.modal-err ');
const closeMessageBox = document.querySelector('.delete');
const closeModal = document.querySelector('.modal-close');

// Start search
document.getElementById('searchBtn').addEventListener('click', function(){
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
            for (let i = 0; i < movies.length; i++) {
                let title = movies[i].Title;
                let imageCon = document.querySelector('.image');
                localStorage.setItem('movieId', title);
                let titleForAttribute = title.replace(/["" & :]/g, '-');
                let parent = document.querySelector('.main');
                imageCon.classList.add("hide");
                parent.innerHTML += `
                <article class="flex-column box">
                <p class="" >${movies[i].Title}</p>
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
    console.log(selected.id);
    localStorage.setItem('movie', selected.id);
}

// Create buttons
function movieSelected() {
    let selected = event.target;
    listOfButtons = document.querySelector('.list-buttons');
    let date = document.querySelector('.input-date').value;
    let setDate = localStorage.setItem('date', date);
    let list = document.createElement('li');
    list.setAttribute('id', movieId);
    let dataTitle = localStorage.getItem('movie');
    list.classList.add('button');
    let movieSeenOn = localStorage.getItem('date');
    list.innerHTML = `${dataTitle} ${movieSeenOn}`;
    listOfButtons.appendChild(list);
    localStorage.clear();
    modal.classList.toggle('is-active');
}
document.querySelector('.btn-submit').addEventListener('click', movieSelected);
document.querySelector('.btn-submit').addEventListener('click', printDate);

function getChuck() {
    console.log('You have been Chucked!')
    fetch(`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
    .then((data) => console.log(data.value))
};

 document.getElementById('chuckBtn').addEventListener('click', function(){
    getChuck()
 });})
