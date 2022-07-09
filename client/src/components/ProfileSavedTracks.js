import React from "react";
import MusicIcon from "./icons/MusicIcon";
import { formatDuration } from "../utils";
import { Link } from "@reach/router";
import {
  TracksStyle,
  SavedTracks,
  TracksNameSection,
  TimeStyle,
} from "../style/TracksStyle";
import SectionHeading from "./SectionHeading";
import NoData from "./NoData";

const TrackSection = (props) => {
  return (
    <TracksStyle>
      <SectionHeading heading="Saved Tracks" link="/tracks" />
      {props.tracks.items.length ? (
        props.tracks.items.slice(0, 5).map((objTrack) => (
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
                  <span className="link">{objTrack.track.album.name}</span>
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
    </TracksStyle>
  );
};

export default TrackSection;
