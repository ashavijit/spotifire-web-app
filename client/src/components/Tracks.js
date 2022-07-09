import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import TrackSection from "./TracksSection";
import axios from "axios";
import {
  getSavedTracks,
  getRecentlyPlayed,
  getTopTracksLongTerm,
  getTopTracksMediumTerm,
  getTopTracksShortTerm,
} from "../spotify";
import TopTrackSection from "./TopTracksSection";
import { PageStyle } from "../style/PageStyle";
import RecentlyPlayed from "./RecentlyPlayed";

const Tracks = () => {
  const [savedTracks, setSavedTracks] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [longTermTracks, setLongTermTracks] = useState(null);
  const [mediumTermTracks, setMediumTermTracks] = useState(null);
  const [shortTermTracks, setShortTermTracks] = useState(null);

  async function getProfileData() {
    axios
      .all([
        getSavedTracks(),
        getRecentlyPlayed(),
        getTopTracksLongTerm(),
        getTopTracksMediumTerm(),
        getTopTracksShortTerm(),
      ])
      .then(
        axios.spread((st, rp, ttlt, ttmt, ttst) => {
          setSavedTracks(st.data);
          setRecentlyPlayed(rp.data);
          setLongTermTracks(ttlt.data);
          setMediumTermTracks(ttmt.data);
          setShortTermTracks(ttst.data);
        })
      );
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return savedTracks &&
    recentlyPlayed &&
    longTermTracks &&
    mediumTermTracks &&
    shortTermTracks ? (
    <PageStyle>
      <TrackSection tracks={savedTracks} title="Saved Tracks" />
      <RecentlyPlayed tracks={recentlyPlayed} title="Recently Played" />
      <TopTrackSection
        longtermtracks={longTermTracks}
        mediumtermtracks={mediumTermTracks}
        shorttermtracks={shortTermTracks}
      />
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default Tracks;
