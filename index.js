const API_KEY = 'd3102f89'; // Your OMDb API key
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

function searchMovies(query) {
    // Note: OMDb API requires a single movie search parameter ('t') or a search term ('s')
    // When using 's' for search, the response structure is different (results are in a "Search" array)
    const url = `const url = ``https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                displayMovies(data.Search);
            } else {
                movieContainer.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
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

// Initial fetch of popular movies (OMDb doesn't have a direct 'popular' endpoint like TMDB, so this is a placeholder or you would need a different API)
// For OMDb, you typically search by title.