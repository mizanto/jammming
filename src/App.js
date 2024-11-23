import React, {useState} from "react";
import { Typography } from '@mui/material';
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import SearchResultsContainer from "./components/SearchResults/SearchResultsContainer";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    console.log("Search for:", query);
    // TODO: Actually search for the query

    const mockResults = [
      { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1" },
      { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2" },
      { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3" },
      { id: 4, name: "Song 4", artist: "Artist 4", album: "Album 4" },
    ];

    setSearchResults(mockResults);
  };

  const addTrackToPlaylist = (track) => {
    console.log(`Add to playlist: ${track}`)
    // TODO: Add logic
  }

  return (
    <div className="App">
      <Typography variant="h2" sx={{ textAlign:"center" }}>Jammming</Typography>
      <SearchBarContainer onSearch={handleSearch} />
      <SearchResultsContainer 
        tracks={searchResults}
        onAddToPlaylist={addTrackToPlaylist}
      />
    </div>
  );
}

export default App;
