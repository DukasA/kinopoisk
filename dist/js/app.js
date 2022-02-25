const API_KEY = '275ad970-f42c-4cc0-8ff5-cfd8cb12577b';

const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'applicatoin/json',
            'X-API-KEY': API_KEY,
        },
    });

    const respData = await response.json();
    showMovies(respData);
}

function getClassByRate(number) {
    if (number >= 7) {
        return 'green';
    } else if (number > 5 ) {
        return 'orange';
    } else {
        return 'red';
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = '';

    data.films.forEach(movie => {
        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie">               
            <div class="movie__img">
                <img src="${movie.posterUrl}" alt = "${movie.nameRu}"> 
            </div>              
            <div class="movie__info">
                <div class="movie__title">
                    ${movie.nameRu}
                </div>
                <div class="movie__category">
                    ${movie.genres.map(genre => ` ${genre.genre}`)}
                </div>
            </div>
             <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
            }
            </div>
        `;

        

        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
   
    if (search.value) {
        getMovies(apiSearchUrl);
        search.value = '';

    } 
});