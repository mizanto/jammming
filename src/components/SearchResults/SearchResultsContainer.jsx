import React from 'react';
import SearchResults from './SearchResults';

export default function SearchResultsContainer({ tracks, onAddToPlaylist }) {
  const mockResults = [
    { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2" },
    { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3" },
    { id: 4, name: "Song 4", artist: "Artist 4", album: "Album 4" },
  ];

  const handleAddTrack = (track) => {
    console.log(`Adding track: ${track.name}`);
    onAddToPlaylist(track);
  };

  return <SearchResults tracks={tracks} onAdd={handleAddTrack} />;
}