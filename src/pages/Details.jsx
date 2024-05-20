/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Album from "../components/Album";
import "./Details.css";

function Details({ token, trackId }) {
  const { id } = useParams();

  const [albumInfo, setAlbumInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios(`https://api.spotify.com/v1/albums/${id}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((data) => {
        console.log(data.data);
        setAlbumInfo(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore durante il caricamento dell'album:", error);
        setLoading(false);
      });
  }, [id]);
  return (
    <div className='details'>
      <Link to='/' className='back-link'>
        <i className='fa-solid fa-arrow-left'></i>
      </Link>
      {loading ? (
        <p>Caricamento...</p>
      ) : albumInfo ? (
        <Album albumInfo={albumInfo} trackId={trackId} />
      ) : (
        <p>Album non trovato.</p>
      )}
    </div>
  );
}

export default Details;
