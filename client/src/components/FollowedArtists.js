import React, { useState } from "react";
import styled from "styled-components/macro";
import { Link } from "@reach/router";
import {
  SavedTracks,
  SectionSong,
  SectionSongArtists,
  ArtistNames,
  HeadingBlock,
} from "../style/SpotifyBlock";
import { TracksStyle, ShowButtonDiv, ShowButton } from "../style/TracksStyle";
import { SectionHeadingStyle, SectionTitleDiv } from "../style/HeadingStyles";
import NoData from "./NoData";

const ImageDiv = styled.div`
  padding-bottom: 100%;
  position: relative;
  img {
    border-radius: 50%;
  }
`;

const FollowedArtists = (props) => {
  const [followedArtists, setFollowedArtists] = useState(
    props.artists.artists.items.slice(0, 6)
  );
  const [buttonSavedTracks, setButtonSavedTracks] = useState("more");

  function showMoreTracks() {
    if (buttonSavedTracks === "more") {
      setFollowedArtists(props.artists.artists.items);
      setButtonSavedTracks("less");
    } else {
      setFollowedArtists(props.artists.artists.items.slice(0, 6));
      setButtonSavedTracks("more");
    }
  }

  return (
    <TracksStyle>
      <SavedTracks>
        <SectionHeadingStyle>
          <SectionTitleDiv>
            <h2>Followed Artists</h2>
          </SectionTitleDiv>
        </SectionHeadingStyle>
        {followedArtists.length ? (
          followedArtists.map((objArtist) => (
            <Link to={`/artist/${objArtist.id}`} key={objArtist.id}>
              <SectionSong>
                <ImageDiv>
                  <img src={objArtist.images[1].url} alt={objArtist.name} />
                </ImageDiv>
                <SectionSongArtists>
                  <HeadingBlock className="link">{objArtist.name}</HeadingBlock>
                  <ArtistNames>Artist</ArtistNames>
                </SectionSongArtists>
              </SectionSong>
            </Link>
          ))
        ) : (
          <NoData
            type="artist"
            desc="Follow your first artist"
            spotifyLink="https://open.spotify.com/search"
            btnName="Find Artists"
          />
        )}
      </SavedTracks>
      <ShowButtonDiv>
        {followedArtists.length ? (
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

export default FollowedArtists;
