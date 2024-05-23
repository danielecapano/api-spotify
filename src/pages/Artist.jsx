/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Discography from "../components/Discography";
import "./Artist.css";

function Artist({ token, artistImg }) {
  const [loading, setLoading] = useState(true);
  const [artistDiscography, setArtistDiscography] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true); // Stato per indicare se ci sono più album da caricare

  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
    ) {
      setOffset((prevOffset) => prevOffset + 50);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${id}/albums?offset=${offset}&limit=50`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        const newItems = data.items;

        setArtistDiscography((prev) => [...prev, ...newItems]);

        if (newItems.length === 0 || newItems.length < 50) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Errore durante il caricamento dell'album:", error);
        setHasMore(false);
      }
      setLoading(false);
    };

    fetchData();
  }, [id, token, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <Link to='#' onClick={handleGoBack} className='go-back'>
        <i className='fa-solid fa-arrow-left'></i>
      </Link>
      {loading && artistDiscography.length === 0 ? (
        <p>Caricamento...</p>
      ) : artistImg && artistDiscography.length > 0 ? (
        <Discography
          artistImg={artistImg}
          artistDiscography={artistDiscography}
        />
      ) : (
        <p>Album non trovato.</p>
      )}
      {loading && <p>Caricamento...</p>}
    </div>
  );
}

export default Artist;
