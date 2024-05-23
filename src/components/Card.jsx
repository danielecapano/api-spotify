/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ item }) {
  const convertTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  };

  const convertReleaseDate = (date) => {
    const year = date.substring(0, 4);

    return year;
  };

  return (
    <Link className='link-album' to={`/album/${item.album.id}`}>
      <div key={item.id} className='card'>
        <div className='card-info'>
          <img className='card-image' src={item.album.images[1].url}></img>
          <div className='card-album'>
            <h2 className='card-album-name'>{item.album.name}</h2>
            <p className='card-album-info'>
              <span>{item.album.type} &bull; </span>
              {convertReleaseDate(item.album.release_date)}
            </p>
          </div>
        </div>
        <div className='card-body'>
          <h1 className='card-body-name'>{item.name}</h1>
          <div className='card-body-info'>
            <h3 className='card-body-artist'>
              <span>Brano &bull; </span>
              {item.artists[0].name}
            </h3>
            <p className='card-body-time'>{convertTime(item.duration_ms)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
