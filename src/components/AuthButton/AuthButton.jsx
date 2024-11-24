import React from "react";
import { getAuthUrl } from "../../services/SpotifyAuth";
import { Button } from "@mui/material";

export default function AuthButton() {
  const handleLogin = () => {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
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