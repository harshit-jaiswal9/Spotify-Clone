import React from "react";
import "./SongRow.css";

function SongRow({ track, playSong }) {
  console.log(track.id);
  return (
    <div className="songRow" onClick={() => playSong(track.id)}>
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>

        <iframe src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`} width="100%" height="100" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;