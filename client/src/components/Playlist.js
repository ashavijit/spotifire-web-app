import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import styled from "styled-components/macro";
import theme from "../style/theme";
import { Link } from "@reach/router";
import {
  formatDuration,
  formatWithCommas,
  formatDurationForHumans,
} from "../utils";
import { getPlaylist } from "../spotify";
import MusicIcon from "./icons/MusicIcon";
import {
  SavedTracks,
  TracksNameSection,
  TimeStyle,
} from "../style/TracksStyle";
import PlaylistIcon from "./icons/PlaylistIcon";

const { colors, fontSize, spacing } = theme;

const PageStyle = styled.div`
  min-height: 100vh;
  padding: 32px 64px;
  display: flex;
  flex-direction: column;
  .featurestitle {
    text-align: center;
  }
  @media (max-width: 768px) {
    padding: 48px 32px;
  }
`;

const TrackInfo = styled.div`
  margin: ${spacing.xxl} 0px;
  display: flex;
  align-items: center;
  .flexitem {
    margin-left: ${spacing.base};
    @media (max-width: 480px) {
      h6 {
        display: none;
      }
    }
  }
  .tracktitle {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -0.04em;
    margin: ${spacing.xxl} 0px;
    @media (max-width: 480px) {
      font-size: 32px;
    }
  }
  .buttons {
    margin: ${spacing.xxl} 0px;
  }
  .by {
    font-size: ${fontSize.sm};
  }
  .desc {
    margin-bottom: ${spacing.xxl};
  }
  img {
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
    @media (max-width: 480px) {
      height: 200px;
      width: 200px;
    }
  }
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PlayButton = styled.button`
  color: ${colors.white};
  background-color: ${colors.green};
  padding: ${spacing.m} ${spacing.xl};
  margin-left: ${spacing.xxl};
  font-size: ${fontSize.m};
  &:hover {
    background-color: ${colors.highlightgreen};
  }
  @media (max-width: 480px) {
    margin-left: 0px;
  }
`;

const Playlist = (props) => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    getPlaylist(props.playlistId).then((pl) => setPlaylist(pl.data));
  }, []);

  return playlist ? (
    <PageStyle>
      <TrackInfo>
        {playlist.images.length ? (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            height="300px"
            width="300px"
          />
        ) : (
          <PlaylistIcon />
        )}
        <div className="flexitem">
          <h6>{playlist.type.toUpperCase()}</h6>
          <h1 className="tracktitle">{playlist.name}</h1>
          {playlist.description ? (
            <div className="desc">
              <span>{playlist.description}</span>
            </div>
          ) : (
            <span></span>
          )}
          <div>
            <span>
              <span className="by">BY</span> {playlist.owner.display_name}
            </span>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <span>{formatWithCommas(playlist.followers.total)} likes</span>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <span>
              {formatDurationForHumans(
                playlist.tracks.items.reduce(
                  (tot, track) => tot + track.track.duration_ms,
                  0
                )
              )}
            </span>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <span>{playlist.tracks.total} tracks</span>
          </div>
          <div className="buttons">
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayButton>PLAY ON SPOTIFY</PlayButton>
            </a>
          </div>
        </div>
      </TrackInfo>
      <div>
        <h2>Tracks</h2>
      </div>
      <div>
        {playlist.tracks.items.map((objTrack) => (
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
        ))}
      </div>
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Playlist;
