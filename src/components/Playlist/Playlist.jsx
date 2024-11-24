import React from "react";
import { Box, Typography, List, Button, TextField } from "@mui/material";
import Track from "../Track/Track";

export default function Playlist({
  tracks,
  playlistName,
  onNameChange,
  onRemoveTrack,
  onSave,
}) {
  const content = (
    tracks.map((track) => (
      <Track
        key={track.id}
        track={track}
        onAction={onRemoveTrack}
        actionLabel="-"
      />
    ))
  );

  const empty = (
    <Typography variant="body1" color="textSecondary">
      Your playlist is empty.
    </Typography>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "92%",
        overflowY: "auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 1,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Playlist
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Playlist Name"
        value={playlistName}
        onChange={onNameChange}
        sx={{ marginBottom: 2 }}
      />
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 2,
        }}
      >
        {tracks.length > 0 ? content : empty}
      </List>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={tracks.length === 0}
        onClick={onSave}
        sx={{ marginTop: "auto" }}
      >
        Save to Spotify
      </Button>
    </Box>
  );
}