import React from "react";
import styled from "styled-components/macro";
import theme from "../style/theme";

const { spacing } = theme;

const NodataStyle = styled.div`
  grid-column: 1/-1;
  width: 100%;
  text-align: center;
  .margintop {
    margin-top: ${spacing.base};
  }
  .btn {
    &:hover {
      transform: scale(1.06);
    }
  }
`;

const NoData = (props) => {
  return (
    <NodataStyle>
      <div className="margintop">
        <span>NO SAVED {props.type.toUpperCase()}S</span>
      </div>
      <div className="margintop">
        <span>{props.desc}</span>
      </div>
      <div className="margintop">
        <a href={props.spotifyLink} target="_blank" rel="noopener noreferrer">
          <button className="btn">{props.btnName.toUpperCase()}</button>
        </a>
      </div>
    </NodataStyle>
  );
};

export default NoData;
