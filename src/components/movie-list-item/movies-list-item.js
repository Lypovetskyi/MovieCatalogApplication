import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movies-list-item.css';
import SearchPanel from '../search-panel/search-panel';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchMovies(page);
  }, [page, selectedCategory]);

  useEffect(() => {
    setPage(1);
    fetchMovies(1);
  }, [searchTerm]);

  const fetchMovies = async (currentPage) => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=a5d75395ceae9b1ed5c71acb259b6337&page=${currentPage}`;

      if (searchTerm) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=a5d75395ceae9b1ed5c71acb259b6337&query=${searchTerm}`;
      } else if (selectedCategory) {
        url = `https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=a5d75395ceae9b1ed5c71acb259b6337&page=${currentPage}`;
      }

      const response = await axios.get(url);
      const movieData = response.data.results.slice(0, 9);

      if (currentPage === 1) {
        setMovies(movieData);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...movieData]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleMovieClick = async (movieId) => {
    try {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=a5d75395ceae9b1ed5c71acb259b6337`
      );

      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=a5d75395ceae9b1ed5c71acb259b6337`
      );

      const selectedMovie = {
        ...movieResponse.data,
        director: creditsResponse.data.crew.find((person) => person.job === "Director"),
        cast: creditsResponse.data.cast,
      };

      setSelectedMovie(selectedMovie);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setPage(1);
    setMovies([]); // Очистка списка фильмов перед загрузкой новых данных
  };

    return (
    <div className="movie-list ">
      <h2>Movie List</h2>
      <div className="search-panel">
        <SearchPanel onSearch={handleSearch} />
      </div>
      <div className="btn-group">
  <button
    className={`btn btn-light${selectedCategory === '' ? ' active' : ''}`}
    onClick={() => handleCategoryClick('')}
  >
    All Films
  </button>
  <button
    className={`btn btn-light${selectedCategory === 'now_playing' ? ' active' : ''}`}
    onClick={() => handleCategoryClick('now_playing')}
  >
    Watching now
  </button>
  <button
    className={`btn btn-light${selectedCategory === 'popular' ? ' active' : ''}`}
    onClick={() => handleCategoryClick('popular')}
  >
    Popular
  </button>
  <button
    className={`btn btn-light${selectedCategory === 'upcoming' ? ' active' : ''}`}
    onClick={() => handleCategoryClick('upcoming')}
  >
    Waiting for release
  </button>
</div>

      <ul className="movie-grid">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
            <div className="movie-image">
              <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
            </div>
            <p className="movie-release-date">Release Date: {movie.release_date}</p>
            {selectedMovie && selectedMovie.id === movie.id && (
              <div className="movie-description">
                <h4>Description:</h4>
                <p>{selectedMovie.overview}</p>
                <h4>Director:</h4>
                <p>{selectedMovie.director ? selectedMovie.director.name : 'Unknown'}</p>
                <h4>Cast:</h4>
                <ul>
                  {selectedMovie.cast ? (
                    selectedMovie.cast.map((actor) => <li key={actor.id}>{actor.name}</li>)
                  ) : (
                    <li>No cast information available</li>
                  )}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      {movies.length > 0 && movies.length % 9 === 0 && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default MovieList;
