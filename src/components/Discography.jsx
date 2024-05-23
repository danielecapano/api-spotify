/* eslint-disable react/prop-types */
import { motion, useScroll, useTransform } from "framer-motion";
import "./Discography.css";
import AlbumInfo from "./AlbumInfo";
import { useRef } from "react";

function Discography({ artistDiscography, artistImg }) {
  const ref = useRef(null);
  const containerRef = useRef();

  const { scrollYProgress: scrollImgProgress } = useScroll({
    // container: containerRef,
    target: ref,
    offset: ["start 280px", "start 95px"],
  });

  console.log(scrollImgProgress);

  const { scrollYProgress: scrollHeaderProgress } = useScroll({
    target: ref,
    offset: ["start 280px", "start 95px"],
  });

  console.log(useScroll());
  const opacityImg = useTransform(scrollImgProgress, [0, 1], [1, 0]);

  const opacityHeader = useTransform(scrollHeaderProgress, [0, 1], [0, 1]);

  console.log(artistDiscography);
  const artist = artistDiscography[0].artists[0].name;

  console.log(artist);
  return (
    <>
      <motion.div className='header' style={{ opacity: opacityHeader }}>
        <p>{artist}</p>
      </motion.div>

      <motion.figure
        className='artist-img'
        ref={containerRef}
        style={{ opacity: opacityImg }}
      >
        <img src={artistImg} alt='' />
      </motion.figure>
      <div className='container'>
        <h1 className='artist-title' ref={ref}>
          {artist}
        </h1>
        <div className='album-list'>
          {artistDiscography.map((album) => (
            <AlbumInfo album={album} key={album.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Discography;
