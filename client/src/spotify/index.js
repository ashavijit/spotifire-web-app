import axios from "axios";
import { getHashParams } from "../utils";

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () =>
  window.localStorage.setItem("spotify_token_timestamp", Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () =>
  window.localStorage.getItem("spotify_token_timestamp");
const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");
const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === "undefined") {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === "undefined") {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem("spotify_token_timestamp");
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.location.reload();
};

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const getUser = () =>
  axios.get("https://api.spotify.com/v1/me", { headers });

export const getCurrentTrack = () =>
  axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
    headers,
  });

export const getSavedTracks = () =>
  axios.get("https://api.spotify.com/v1/me/tracks?limit=50", { headers });

export const getSavedAlbums = () =>
  axios.get("https://api.spotify.com/v1/me/albums?limit=50", { headers });

export const getSavedShows = () =>
  axios.get("https://api.spotify.com/v1/me/shows?limit=50", { headers });

export const getRecentlyPlayed = () =>
  axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
    headers,
  });

export const getTopTracksLongTerm = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
    {
      headers,
    }
  );

export const getTopTracksMediumTerm = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50",
    {
      headers,
    }
  );

export const getTopTracksShortTerm = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
    {
      headers,
    }
  );

export const getFollowedArtists = () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist&limit=50", {
    headers,
  });

export const getTopArtistsLongTerm = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
    {
      headers,
    }
  );

export const getTopArtistsMediumTerm = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50",
    {
      headers,
    }
  );

export const getTopArtistsShortTerm = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50",
    {
      headers,
    }
  );

export const getPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists?limit=50", { headers });

export const getTrack = (trackId) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

export const getTrackAudioFeatures = (trackId) =>
  axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers,
  });

export const checkSavedTracks = (trackId) =>
  axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, {
    headers,
  });

export const saveTrack = (trackId) => {
  const url = `https://api.spotify.com/v1/me/tracks?ids=${trackId}`;
  return axios({ method: "put", url, headers });
};

export const deleteTrack = (trackId) => {
  const url = `https://api.spotify.com/v1/me/tracks?ids=${trackId}`;
  return axios({ method: "delete", url, headers });
};

export const getArtist = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

export const checkFollowedArtist = (artistId) =>
  axios.get(
    `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,
    {
      headers,
    }
  );

export const followArtist = (artistId) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: "put", url, headers });
};

export const unfollowArtist = (artistId) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: "delete", url, headers });
};

export const getPlaylist = (playlistId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

export const getAlbum = (albumId) =>
  axios.get(`https://api.spotify.com/v1/albums/${albumId}`, { headers });

export const getShow = (showId) =>
  axios.get(`https://api.spotify.com/v1/shows/${showId}`, { headers });
