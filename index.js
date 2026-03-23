const API_KEY = 'd3102f89'; // Your OMDb API key
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');
const filter = document.querySelector('#filter')

let currentMovies= []

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

async function searchMovies(query) {
    // Note: OMDb API requires a single movie search parameter ('t') or a search term ('s')
    // When using 's' for search, the response structure is different (results are in a "Search" array)
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Search) {
        currentMovies = data.Search;
        sortSelect.value = '';
        displayMovies(currentMovies);
    } else {
        movieContainer.innerHTML = '<p>No movies found.</p>';
        currentMovies = [];
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'}" alt="${movie.Title} Poster">
            <div class="movie-info">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}
filter.addEventListener('change', (e) => {
    renderMovies(e.target.value)
})

function sortMovies(sortType) {
    let sortedMovies = [...currentMovies]; //copy so original is preserved

    if (sortType === 'NEW_TO_OLD') {
        sortedMovies.sort((a,b) => Number(b.Year)- Number(a.year));
    }
    else if (sortType === 'OLD_TO_NEW') {
        sortedMovies.sort((a,b) => Number(a.Year) - Number(b.Year));
    }

    displayMovies(sortedMovies);
}


