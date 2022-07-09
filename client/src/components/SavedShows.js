import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  SavedTracks,
  SectionSong,
  SectionSongArtists,
  ArtistNames,
  HeadingBlock,
} from "../style/SpotifyBlock";
import { TracksStyle, ShowButtonDiv, ShowButton } from "../style/TracksStyle";
import { SectionHeadingStyle, SectionTitleDiv } from "../style/HeadingStyles";
import { Link } from "@reach/router";
import NoData from "./NoData";

const ImageDiv = styled.div`
  padding-bottom: 100%;
  position: relative;
  img {
    border-radius: 8px;
  }
`;

const SavedShows = (props) => {
  const [savedShows, setSavedShows] = useState(props.shows.items.slice(0, 6));
  const [buttonSavedTracks, setButtonSavedTracks] = useState("more");

  function showMoreTracks() {
    if (buttonSavedTracks === "more") {
      setSavedShows(props.shows.items);
      setButtonSavedTracks("less");
    } else {
      setSavedShows(props.shows.items.slice(0, 6));
      setButtonSavedTracks("more");
    }
  }

  return (
    <TracksStyle>
      <SavedTracks>
        <SectionHeadingStyle>
          <SectionTitleDiv>
            <h2>Saved Podcasts</h2>
          </SectionTitleDiv>
        </SectionHeadingStyle>
        {savedShows.length ? (
          savedShows.map((objTrack) => (
            <Link to={`/show/${objTrack.show.id}`} key={objTrack.show.id}>
              <SectionSong>
                <ImageDiv>
                  <img
                    src={objTrack.show.images[1].url}
                    alt={objTrack.show.name}
                  />
                </ImageDiv>
                <SectionSongArtists>
                  <HeadingBlock>{objTrack.show.name}</HeadingBlock>
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
      <ShowButtonDiv>
        {savedShows.length ? (
          <ShowButton onClick={showMoreTracks}>
            SHOW {buttonSavedTracks.toUpperCase() + "  "}
            <i
              className={`fas fa-chevron-${
                buttonSavedTracks === "more" ? "down" : "up"
              }`}
            ></i>
          </ShowButton>
        ) : (
          <div></div>
        )}
      </ShowButtonDiv>
    </TracksStyle>
  );
};

export default SavedShows;
