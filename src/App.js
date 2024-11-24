import React, {useState, useEffect} from "react";
import { Box } from '@mui/material';
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import SearchResultsContainer from "./components/SearchResults/SearchResultsContainer";
import PlaylistContainer from "./components/Playlist/PlaylistContainer";
import { Spotify } from "./services/Spotify";
import Header from "./components/Header/Header";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isAuthorised, setIsAuthorised] = useState(Spotify.isAuthorised());
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthorised) {
        try {
          const profile = await Spotify.fetchUserInfo();
          console.log("User Profile:", profile);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        console.log('Error: User unauthorised');
      }
      window.location.hash = "";
    };

    fetchUserInfo();
  }, [isAuthorised]);

  const handleAuthSuccess = (token) => {
    console.log("User authorised with token:", token);
    setIsAuthorised(true);
  };

  const handleSearch = async (query) => {
    console.log("Search for:", query);

    if (!isAuthorised) {
      console.error("No access token available. Please log in.");
      return;
    }

    try {
      const results = await Spotify.searchTracks(query);
      console.log("Search Results:", results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
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
      <Header profile={userProfile} onAuthSuccess={handleAuthSuccess}/>
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
