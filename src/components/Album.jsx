/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Album.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Album({ albumInfo, artistImg, artistId }) {
  const ref = useRef(null);

  const { scrollYProgress: scrollImgProgress } = useScroll({
    target: ref,
    offset: ["start 265px", "start 90px"],
  });

  const { scrollYProgress: scrollHeaderProgress } = useScroll({
    target: ref,
    offset: ["start 180px", "start 30px"],
  });

  const scale = useTransform(scrollImgProgress, [0, 0.8], [1, 0.4]);

  const opacityImg = useTransform(scrollImgProgress, [0.5, 0.9], [1, 0]);

  const opacityHeader = useTransform(scrollHeaderProgress, [0.5, 0.9], [0, 1]);

  const translateY = useTransform(scrollImgProgress, [0.85, 1], [0, -100]);

  if (!albumInfo || !albumInfo.tracks) {
    return <p>Caricamento...</p>;
  }

  const {
    name,
    album_type,
    release_date,
    release_date_precision,
    images,
    artists,
    tracks,
    total_tracks,
    copyrights,
  } = albumInfo;

  const convertTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  };

  const convertTotalTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${
      hours === 1 ? hours + " ora" : hours > 1 ? hours + " ore" : ""
    } ${minutes} minuti `;
  };

  const convertReleaseDate = (date) => {
    const year = date.substring(0, 4);
    return year;
  };

  const convertLongDate = (date, precision) => {
    if (precision === "day") {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString("it-IT", options);
    } else return convertReleaseDate(date);
  };

  console.log(albumInfo);

  const image = images && images[0] ? images[0].url : "";
  const artist = artists.map((artist) => artist.name).join(", ");

  const tracksList = tracks.items.map((track) => {
    return {
      id: track.id,
      name: track.name,
      number: track.track_number,
      duration: track.duration_ms,
      artists: track.artists.map((artist) => artist.name).join(", "),
    };
  });

  const totalDuration = tracksList.reduce((total, track) => {
    return total + track.duration;
  }, 0);

  console.log(tracksList);

  return (
    <div className='album-info'>
      <motion.div className='header' style={{ opacity: opacityHeader }}>
        <p>{albumInfo.name}</p>
      </motion.div>
      <motion.figure
        className='cover'
        style={{
          scale: scale,
          opacity: opacityImg,
          translateY: translateY,
          transformOrigin: "top center",
        }}
      >
        <img src={image} alt='' />
      </motion.figure>
      <div className='container'>
        <div className='info-album'>
          <h1 className='name' ref={ref}>
            {name}
          </h1>
          <Link to={`/artist/${artistId}`}>
            <div className='artist'>
              <img src={artistImg} alt='' />
              <p className='artist-name'>{artist}</p>
            </div>
          </Link>
          <p className='type'>
            <span>{album_type}</span> &bull; {convertReleaseDate(release_date)}{" "}
            - {total_tracks} brani, {convertTotalTime(totalDuration)}
          </p>
        </div>
        <div className='tracks'>
          {tracksList.map((track) => (
            <div key={track.id} className='track'>
              <div className='track-name'>
                <p className='track-title'>{track.name}</p>{" "}
                <span>{track.artists}</span>
              </div>

              <span className='track-duration'>
                {convertTime(track.duration)}
              </span>
            </div>
          ))}
        </div>

        <p className='date-of-release'>
          {convertLongDate(release_date, release_date_precision)}
        </p>
        <Link to={`/artist/${artistId}`}>
          <div className='artist-big'>
            <img src={artistImg} alt='' />
            <p className='artist-name'>{artist}</p>
          </div>
        </Link>
        <p className='copyrights'>{copyrights[1]?.text}</p>
        <p className='copyrights'>{copyrights[0]?.text}</p>
      </div>
    </div>
  );
}

export default Album;
