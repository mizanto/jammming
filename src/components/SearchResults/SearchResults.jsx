import React from 'react';
import { Box, Typography, List } from "@mui/material";
import Track from "../Track/Track";

export default function SearchResults({ tracks, onAdd }) {
    return (
      <Box
        sx={{
          height: "92%",
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: 1,
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Search Results
        </Typography>
        <List>
          {tracks.length > 0 ? (
            tracks.map((track) => (
              <Track key={track.id} track={track} onAction={onAdd} actionLabel="+" />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No results found.
            </Typography>
          )}
        </List>
      </Box>
    );
}