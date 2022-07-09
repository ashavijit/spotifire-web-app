import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import styled from "styled-components/macro";
import theme from "../style/theme";
import axios from "axios";
import { PageStyle } from "../style/PageStyle";
import { formatWithCommas } from "../utils";
import {
  getArtist,
  checkFollowedArtist,
  followArtist,
  unfollowArtist,
} from "../spotify";

const { colors, fontSize, spacing } = theme;

const ArtistInfo = styled.div`
  margin: ${spacing.xxl} 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-radius: 50%;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
    @media (max-width: 480px) {
      height: 200px;
      width: 200px;
    }
  }
  .title {
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -0.04em;
    &:hover {
      color: ${colors.green};
      text-decoration: none;
    }
    @media (max-width: 480px) {
      font-size: 32px;
    }
  }
  .value {
    font-size: ${fontSize.l};
    color: ${colors.green};
  }
  .featureName {
    font-size: ${fontSize.sm};
  }
  .flexcontainer {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding-top: 32px;
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
  .flexcontent {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn {
    color: ${colors.white};
    background: transparent;
    margin: ${spacing.m};
    border: 1px solid hsla(0, 0%, 100%, 0.3);
    border-radius: ${spacing.s};
    padding: 7px 15px;
    line-height: 16px;
    &:hover {
      transform: scale(1.06);
      border: 1px solid ${colors.white};
    }
  }
  .flexcontainer.flexcontainergenre {
    padding-top: 16px;
  }
  .link {
    @media (max-width: 768px) {
      text-decoration: underline;
    }
  }
`;

const Artist = (props) => {
  const [artist, setArtist] = useState(null);
  const [artistStatus, setArtistStatus] = useState(null);

  async function getArtistData() {
    axios
      .all([getArtist(props.artistId), checkFollowedArtist(props.artistId)])
      .then(
        axios.spread((ga, cfa) => {
          setArtist(ga.data);
          setArtistStatus(cfa.data[0]);
        })
      );
  }

  useEffect(() => {
    getArtistData();
  }, []);

  function toggleFollow() {
    if (artistStatus)
      unfollowArtist(props.artistId).then(() => setArtistStatus(false));
    else followArtist(props.artistId).then(() => setArtistStatus(true));
  }

  return artist ? (
    <PageStyle>
      <ArtistInfo>
        <img
          src={artist.images[1].url}
          alt={artist.name}
          height="350px"
          width="350px"
        />
        <div className="flexcontainer">
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="title link">{artist.name}</h1>
          </a>
          <button className="btn" onClick={toggleFollow}>
            {artistStatus ? "FOLLOWING" : "FOLLOW"}
          </button>
        </div>
        <div className="flexcontainer">
          <div className="flexcontent">
            <span className="value">
              {formatWithCommas(artist.followers.total)}
            </span>
            <span className="featureName">FOLLOWERS</span>
          </div>
          <div className="flexcontent">
            <span className="value">{artist.popularity}%</span>
            <span className="featureName">POPULARITY</span>
          </div>
        </div>
        <div className="flexcontainer">
          <h3>Genres</h3>
        </div>
        <div className="flexcontainer flexcontainergenre">
          {artist.genres.map((objGenre) => (
            <span className="value" key={objGenre}>
              {objGenre.toUpperCase()}
            </span>
          ))}
        </div>
      </ArtistInfo>
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Artist;
