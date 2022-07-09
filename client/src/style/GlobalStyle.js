import { createGlobalStyle } from "styled-components";
import theme from "./theme";
import CircularStdBlackWoff from "../fonts/CircularStd-Black.woff";
import CircularStdBlackWoff2 from "../fonts/CircularStd-Black.woff2";
const { colors, fontSize, transition } = theme;

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std'), local('CircularStd'),
    url(${CircularStdBlackWoff}) format('woff'),
    url(${CircularStdBlackWoff2}) format('woff');
  }

    html {
        background-color: ${colors.black};
    }

    body {
        font-family: 'Circular Std';
        background-color: ${colors.bodygrey};
        margin: 0px;
        min-height: 100vh;
        font-size: ${fontSize.base};
        letter-spacing: 0.015em;
        color: ${colors.fontgrey};
    }

    * {
        box-sizing: border-box;
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${colors.white};
        margin: 0px;
        font-weight: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h1 {
        color: ${colors.white};
        margin: 0px;
        font-weight: normal;
    }

    h2 {
        display: inline;
    }

    a {
        text-decoration: none;
        background-color: transparent;
    }

    .unStyledLink {
        :hover {
            text-decoration: none;
        }
    }

    .styledLink {
        &:hover {
            color: ${colors.white};
            text-decoration: underline;
            text-decoration-color: ${colors.white};
        }
    }

    button {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        border-radius: 30px;
        letter-spacing: 1.76px;
        cursor: pointer;
        font-family: 'Circular Std';
        transition: ${transition};
        &:focus {
            outline: 0px;
        }
    }
`;

export default GlobalStyle;
