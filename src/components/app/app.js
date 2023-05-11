// В компоненте App.js

import React, { useState } from 'react';
import axios from 'axios';
import AppInfo from '../app-info/AppInfo';
// import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import MovieList from '../movie-list-item/movies-list-item';

import './app.css';

function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=a5d75395ceae9b1ed5c71acb259b6337&query=${searchTerm}`
      );
      const movieData = response.data.results.slice(0, 9);
      setMovies(movieData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app background">
      <AppInfo />

      {/* <SearchPanel onSearch={handleSearch} /> */}

      <div className="app-content">
        <AppFilter />
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
