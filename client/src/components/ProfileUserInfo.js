import React from "react";
import styled from "styled-components/macro";
import theme from "../style/theme";
import IconUser from "./icons/user";
import { Link } from "@reach/router";

const { colors, fontSize, spacing } = theme;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: ${spacing.xxl};
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const UserImg = styled.div`
  width: 200px;
  height: 200px;
  display: block;
  img {
    border-radius: 50%;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }
`;

const NoImg = styled.div`
  border: 2px solid ${colors.white};
  border-radius: 50%;
  height: 100%;
  padding: 30px;
`;

const UserInfoNameStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    font-size: 72px;
    font-weight: 900;
    letter-spacing: -0.04em;
    &:hover {
      color: ${colors.green};
      text-decoration: none;
    }
    @media (max-width: 768px) {
      font-size: 48px;
      margin: 16px 0px;
    }
    @media (max-width: 480px) {
      font-size: 32px;
    }
  }
  .greyfont {
    color: ${colors.fontgrey};
  }
  .link {
    @media (max-width: 768px) {
      text-decoration: underline;
    }
  }
  span {
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

const Num = styled.span`
  text-align: center;
  color: ${colors.green};
  font-size: ${fontSize.l};
  margin: 0px ${spacing.m};
`;

const ProfileUserInfo = (props) => {
  return (
    <UserInfo>
      <UserImg>
        {props.user.images[0] ? (
          <img
            src={props.user.images[0].url}
            alt={props.user.display_name}
            height="200px"
            width="200px"
          />
        ) : (
          <NoImg>
            <IconUser />
          </NoImg>
        )}
      </UserImg>
      <UserInfoNameStats>
        <a
          className="unStyledLink"
          href={props.user.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className="link">{props.user.display_name}</h1>
        </a>
        <div>
          <span className="greyfont">
            <Num>{props.user.followers.total}</Num> FOLLOWERS
          </span>
          &nbsp;&nbsp;&nbsp;&middot;&nbsp;
          <Num>{props.playlists.total}</Num>
          <Link to="/playlists" className="styledLink greyfont">
            <span className="link">PLAYLISTS</span>
          </Link>
        </div>
      </UserInfoNameStats>
    </UserInfo>
  );
};

export default ProfileUserInfo;
