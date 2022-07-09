import React, { useState } from "react";
import MusicIcon from "./icons/MusicIcon";
import { formatDuration } from "../utils";
import { Link } from "@reach/router";
import {
  TracksStyle,
  SavedTracks,
  TracksNameSection,
  TimeStyle,
  ShowButtonDiv,
  ShowButton,
} from "../style/TracksStyle";
import NoData from "./NoData";

const TrackSection = (props) => {
  const [savedtracks, setSavedTracks] = useState(
    props.tracks.items.slice(0, 5)
  );
  const [buttonSavedTracks, setButtonSavedTracks] = useState("more");

  function showMoreTracks() {
    if (buttonSavedTracks === "more") {
      setSavedTracks(props.tracks.items);
      setButtonSavedTracks("less");
    } else {
      setSavedTracks(props.tracks.items.slice(0, 5));
      setButtonSavedTracks("more");
    }
  }

  return (
    <TracksStyle>
      <div>
        <h2>{props.title}</h2>
      </div>
      <div>
        {savedtracks.length ? (
          savedtracks.map((objTrack) => (
            <Link to={`/track/${objTrack.track.id}`} key={objTrack.track.id}>
              <SavedTracks>
                <MusicIcon />
                <img
                  src={objTrack.track.album.images[2].url}
                  height="50px"
                  width="50px"
                  alt={objTrack.track.name}
                />
                <TracksNameSection>
                  <h4 className="link">{objTrack.track.name}</h4>
                  {objTrack.track.artists.map((objArtist, index) => (
                    <Link
                      to={`/artist/${objArtist.id}`}
                      key={objArtist.id}
                      className="styledLink artistlink"
                    >
                      <span className="link">
                        {" "}
                        {objArtist.name}
                        {index < objTrack.track.artists.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span> </span>
                        )}
                      </span>
                    </Link>
                  ))}
                  &nbsp;&middot;&nbsp;
                  <Link
                    to={`/album/${objTrack.track.album.id}`}
                    className="styledLink artistlink"
                  >
                    <span className="link"> {objTrack.track.album.name}</span>
                  </Link>
                </TracksNameSection>
                <TimeStyle>
                  {formatDuration(objTrack.track.duration_ms)}
                </TimeStyle>
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

export default TrackSection;
