import React from 'react';
import { ListItem, ListItemText, Button } from "@mui/material";

export default function Track({ track, onAction, actionLabel }) {
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
    <ListItemText 
      primary={`${track.name} - ${track.artist}`}
      secondary={track.album}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={() => onAction(track)}
      sx={{ marginLeft: 2 }}
    >
      {actionLabel}
    </Button>
    </ListItem>
  );
}