import React, { useState } from "react";
import Playlist from "./Playlist";

export default function PlaylistContainer({ tracks, onRemoveTrack, onSave }) {
  const [playlistName, setPlaylistName] = useState("New Playlist");

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  return (
    <Playlist
      tracks={tracks}
      playlistName={playlistName}
      onNameChange={handleNameChange}
      onRemoveTrack={onRemoveTrack}
      onSave={() => onSave(playlistName, tracks)}
    />
  );
}