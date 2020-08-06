import React from 'react';
import YouTube from 'react-youtube';
import styled, { css } from 'styled-components';
import PageDefault from '../../../components/PageDefault';

function onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}
const Field = styled.div`
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const FieldYoutube = styled(YouTube)`
    width: 100%;
    @media (min-width:740px){
      width: 600px;
    }
`;
function PlayerVideos() {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <PageDefault>
      <FieldYoutube videoId="ZaYvwn9nBD4" opts={opts} onReady={onReady} />
    </PageDefault>
  );
}

export default PlayerVideos;
