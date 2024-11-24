import axios from "axios";

const authSettings = {
  endpoint: "https://accounts.spotify.com/authorize",
  clientId: "",
  redirectUri: "http://localhost:3000/callback",
  scopes: [
    "playlist-modify-private",
    "playlist-modify-public",
    "user-read-private",
    "user-read-email",
  ],
}

let token = null;
let userInfo = null;

export const Spotify = {
  setAccessToken: (accessToken) => {
    token = accessToken;
  },

  getAccessToken: () => token,

  isAuthorised: () => !!token,

  getAuthUrl: () => {
    return `${authSettings.endpoint}?client_id=${authSettings.clientId}&redirect_uri=${encodeURIComponent(
      authSettings.redirectUri
    )}&scope=${authSettings.scopes.join("%20")}&response_type=token&show_dialog=true`;
  },

  extractTokenFromUrl: () => {
    const tokenData = window.location.hash
      .substring(1)
      .split("&")
      .reduce((acc, item) => {
        const [key, value] = item.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});

    if (tokenData.access_token) {
      token = tokenData.access_token;
      window.location.hash = "";
      console.log("Access token set:", token);
    }
    return tokenData.access_token || null;
  },

  searchTracks: async (query) => {
    if (!token) {
      throw new Error("Access token is missing");
    }

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 20,
      },
    });

    return response.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  fetchUserInfo: async () => {
    if (!token) {
      throw new Error("Access token is missing");
    }

    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    userInfo = response.data;
    return userInfo;
  },

  /**
   * Сохранить плейлист
   * @param {string} name - Название плейлиста
   * @param {Array<string>} trackUris - URI треков для добавления
   * @returns {Promise<void>}
   */
  savePlaylist: async (name, trackUris) => {
    if (!token) {
      throw new Error("Access token is missing");
    }

    if (!userInfo) {
      userInfo = await Spotify.fetchUserInfo();
    }

    const playlistResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userInfo.id}/playlists`,
      {
        name,
        description: "Created with Jammming",
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const playlistId = playlistResponse.data.id;

    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: trackUris,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};