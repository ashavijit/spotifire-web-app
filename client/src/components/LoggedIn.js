import React from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";
import styled from "styled-components/macro";
import { Router } from "@reach/router";
import Tracks from "./Tracks";
import Artists from "./Artists";
import AlbumsAndShows from "./AlbumsAndShows";
import Playlists from "./Playlists";
import Track from "./Track";
import Artist from "./Artist";
import Playlist from "./Playlist";
import Album from "./Album";
import Show from "./Show";

const AppDiv = styled.div`
  display: flex;
`;

const Content = styled.div`
  padding-left: 200px;
  width: 100%;
  @media (max-width: 768px) {
    padding-left: 0px;
  }
`;

const LoggedIn = () => {
  return (
    <AppDiv>
      <Navbar />
      <Content>
        <Router>
          <Profile path="/" />
          <Tracks path="/tracks" />
          <Artists path="/artists" />
          <Playlists path="/playlists" />
          <AlbumsAndShows path="/albumsandshows" />
          <Track path="/track/:trackId" />
          <Artist path="/artist/:artistId" />
          <Playlist path="/playlist/:playlistId" />
          <Album path="/album/:albumId" />
          <Show path="/show/:showId" />
        </Router>
      </Content>
    </AppDiv>
  );
};

export default LoggedIn;
