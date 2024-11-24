import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ProfileView({ profile }) {
    const name = profile.display_name;
    const imageUrl = profile.images[0].url;
    const imgStyle = { 
      height: 30, 
      width: 30, 
      margin: 8, 
      borderRadius: 15
    };
  
    return (
      <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
        }}
      >
        <img src={imageUrl} style={imgStyle}/>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {name}
        </Typography>
      </Box>
    );
  }