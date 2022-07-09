import styled from "styled-components/macro";
import theme from "../style/theme";

const { colors, fontSize, spacing, transition } = theme;

export const TracksStyle = styled.div`
  margin-top: ${spacing.xxl};
`;

export const SavedTracks = styled.div`
  margin-top: ${spacing.m};
  padding: ${spacing.m} ${spacing.base};
  display: flex;
  align-items: center;
  transition: ${transition};
  img {
    margin: 0px ${spacing.base};
    transition: ${transition};
  }
  &:hover {
    background-color: ${colors.backgroundgrey};
    img {
      opacity: 0.5;
    }
  }
`;

export const TracksNameSection = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.fontgrey};
  .artistlink {
    color: ${colors.fontgrey};
    font-size: ${fontSize.sm};
  }
  .link {
    @media (max-width: 768px) {
      text-decoration: underline;
    }
  }
  h4 {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TimeStyle = styled.span`
  font-size: ${fontSize.m};
  margin: 0px ${spacing.base};
  color: ${colors.fontgrey};
`;

export const ShowButtonDiv = styled.div`
  margin-top: ${spacing.base};
  text-align: center;
`;

export const ShowButton = styled.button`
  background-color: transparent;
  color: ${colors.white};
  &:hover {
    transform: scale(1.06);
  }
`;

export const TopTracksButton = styled.button`
  background-color: transparent;
  color: ${colors.fontgrey};
  letter-spacing: 1.76px;
  margin: 0px ${spacing.s};
  font-size: ${fontSize.sm};
  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: ${colors.white};
    text-decoration: underline;
  }
  @media (max-width: 376px) {
    margin: 0px;
    padding: 0.375rem 0.45rem;
    font-size: 8px;
  }
`;
