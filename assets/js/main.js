var today = dayjs();
var currentDay = dayjs().format("dddd, MMM D, YYYY");
console.log(currentDay);

// Start search
document.querySelector('button').addEventListener('click', function(){
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
                localStorage.setItem('movieId', title);
                let titleForAttribute = title.replace(/["" & :]/g, '-');
                let parent = document.querySelector('.main');
                parent.innerHTML += `
                <article class="flex-column box">
                <p class="" >${movies[i].Title}</p>
                    <p class="" >${movies[i].Year}</p>
                    <figure>
                    <img src="${movies[i].Poster} alt="${"Poster for"}${movies[i].Title}"></figure> 
                    <a href="http://imdb.com/title/${movies[i].imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <button class="button buttons is-info" id=${movies[i].imdbID} data-title = ${titleForAttribute}>Add to list</button>
                </article>`
            }
        })
        .catch((err) => {
            alert(err)
        });
    document.querySelector(".main").innerHTML = '';
}
let movieId = localStorage.getItem('movieId');
// Create buttons
function movieSelected(event) {
    printDate();
    let selected = event.target;
    let dataTitle = selected.getAttribute('data-title');
 
    listOfButtons = document.querySelector('.list-buttons');
    let date = document.querySelector('.input-date').value;
    let setDate = localStorage.setItem('date', date);
    if (dataTitle.length > 1 && dataTitle !== movieId) {
        let list = document.createElement('li');
        list.setAttribute('id', movieId);
        localStorage.setItem('movieId', dataTitle);
        list.classList.add('button');
        let movieSeenOn = localStorage.getItem('date');
        list.innerHTML = `${dataTitle.replace(/[-]/g, ' ')} ${movieSeenOn}`;
        listOfButtons.appendChild(list);
    } 
}
document.querySelector('.main').addEventListener('click', movieSelected);
let modal = document.querySelector('.modal');
// Show modal
function showModal() {
    modal.classList.toggle('is-active');
}
document.querySelector('.modal-close').addEventListener('click', showModal);

// Datepicker widget
$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
});
  
// Print selected date
let printDate = function () {
    modal.classList.toggle('is-active');
    let date = document.querySelector('.input-date').value;
    localStorage.setItem('date', date);
    let movieSeenOn = localStorage.getItem('date');
    let addToList = document.getElementById(movieId);
    console.log(addToList);
}
document.querySelector('.btn-submit').addEventListener('click', printDate);