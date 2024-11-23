import React from "react";
import { TextField, Button, Box } from "@mui/material";

export default function SearchBar({ query, onSearch, onQueryChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 1,
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Enter a song, album, or artist"
        value={query}
        onChange={onQueryChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        sx={{ height: "fit-content" }}
      >
        Search
      </Button>
    </Box>
  );
};