import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import FollowedArtists from "./FollowedArtists";
import axios from "axios";
import {
  getFollowedArtists,
  getTopArtistsLongTerm,
  getTopArtistsMediumTerm,
  getTopArtistsShortTerm,
} from "../spotify";
import TopArtists from "./TopArtists";
import { PageStyle } from "../style/PageStyle";

const Artists = () => {
  const [followedArtists, setFollowedArtists] = useState(null);
  const [longTermArtists, setLongTermArtists] = useState(null);
  const [mediumTermArtists, setMediumTermArtists] = useState(null);
  const [shortTermArtists, setShortTermArtists] = useState(null);

  async function getProfileData() {
    axios
      .all([
        getFollowedArtists(),
        getTopArtistsLongTerm(),
        getTopArtistsMediumTerm(),
        getTopArtistsShortTerm(),
      ])
      .then(
        axios.spread((fa, ttla, ttma, ttsa) => {
          setFollowedArtists(fa.data);
          setLongTermArtists(ttla.data);
          setMediumTermArtists(ttma.data);
          setShortTermArtists(ttsa.data);
        })
      );
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return followedArtists &&
    longTermArtists &&
    mediumTermArtists &&
    shortTermArtists ? (
    <PageStyle>
      <FollowedArtists artists={followedArtists} />
      <TopArtists
        longtermartists={longTermArtists}
        mediumtermartists={mediumTermArtists}
        shorttermartists={shortTermArtists}
      />
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Artists;
