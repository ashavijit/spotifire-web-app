import React from "react";
import styled from "styled-components/macro";
import theme from "../style/theme";
const { colors } = theme;
const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/login"
    : "https://spotify-stats-application.herokuapp.com/login";

const LoginScreenStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginHeading = styled.span`
  font-size: 48px;
  color: ${colors.green};
  margin-bottom: 20px;
  @media (max-width: 786px) {
    font-size: 24px;
  }
`;

const LoginButton = styled.button`
  background-color: ${colors.green};
  padding: 10px 30px;
  font-size: 32px;
  color: ${colors.white};
  &:hover {
    background-color: ${colors.highlightgreen};
  }
  &:focus {
    border: none;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 4px 10px;
  }
`;

const LoginScreen = () => {
  return (
    <LoginScreenStyle>
      <LoginHeading> Welcome to Spotify Stats</LoginHeading>
      <a href={LOGIN_URI}>
        <LoginButton>
          <span>LOGIN TO SPOTIFY </span>
        </LoginButton>
      </a>
    </LoginScreenStyle>
  );
};

export default LoginScreen;
