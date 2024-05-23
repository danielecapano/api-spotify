/* eslint-disable react/prop-types */

import "./AlbumInfo.css";
import { Link } from "react-router-dom";

function AlbumInfo({ album }) {
  const albumType =
    album.album_group === "appears_on" ? "Collaborazione" : album.album_group;

  const convertReleaseDate = (date) => {
    const year = date.substring(0, 4);

    return year;
  };
  return (
    <>
      <Link to={`/album/${album.id}`}>
        <div className='album-card'>
          <figure className='album-img'>
            <img src={album.images[1].url} alt='' />
          </figure>
          <div className='info-album-card'>
            <h3 className='album-title'>{album.name}</h3>
            <p className='album-artist'>
              <span>{albumType} &bull; </span>
              {convertReleaseDate(album.release_date)}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default AlbumInfo;
