import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import styled from "styled-components/macro";
import {
  SavedTracks,
  SectionSong,
  SectionSongArtists,
  ArtistNames,
  HeadingBlock,
} from "../style/SpotifyBlock";
import {
  TracksStyle,
  ShowButtonDiv,
  ShowButton,
  TopTracksButton,
} from "../style/TracksStyle";
import { SectionHeadingStyle, SectionTitleDiv } from "../style/HeadingStyles";
import NoData from "./NoData";

const ImageDiv = styled.div`
  padding-bottom: 100%;
  position: relative;
  img {
    border-radius: 50%;
  }
`;

const TopArtists = (props) => {
  const [currentArtists, setCurrentArtists] = useState(props.longtermartists);
  const [active, setActive] = useState("ALL TIME");

  const [followedArtists, setFollowedArtists] = useState(
    props.longtermartists.items.slice(0, 6)
  );
  const [buttonSavedTracks, setButtonSavedTracks] = useState("more");

  function showMoreTracks() {
    if (buttonSavedTracks === "more") {
      setFollowedArtists(currentArtists.items);
      setButtonSavedTracks("less");
    } else {
      setFollowedArtists(currentArtists.items.slice(0, 6));
      setButtonSavedTracks("more");
    }
  }

  useEffect(() => {
    if (active === "ALL TIME") setCurrentArtists(props.longtermartists);
    else if (active === "LAST 6 MONTHS")
      setCurrentArtists(props.mediumtermartists);
    else setCurrentArtists(props.shorttermartists);
  }, [active, setActive]);

  useEffect(() => {
    setFollowedArtists(currentArtists.items.slice(0, 6));
    setButtonSavedTracks("more");
  }, [currentArtists]);

  return (
    <TracksStyle>
      <SavedTracks>
        <SectionHeadingStyle>
          <SectionTitleDiv>
            <h2>Top Artists</h2>
          </SectionTitleDiv>
          <TopTracksButton
            onClick={() => setActive("ALL TIME")}
            className={active === "ALL TIME" ? "active" : ""}
          >
            <span>ALL TIME</span>
          </TopTracksButton>
          <TopTracksButton
            onClick={() => setActive("LAST 6 MONTHS")}
            className={active === "LAST 6 MONTHS" ? "active" : ""}
          >
            <span>LAST 6 MONTHS</span>
          </TopTracksButton>
          <TopTracksButton
            onClick={() => setActive("LAST 4 WEEKS")}
            className={active === "LAST 4 WEEKS" ? "active" : ""}
          >
            <span>LAST 4 WEEKS</span>
          </TopTracksButton>
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

export default TopArtists;
