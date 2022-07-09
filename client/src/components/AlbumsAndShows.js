import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { PageStyle } from "../style/PageStyle";
import SavedAlbums from "./SavedAlbums";
import SavedShows from "./SavedShows";
import { getSavedAlbums, getSavedShows } from "../spotify";
import axios from "axios";

const AlbumsAndShows = () => {
  const [savedalbums, setSavedAlbums] = useState(null);
  const [savedshows, setSavedShows] = useState(null);

  async function getData() {
    axios.all([getSavedAlbums(), getSavedShows()]).then(
      axios.spread((sa, ss) => {
        setSavedAlbums(sa.data);
        setSavedShows(ss.data);
      })
    );
  }

  useEffect(() => {
    getData();
  }, []);

  return savedalbums && savedshows ? (
    <PageStyle>
      <SavedAlbums albums={savedalbums} />
      <SavedShows shows={savedshows} />
    </PageStyle>
  ) : (
    <LoadingIndicator />
  );
};

export default AlbumsAndShows;
