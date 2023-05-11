import React, { useState } from 'react';
import './search-panel.css';

const SearchPanel = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control search-input"
        placeholder="Find a movie"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchPanel;
