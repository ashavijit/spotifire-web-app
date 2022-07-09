import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components/macro";

const LoaderStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingIndicatorDot = () => {
  return (
    <LoaderStyle>
      <Loader type="ThreeDots" color="#1db954" height={50} width={50} />
    </LoaderStyle>
  );
};

export default LoadingIndicatorDot;
