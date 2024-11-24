import React from "react";
import { Box, Typography } from '@mui/material';
import AuthButton from "../AuthButton/AuthButton";
import ProfileView from "../ProfileView/ProfileView";

export default function Header({ profile, onAuthSuccess }) {
  return (
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
        {profile ? 
          <ProfileView profile={profile} /> 
        : 
          <AuthButton onAuthSuccess={onAuthSuccess} />
        }
      </Box>
  </Box>
  );
}
