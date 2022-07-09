import React from "react";
import SectionHeading from "./SectionHeading";
import {
  SavedTracks,
  SectionSong,
  SectionSongArtists,
  ArtistNames,
  ImageDiv,
  HeadingBlock,
} from "../style/SpotifyBlock";
import { Link } from "@reach/router";
import NoData from "./NoData";

const ProfileSavedAlbums = (props) => {
  return (
    <SavedTracks>
      <SectionHeading heading="Saved Albums" link="/albumsandshows" />
      {props.albums.items.length ? (
        props.albums.items.slice(0, 6).map((objTrack) => (
          <Link to={`/album/${objTrack.album.id}`} key={objTrack.album.id}>
            <SectionSong>
              <ImageDiv>
                <img
                  src={objTrack.album.images[1].url}
                  alt={objTrack.album.name}
                />
              </ImageDiv>
              <SectionSongArtists>
                <HeadingBlock className="link">{objTrack.album.name}</HeadingBlock>
                {objTrack.album.artists.map((objArtist, index) => (
                  <Link
                    to={`/artist/${objArtist.id}`}
                    key={objArtist.id}
                    className="styledLink"
                  >
                    <ArtistNames className="link">
                      {" "}
                      {objArtist.name}
                      {index < objTrack.album.artists.length - 1 ? (
                        <span>,</span>
                      ) : (
                        <span> </span>
                      )}
                    </ArtistNames>
                  </Link>
                ))}
              </SectionSongArtists>
            </SectionSong>
          </Link>
        ))
      ) : (
        <NoData
          type="album"
          desc="Follow your first album"
          spotifyLink="https://open.spotify.com/search"
          btnName="Find Albums"
        />
      )}
    </SavedTracks>
  );
};

export default ProfileSavedAlbums;
