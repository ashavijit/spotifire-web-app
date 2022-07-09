import React from "react";
import SectionHeading from "./SectionHeading";
import styled from "styled-components/macro";
import {
  SavedTracks,
  SectionSong,
  SectionSongArtists,
  ArtistNames,
  HeadingBlock,
} from "../style/SpotifyBlock";
import { Link } from "@reach/router";
import NoData from "./NoData";

const ImageDiv = styled.div`
  padding-bottom: 100%;
  position: relative;
  img {
    border-radius: 8px;
  }
`;

const ProfileSavedShows = (props) => {
  return (
    <SavedTracks>
      <SectionHeading heading="Saved Podcasts" link="/albumsandshows" />
      {props.shows.items.length ? (
        props.shows.items.slice(0, 6).map((objTrack) => (
          <Link to={`/show/${objTrack.show.id}`} key={objTrack.show.id}>
            <SectionSong>
              <ImageDiv>
                <img
                  src={objTrack.show.images[1].url}
                  alt={objTrack.show.name}
                />
              </ImageDiv>
              <SectionSongArtists>
                <HeadingBlock className="link">{objTrack.show.name}</HeadingBlock>
                <ArtistNames>{objTrack.show.publisher}</ArtistNames>
              </SectionSongArtists>
            </SectionSong>
          </Link>
        ))
      ) : (
        <NoData
          type="podcast"
          desc="Follow your first podcast"
          spotifyLink="https://open.spotify.com/genre/podcasts-web"
          btnName="Find Podcasts"
        />
      )}
    </SavedTracks>
  );
};

export default ProfileSavedShows;
