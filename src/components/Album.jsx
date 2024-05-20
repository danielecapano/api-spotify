/* eslint-disable react/prop-types */
import "./Album.css";

function Album({ albumInfo, trackId }) {
  const { name, album_type, release_date, images, artists, tracks } = albumInfo;

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
  console.log(albumInfo);

  const image = images[0].url;
  const artist = artists.map((artist) => artist.name).join(", ");

  const tracksList = tracks.items.map((track) => {
    return {
      id: track.id,
      name: track.name,
      number: track.track_number,
      duration: convertTime(track.duration_ms),
      artists: track.artists.map((artist) => artist.name).join(", "),
    };
  });

  console.log(tracksList);

  return (
    <div className='album-info'>
      <div className='container'>
        <figure className='cover'>
          <img src={image} alt='' />
        </figure>
        <div className='info-album'>
          <h1 className='name'>{name}</h1>
          <p className='artist'>{artist}</p>
          <p className='type'>
            {album_type} &bull; {convertReleaseDate(release_date)}
          </p>
        </div>
        <div className='tracks'>
          {tracksList.map((track) => (
            <div key={track.id} className='track'>
              <p className='track-name'>
                {track.name} <span>{track.artists}</span>
              </p>

              <span className='track-duration'>{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Album;
