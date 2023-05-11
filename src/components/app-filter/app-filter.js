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


};

export default AppFilter;
