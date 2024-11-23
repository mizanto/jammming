import React from 'react';
import SearchResults from './SearchResults';

export default function SearchResultsContainer({ tracks, onAddToPlaylist }) {
  const handleAddTrack = (track) => {
    console.log(`Adding track: ${track.name}`);
    onAddToPlaylist(track);
  };

  return <SearchResults tracks={tracks} onAdd={handleAddTrack} />;
}