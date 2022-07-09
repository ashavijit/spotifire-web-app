import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import ProfileUserInfo from "./ProfileUserInfo";
import axios from "axios";
import {
  getUser,
  getSavedTracks,
  getSavedAlbums,
  getSavedShows,
  getCurrentTrack,
  getFollowedArtists,
  getPlaylists,
} from "../spotify/index";
import Player from "./Player";
import ProfileSavedTracks from "./ProfileSavedTracks";
import ProfileSavedAlbums from "./ProfileSavedAlbums";
import ProfileSavedShows from "./ProfileSavedShows";
import ProfileFollowedArtists from "./ProfileFollowedArtists";
import { PageStyle } from "../style/PageStyle";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [savedAlbums, setSavedAlbums] = useState(null);
  const [savedShows, setSavedShows] = useState(null);

  async function getProfileData() {
    axios
      .all([
        getUser(),
        getPlaylists(),
        getCurrentTrack(),
        getSavedTracks(),
        getFollowedArtists(),
        getSavedAlbums(),
        getSavedShows(),
      ])
      .then(
        axios.spread((user, pl, ct, st, fa, sa, ss) => {
          setUser(user.data);
          setPlaylists(pl.data);
          setCurrentPlayer(ct);
          setSavedTracks(st.data);
          setFollowedArtists(fa.data);
          setSavedAlbums(sa.data);
          setSavedShows(ss.data);
        })
      );
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return user &&
    playlists &&
    currentPlayer &&
    savedTracks &&
    followedArtists &&
    savedAlbums &&
    savedShows ? (
    <PageStyle>
      <ProfileUserInfo user={user} playlists={playlists} />
      <Player player={currentPlayer.data} />
      <ProfileSavedTracks tracks={savedTracks} />
      <ProfileFollowedArtists artists={followedArtists} />
      <ProfileSavedAlbums albums={savedAlbums} />
      <ProfileSavedShows shows={savedShows} />
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Profile;
