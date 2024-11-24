import React, {useState, useEffect} from "react";
import { Box, Typography } from '@mui/material';
import { getTokenFromUrl } from "./services/SpotifyAuth";
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import SearchResultsContainer from "./components/SearchResults/SearchResultsContainer";
import PlaylistContainer from "./components/Playlist/PlaylistContainer";
import AuthButton from "./components/AuthButton/AuthButton";
import axios from "axios";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = getTokenFromUrl().access_token;
    if (token) {
      console.log("Access token:", token);
      setAuthToken(token);

      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const profile = response.data
          console.log("User Profile:", profile);
          setUserProfile(profile);
        })
        .catch((error) => console.error("Error fetching user profile:", error));
    }
    window.location.hash = "";
  }, []);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Ja<span style={{ color: "#1976d2" }}>mmm</span>ing
        </Typography>
        <Box>
          {authToken && userProfile ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
              }}
            >
              <img src={userProfile.images[0].url} style={{ height: 30, width: 30, margin: 8, borderRadius: 15 }}/>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {userProfile.display_name}
              </Typography>
            </Box>
          ) : (
            <AuthButton />
          )}
        </Box>
      </Box>
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
