const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "b6a077c50d8c4da1919f62ff24374e41";
const redirectUri = "http://localhost:3000/callback";
const scopes = [
  "playlist-modify-private",
  "playlist-modify-public",
  "user-read-private",
  "user-read-email",
];

export const getAuthUrl = () => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
};

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
};