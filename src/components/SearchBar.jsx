import { useState } from "react";

import "./SearchBar.css";

/* eslint-disable react/prop-types */

function SearchBar({ handleSearch }) {
  const [search, setSearch] = useState("");
  return (
    <div className='search-bar'>
      <div className='input-container'>
        <i className='fa-solid fa-magnifying-glass search-icon'></i>
        <i
          className='fa-solid fa-xmark reset-icon'
          onClick={() => setSearch("")}
        ></i>
        <input
          type='text'
          placeholder='Cosa vuoi cercare?'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch(search);
            }
          }}
        />
      </div>
      <button className='btn' onClick={() => handleSearch(search)}>
        Cerca
      </button>
    </div>
  );
}

export default SearchBar;
