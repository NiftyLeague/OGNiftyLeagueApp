import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import VideoBGImg from 'assets/images/games/nifty-smashers.png';
import PlayIconImg from 'assets/images/play-icon-red.png';
import './index.css';

const NiftySmashersVideo = (): JSX.Element => {
  const [isVideoOpen, setVideoOpen] = useState(false);

  return (
    <div className="about-video">
      <img src={VideoBGImg} alt="Nifty Smashers preview" className="video-preview" />
      <button type="button" onClick={() => setVideoOpen(true)} className="play-video">
        <img src={PlayIconImg} alt="Play icon" />
      </button>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isVideoOpen}
        videoId="F8xUzipc1p8"
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
};

export default NiftySmashersVideo;
