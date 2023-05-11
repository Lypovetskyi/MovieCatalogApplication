import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app-filter.css';

const AppFilter = () => {
  const [showGenres, setShowGenres] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [movies, setMovies] = useState([]);

  const handleAllFilmsClick = (event) => {
    event.preventDefault(); // Prevent the default behavior of the button click event
    window.location.reload();
  };

  const handleCategoryClick = async (category, event) => {
    event.preventDefault(); // Prevent the default behavior of the button click event
    setSelectedCategory(category);
    fetchMoviesByCategory(category);
  };

  const fetchMoviesByCategory = async (category) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a5d75395ceae9b1ed5c71acb259b6337&with_genres=${category}`);
      const movieData = response.data.results;
      setMovies(movieData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchMoviesByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="btn-group">
      <div className="btn-container">
        <button className="btn btn-light" type="button" onClick={handleAllFilmsClick}>
          All films
        </button>

        <button className={`btn btn-light${selectedCategory === 28 ? ' active' : ''}`} onClick={(e) => handleCategoryClick(28, e)}>
          Сейчас смотрят
        </button>
        <button className={`btn btn-light${selectedCategory === 35 ? ' active' : ''}`} onClick={(e) => handleCategoryClick(35, e)}>
          Популярное
        </button>
        <button className={`btn btn-light${selectedCategory === 27 ? ' active' : ''}`} onClick={(e) => handleCategoryClick(27, e)}>
          Ожидают выхода
        </button>
      </div>
      
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-overview">{movie.overview}</p>
              <p className="movie-release-date">Release Date: {movie.release_date}</p>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppFilter;
