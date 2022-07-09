import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";
import styled from "styled-components/macro";
import theme from "../style/theme";
import { getYear, formatDuration, parsePitchClass } from "../utils";
import AudioFeatures from "./AudioFeatures";
import {
  getTrack,
  getTrackAudioFeatures,
  checkSavedTracks,
  saveTrack,
  deleteTrack,
} from "../spotify";
import { Link } from "@reach/router";

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
      margin-left: 0px;
    }
  }
  .tracktitle {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -0.04em;
    margin-bottom: ${spacing.xxl};
    @media (max-width: 480px) {
      font-size: 32px;
      margin: ${spacing.base} 0px;
    }
  }
  .tracktitleinfo {
    font-size: ${fontSize.l};
    color: ${colors.fontgrey};
    @media (max-width: 480px) {
      font-size: ${fontSize.base};
    }
  }
  .albuminfo {
    margin: ${spacing.xxl} 0px;
    @media (max-width: 480px) {
      margin: ${spacing.base} 0px;
    }
  }
  .albumname {
    font-size: ${fontSize.m};
    color: ${colors.fontgrey};
  }
  .link {
    @media (max-width: 768px) {
      text-decoration: underline;
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
    align-items: center;
  }
`;

const PlayButton = styled.button`
  color: ${colors.white};
  background-color: ${colors.green};
  padding: ${spacing.m} ${spacing.xl};
  font-size: ${fontSize.m};
  &:hover {
    background-color: ${colors.highlightgreen};
  }
  @media (max-width: 376px) {
    padding: ${spacing.m} ${spacing.base};
  }
  @media (max-width: 330px) {
    margin-bottom: ${spacing.base};
  }
`;

const AudioFeaturesStyle = styled.div`
  flex: 1;
  margin-top: ${spacing.xxl};
  display: flex;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AudioFeaturesFirst = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${spacing.xxl};
  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0px;
  }
`;

const AudioFeaturesSecond = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const AudioFeaturesDiv = styled.div`
  line-height: 32px;
  .feature {
    font-size: ${fontSize.l};
    color: ${colors.green};
    float: right;
  }
`;

const LikeTrackButton = styled.button`
  margin: 0px ${spacing.xxl};
  padding: 0px;
  background: transparent;
  font-size: 36px;
  .filled-heart {
    color: ${colors.green};
    &:hover {
      color: ${colors.highlightgreen};
      transform: scale(1.06);
    }
  }
  .empty-heart {
    color: ${colors.fontgrey};
    &:hover {
      color: ${colors.white};
      transform: scale(1.06);
    }
  }
`;

const FeatureName = styled.span`
  font-size: ${fontSize.sm};
`;

const Track = (props) => {
  const [track, setTrack] = useState(null);
  const [trackAudioFeatures, setTrackAudioFeatures] = useState(null);
  const [savedTrackStatus, setSavedTrackStatus] = useState(null);

  async function getTrackData() {
    axios
      .all([
        getTrack(props.trackId),
        getTrackAudioFeatures(props.trackId),
        checkSavedTracks(props.trackId),
      ])
      .then(
        axios.spread((gt, taf, cst) => {
          setTrack(gt.data);
          setTrackAudioFeatures(taf.data);
          setSavedTrackStatus(cst.data[0]);
        })
      );
  }

  useEffect(() => {
    getTrackData();
  }, []);

  function toggleLike() {
    if (savedTrackStatus)
      deleteTrack(props.trackId).then(() => setSavedTrackStatus(false));
    else saveTrack(props.trackId).then(() => setSavedTrackStatus(true));
  }

  return track && trackAudioFeatures ? (
    <PageStyle>
      <TrackInfo>
        <img
          src={track.album.images[1].url}
          alt={track.name}
          height="300px"
          width="300px"
        />
        <div className="flexitem">
          <h1 className="tracktitle">{track.name}</h1>
          <div>
            {track.artists.map((objArtist, index) => (
              <Link
                to={`/artist/${objArtist.id}`}
                key={objArtist.id}
                className="styledLink tracktitleinfo"
              >
                <span className="link">
                  {" "}
                  {objArtist.name}
                  {index < track.artists.length - 1 ? (
                    <span>,</span>
                  ) : (
                    <span> </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
          <div className="albuminfo">
            <Link
              to={`/album/${track.album.id}`}
              className="styledLink albumname"
            >
              <span className="link">{track.album.name}</span>
            </Link>
            <span className="albumname">
              &nbsp;&nbsp;&middot;&nbsp;&nbsp;
              {getYear(track.album.release_date)}
            </span>
          </div>
          <div>
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayButton>PLAY ON SPOTIFY</PlayButton>
            </a>
            <LikeTrackButton onClick={toggleLike}>
              {savedTrackStatus ? (
                <i className="fas fa-heart filled-heart"></i>
              ) : (
                <i className="far fa-heart empty-heart"></i>
              )}
            </LikeTrackButton>
          </div>
        </div>
      </TrackInfo>
      <h3 className="featurestitle">Audio Features</h3>
      <AudioFeaturesStyle>
        <AudioFeaturesFirst>
          <AudioFeaturesDiv>
            <FeatureName>DURATION</FeatureName>{" "}
            <span className="feature">
              {formatDuration(trackAudioFeatures.duration_ms)}
            </span>
          </AudioFeaturesDiv>
          <AudioFeaturesDiv>
            <FeatureName>POPULARITY</FeatureName>{" "}
            <span className="feature">{track.popularity} %</span>
          </AudioFeaturesDiv>
          <AudioFeaturesDiv>
            <FeatureName>KEY</FeatureName>{" "}
            <span className="feature">
              {parsePitchClass(trackAudioFeatures.key)}
            </span>
          </AudioFeaturesDiv>
          <AudioFeaturesDiv>
            <FeatureName>MODE</FeatureName>{" "}
            <span className="feature">
              {trackAudioFeatures.mode === 0 ? "Minor" : "Major"}
            </span>
          </AudioFeaturesDiv>
          <AudioFeaturesDiv>
            <FeatureName>TIME_SIGNATURE</FeatureName>{" "}
            <span className="feature">{trackAudioFeatures.time_signature}</span>
          </AudioFeaturesDiv>
          <AudioFeaturesDiv>
            <FeatureName>LOUDNESS</FeatureName>{" "}
            <span className="feature">{trackAudioFeatures.loudness} Db</span>
          </AudioFeaturesDiv>
          <AudioFeaturesDiv>
            <FeatureName>TEMPO</FeatureName>{" "}
            <span className="feature">{trackAudioFeatures.tempo}</span>
          </AudioFeaturesDiv>
        </AudioFeaturesFirst>
        <AudioFeaturesSecond>
          <AudioFeatures
            name="ACOUSTICNESS"
            feature={trackAudioFeatures.acousticness}
          />
          <AudioFeatures
            name="DANCEABILITY"
            feature={trackAudioFeatures.danceability}
          />
          <AudioFeatures name="Energy" feature={trackAudioFeatures.energy} />
          <AudioFeatures
            name="INSTRUMENTALNESS"
            feature={trackAudioFeatures.instrumentalness}
          />
          <AudioFeatures
            name="LIVENESS"
            feature={trackAudioFeatures.liveness}
          />
          <AudioFeatures
            name="SPEECHINESS"
            feature={trackAudioFeatures.speechiness}
          />
          <AudioFeatures name="VALENCE" feature={trackAudioFeatures.valence} />
        </AudioFeaturesSecond>
      </AudioFeaturesStyle>
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Track;
