import React, { useEffect } from "react";
import { Spotify } from "../../services/Spotify";
import { Button } from "@mui/material";

export default function AuthButton({ onAuthSuccess }) {
  useEffect(() => {
    const token = Spotify.extractTokenFromUrl();
    if (token) {
      console.log("Token successfully set:", token);
      if (onAuthSuccess) {
        onAuthSuccess(token);
      }
    }
  }, []);
  
  const handleLogin = () => {
    window.location.href = Spotify.getAuthUrl();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogin}
    >
      Login with Spotify
    </Button>
  );
}