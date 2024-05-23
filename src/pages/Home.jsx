/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import logo from "../assets/Spotify_Icon_RGB_Green.svg";

function Home({ token, value, setValue, result, setResult, handleTrackId }) {
  const [offset, setOffset] = useState(0);

  const handleSearch = (search) => {
    if (search !== "") {
      setValue(search);
    }
  };

  const handleOffset = () => setOffset(offset + 20);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      setOffset(offset + 20);
    }
  };

  useEffect(() => {
    if (value !== "") {
      axios(
        `https://api.spotify.com/v1/search?q=${value}&type=track&market=IT&locale=it_IT&offset=${offset}&limit=20`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      ).then((data) => {
        console.log(data.data.tracks);
        setResult(data.data.tracks.items);
      });
    }
  }, [value]);

  useEffect(() => {
    if (value !== "") {
      axios(
        `https://api.spotify.com/v1/search?q=${value}&type=track&market=IT&locale=it_IT&offset=${offset}&limit=20`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      ).then((data) => {
        console.log(data.data.tracks.items);
        setResult((prev) => prev.concat(data.data.tracks.items));
      });
      console.log(document.documentElement.scrollTop + window.innerHeight);
      console.log(document.documentElement.offsetHeight);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [offset]);

  return (
    <div className='container'>
      <SearchBar handleSearch={handleSearch} />
      <div className='results'>
        {result.length === 0 && <img className='logo' src={logo} alt='' />}
        {result &&
          result.map((item, index) => (
            <Card item={item} key={index} handleTrackId={handleTrackId} />
          ))}
        {result.length > 0 && (
          <button className='btn bottom' onClick={handleOffset}>
            Cerca ancora
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
