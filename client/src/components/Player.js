import React, { useState } from "react";
import styled from "styled-components/macro";
import theme from "../style/theme";
import { formatDuration } from "../utils";
import { checkSavedTracks, deleteTrack, saveTrack } from "../spotify";
import { useEffect } from "react";
import LoadingIndicatorDot from "./LoadingIndicatorDot";
import { Link } from "@reach/router";

const { spacing, colors, transition } = theme;

const NoPlayer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerDiv = styled.div`
  margin-bottom: ${spacing.xxl} 0px;
`;

const PlayerStyle = styled.div`
  height: 150px;
  margin: ${spacing.base} 0px ${spacing.xxl} 0px;
  background-color: ${colors.backgroundgrey};
  border-radius: 16px;
  padding: ${spacing.base};
`;

const PlayerStyleDiv = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  width: 100%;
  align-items: center;
  .overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    margin-left: ${spacing.base};
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
    @media (max-width: 480px) {
      height: 64px;
      width: 64px;
      margin-left: 0px;
    }
  }
`;

const Names = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${spacing.base};
  justify-content: space-evenly;
  .sectiontitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${colors.white};
  }
  .artistname {
    color: ${colors.fontgrey};
  }
  .artistlink {
    color: ${colors.fontgrey};
  }
  @media (max-width: 480px) {
    margin-right: 0px;
  }
`;

const LikeTrackButton = styled.button`
  padding: 0px;
  background: transparent;
  font-size: 36px;
  margin-right: ${spacing.base};
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
  @media (max-width: 480px) {
    display: none;
  }
`;

const AudioFeaturesRange = styled.div`
  margin: 8px 0px;
  background-color: #535353;
  border-radius: 30px;
  height: 16px;
  width: 100%;
  .progressbar {
    width: 0%;
  }
`;

const AudioFeaturesRangeProgress = styled.div`
  height: 100%;
  width: 0%;
  background-color: ${colors.green};
  border-radius: 30px;
  transition: ${transition};
  &:hover {
    background-color: ${colors.highlightgreen};
  }
`;

const TrackProgressDiv = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  .time {
    margin: 0px ${spacing.m};
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const Player = (props) => {
  const [player, setPlayer] = useState(props.player);
  const [isLiked, setLike] = useState(null);

  useEffect(() => {
    if (player.item)
      checkSavedTracks(player.item.id).then((res) => setLike(res.data));
  }, []);

  function toggleLike() {
    if (isLiked[0]) deleteTrack(player.item.id).then(() => setLike([false]));
    else saveTrack(player.item.id).then(() => setLike([true]));
  }

  return (
    <PlayerDiv>
      <h2>Current playing</h2>
      <PlayerStyle>
        {player ? (
          isLiked ? (
            <PlayerStyleDiv>
              <img
                src={player.item.album.images[1].url}
                alt={player.item.name}
                height="118px"
                width="118px"
              />
              <Names className="overflow">
                <Link
                  key={player.item.name.replace(" ", "").toLowerCase()}
                  to={`/track/${player.item.id}`}
                  className="styledLink sectiontitle"
                >
                  <h2>{player.item.name}</h2>
                </Link>
                <div className="overflow">
                  {player.item.artists.map((objArtist, index) => (
                    <Link
                      key={objArtist.id}
                      to={`/artist/${objArtist.id}`}
                      className="styledLink artistlink"
                    >
                      <span>
                        {" "}
                        {objArtist.name}
                        {index < player.item.artists.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span> </span>
                        )}
                      </span>
                    </Link>
                  ))}
                  &nbsp;&middot;&nbsp;
                  <Link
                    to={`/album/${player.item.album.id}`}
                    className="styledLink artistlink"
                  >
                    <span> {player.item.album.name}</span>
                  </Link>
                </div>
              </Names>
              <LikeTrackButton onClick={toggleLike}>
                {isLiked[0] ? (
                  <i className="fas fa-heart filled-heart"></i>
                ) : (
                  <i className="far fa-heart empty-heart"></i>
                )}
              </LikeTrackButton>
              <TrackProgressDiv>
                <span className="time">
                  {formatDuration(player.progress_ms)}
                </span>
                <AudioFeaturesRange>
                  <AudioFeaturesRangeProgress
                    className="progressbar"
                    style={{
                      width: `${
                        (player.progress_ms / player.item.duration_ms) * 100
                      }%`,
                    }}
                  ></AudioFeaturesRangeProgress>
                </AudioFeaturesRange>
                <span className="time">
                  {formatDuration(player.item.duration_ms)}
                </span>
              </TrackProgressDiv>
            </PlayerStyleDiv>
          ) : (
            <LoadingIndicatorDot />
          )
        ) : (
          <NoPlayer>
            <span>You are not playing any song currently</span>
          </NoPlayer>
        )}
      </PlayerStyle>
    </PlayerDiv>
  );
};

export default Player;
