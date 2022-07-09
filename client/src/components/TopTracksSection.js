import React, { useState } from "react";
import MusicIcon from "./icons/MusicIcon";
import { formatDuration } from "../utils";
import { Link } from "@reach/router";
import { useEffect } from "react";
import {
  TracksStyle,
  SavedTracks,
  TracksNameSection,
  TimeStyle,
  ShowButtonDiv,
  ShowButton,
  TopTracksButton,
} from "../style/TracksStyle";
import { SectionHeadingStyle, SectionTitleDiv } from "../style/HeadingStyles";
import NoData from "./NoData";

const TopTrackSection = (props) => {
  const [currentTracks, setCurrentTracks] = useState(props.longtermtracks);
  const [active, setActive] = useState("ALL TIME");

  const [savedtracks, setSavedTracks] = useState(
    currentTracks.items.slice(0, 5)
  );
  const [buttonSavedTracks, setButtonSavedTracks] = useState("more");

  function showMoreTracks() {
    if (buttonSavedTracks === "more") {
      setSavedTracks(currentTracks.items);
      setButtonSavedTracks("less");
    } else {
      setSavedTracks(currentTracks.items.slice(0, 5));
      setButtonSavedTracks("more");
    }
  }

  useEffect(() => {
    if (active === "ALL TIME") setCurrentTracks(props.longtermtracks);
    else if (active === "LAST 6 MONTHS")
      setCurrentTracks(props.mediumtermtracks);
    else setCurrentTracks(props.shorttermtracks);
  }, [active, setActive]);

  useEffect(() => {
    setSavedTracks(currentTracks.items.slice(0, 5));
    setButtonSavedTracks("more");
  }, [currentTracks]);

  return (
    <TracksStyle>
      <SectionHeadingStyle>
        <SectionTitleDiv>
          <h2>Top Tracks</h2>
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
      <div>
        {savedtracks.length ? (
          savedtracks.map((objTrack) => (
            <Link to={`/track/${objTrack.id}`} key={objTrack.id}>
              <SavedTracks>
                <MusicIcon />
                <img
                  src={objTrack.album.images[2].url}
                  height="50px"
                  width="50px"
                  alt={objTrack.name}
                />
                <TracksNameSection>
                  <h4 className="link">{objTrack.name}</h4>
                  {objTrack.artists.map((objArtist, index) => (
                    <Link
                      to={`/artist/${objArtist.id}`}
                      key={objArtist.id}
                      className="styledLink artistlink"
                    >
                      <span className="link">
                        {" "}
                        {objArtist.name}
                        {index < objTrack.artists.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span> </span>
                        )}
                      </span>
                    </Link>
                  ))}
                  &nbsp;&middot;&nbsp;
                  <Link
                    to={`/album/${objTrack.album.id}`}
                    className="styledLink artistlink"
                  >
                    <span className="link"> {objTrack.album.name}</span>
                  </Link>
                </TracksNameSection>
                <TimeStyle>{formatDuration(objTrack.duration_ms)}</TimeStyle>
              </SavedTracks>
            </Link>
          ))
        ) : (
          <NoData
            type="track"
            desc="Let's find some tracks for you"
            spotifyLink="https://open.spotify.com/view/new-releases-page"
            btnName="New Releases"
          />
        )}
      </div>
      <ShowButtonDiv>
        {savedtracks.length ? (
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

export default TopTrackSection;
