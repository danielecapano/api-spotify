/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Album from "../components/Album";
import "./Details.css";

function Details({
  token,
  handleArtistId,
  artistId,
  handleArtistImg,
  artistImg,
}) {
  const { id } = useParams();

  const [albumInfo, setAlbumInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.spotify.com/v1/albums/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        setAlbumInfo(data);
        handleArtistId(data.artists[0].id);
      } catch (error) {
        console.error("Errore durante il caricamento dell'album:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumInfo();
  }, [id]);

  useEffect(() => {
    const fetchArtistInfo = async () => {
      if (!artistId) return; // Controllo per evitare chiamate API non necessarie

      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        handleArtistImg(data.images[0]?.url || ""); // Controllo di esistenza immagine
      } catch (error) {
        console.error("Errore durante il caricamento dell'artista:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistInfo();
  }, [artistId]);

  return (
    <div className='details'>
      <Link to='/' className='back-link'>
        <i className='fa-solid fa-arrow-left'></i>
      </Link>
      {loading ? (
        <p>Caricamento...</p>
      ) : albumInfo && artistImg ? (
        <Album
          albumInfo={albumInfo}
          artistImg={artistImg}
          artistId={artistId}
        />
      ) : (
        <p>Album non trovato.</p>
      )}
    </div>
  );
}

export default Details;
