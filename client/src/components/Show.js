import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import styled from "styled-components/macro";
import theme from "../style/theme";
import { formatDuration } from "../utils";
import { getShow } from "../spotify";
import { ArtistNames } from "../style/SpotifyBlock";
import {
  SavedTracks,
  TracksNameSection,
  TimeStyle,
} from "../style/TracksStyle";

const { colors, fontSize, spacing } = theme;

const PageStyle = styled.div`
  min-height: 100vh;
  padding: 32px 64px;
  display: flex;
  flex-direction: column;
  .featurestitle {
    text-align: center;
  }
  .podcastIcon {
    color: ${colors.fontgrey};
    margin-right: ${spacing.base};
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
      margin: ${spacing.base} 0px;
    }
  }
  .tracktitleinfo {
    font-size: ${fontSize.l};
    color: ${colors.fontgrey};
  }
  .buttons {
    margin: ${spacing.xxl} 0px;
    @media (max-width: 480px) {
      margin: ${spacing.base} 0px;
    }
  }
  .by {
    font-size: ${fontSize.sm};
  }
  .desc {
    margin-top: ${spacing.xxl};
    @media (max-width: 480px) {
      margin-top: ${spacing.base};
    }
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
`;

const Show = (props) => {
  const [show, setShow] = useState(null);

  useEffect(() => {
    getShow(props.showId).then((sh) => setShow(sh.data));
  }, []);

  return show ? (
    <PageStyle>
      <TrackInfo>
        <img
          src={show.images[1].url}
          alt={show.name}
          height="300px"
          width="300px"
        />
        <div className="flexitem">
          <h6>{show.type.toUpperCase()}</h6>
          <h1 className="tracktitle">{show.name}</h1>
          <span className="tracktitleinfo">{show.publisher}</span>
          {show.description ? (
            <div className="desc">
              <span>{show.description}</span>
            </div>
          ) : (
            <span></span>
          )}
          <div>
            <span>{show.episodes.total} episodes</span>
          </div>
          <div className="buttons">
            <a
              href={show.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayButton>PLAY ON SPOTIFY</PlayButton>
            </a>
          </div>
        </div>
      </TrackInfo>
      <div>
        <h2>All Episodes</h2>
      </div>
      <div>
        {show.episodes.items.map((objTrack) => (
          <a
            href={objTrack.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            key={objTrack.id}
          >
            <SavedTracks>
              <span className="podcastIcon">
                <i className="fas fa-podcast"></i>
              </span>
              <TracksNameSection>
                <h4>{objTrack.name}</h4>
                <ArtistNames>{objTrack.release_date}</ArtistNames>
              </TracksNameSection>
              <TimeStyle>{formatDuration(objTrack.duration_ms)}</TimeStyle>
            </SavedTracks>
          </a>
        ))}
      </div>
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Show;
