const API_KEY = 'd3102f89';
const BASE_URL = 'https://themoviedb.org';
const IMAGE_BASE_URL = 'https://tmdb.org';
const MOVIE_GRID = document.getElementById('movie-grid');

let allMovies = []; // Store fetched movies

// Function to fetch movies
async function fetchMovies(sortBy = 'popularity.desc') {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        allMovies = data.results;
        displayMovies(allMovies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}


// Function to display movies in the grid
function displayMovies(movies) {
    MOVIE_GRID.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <p>Release: ${movie.release_date}</p>
            </div>
        `;

        MOVIE_GRID.appendChild(movieCard);
    });
}

// Function to sort movies based on user selection
function sortMovies(sortValue) {
    let sortedMovies = [...allMovies];
    switch (sortValue) {
        case 'popularity.desc':
            sortedMovies.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'vote_average.desc':
            sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
            break;
        case 'title.asc':
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    displayMovies(sortedMovies);
}

// Initial fetch of popular movies when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});