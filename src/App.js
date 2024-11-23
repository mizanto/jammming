import React, {useState} from "react";
import { Box, Typography } from '@mui/material';
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import SearchResultsContainer from "./components/SearchResults/SearchResultsContainer";
import PlaylistContainer from "./components/Playlist/PlaylistContainer";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

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
    if (playlistTracks.find((t) => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrackFromPlaylist = (trackToRemove) => {
    console.log(`Remove: ${trackToRemove.id}`)
    setPlaylistTracks(playlistTracks.filter((track) => track.id !== trackToRemove.id));
  };

  const savePlaylistToSpotify = (playlistName, tracks) => {
    console.log(`Saving playlist: ${playlistName}`);
    console.log("Tracks:", tracks);
    // TODO: send update to Spotify 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography variant="h2" sx={{ textAlign:"center", fontWeight:'bold'}}>
        Ja<span style={{color:'#1976d2'}}>mmm</span>ing
      </Typography>
      <Box 
        sx={{ 
          border: "1px solid #ddd",
          marginLeft: 2,
          marginRight: 2
        }}
      >
        <SearchBarContainer onSearch={handleSearch} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginTop: 2,
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Box 
          sx={{ 
            flex: 1,
            marginLeft: 2,
            marginBottom: 2,
            overflowY: "auto",
            height: "100%",
          }}
        >
          <SearchResultsContainer 
            tracks={searchResults}
            onAddToPlaylist={addTrackToPlaylist}
          />
        </Box>
        <Box 
          sx={{ 
            flex: 1,
            marginRight: 2,
            marginBottom: 2,
            overflowY: "auto",
            height: "100%",
          }}
        >
          <PlaylistContainer
            tracks={playlistTracks}
            onRemoveTrack={removeTrackFromPlaylist} 
            onSave={savePlaylistToSpotify}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
