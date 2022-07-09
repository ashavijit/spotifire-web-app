import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { PageStyle } from "../style/PageStyle";
import styled from "styled-components/macro";
import { Link } from "@reach/router";
import { getPlaylists } from "../spotify";
import theme from "../style/theme";
import { ArtistNames } from "../style/SpotifyBlock";
import NoData from "./NoData";
import PlaylistIcon from "./icons/PlaylistIcon";

const { spacing, transition } = theme;

const GridDiv = styled.div`
  margin-top: ${spacing.xxl};
  display: grid;
  gap: ${spacing.base};
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  img {
    max-height: 100%;
    width: 100%;
    transition: ${transition};
    @media (max-width: 376px) {
      height: 160px;
      width: 160px;
    }
  }
`;

export const SectionHeadingStyle = styled.div`
  grid-column: 1/-1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spacing.xxl};
`;

export const SectionTitleDiv = styled.div`
  flex: 1;
`;

export const PlaylistInfo = styled.div`
  text-align: center;
  &:hover {
    img {
      opacity: 0.5;
    }
    h3 {
      text-decoration: underline;
    }
  }
`;

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    getPlaylists().then((pl) => setPlaylists(pl));
  }, []);

  return playlists ? (
    <PageStyle>
      <SectionHeadingStyle>
        <SectionTitleDiv>
          <h2>Your Playlists</h2>
        </SectionTitleDiv>
      </SectionHeadingStyle>
      <GridDiv>
        {playlists.data.items.length ? (
          playlists.data.items.map((objPlaylist) => (
            <Link to={`/playlist/${objPlaylist.id}`} key={objPlaylist.id}>
              <PlaylistInfo>
                {objPlaylist.images.length ? (
                  <img src={objPlaylist.images[0].url} alt={objPlaylist.name} />
                ) : (
                  <PlaylistIcon />
                )}
                <h3>{objPlaylist.name}</h3>
                <ArtistNames>{objPlaylist.tracks.total} Tracks</ArtistNames>
              </PlaylistInfo>
            </Link>
          ))
        ) : (
          <NoData
            type="playlist"
            desc="Create your first playlist"
            spotifyLink="https://open.spotify.com/search"
            btnName="Create Playlist"
          />
        )}
      </GridDiv>
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Playlists;
