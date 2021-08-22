import React, { useEffect } from 'react';
import { ReactComponent as PreloaderSVG } from '../../assets/svg/preloader.svg';
import './preloader.css';

export default function Preloader({ ready }: { ready: boolean }): JSX.Element {
  useEffect(() => {
    const htmlElement = document.querySelector('html') as HTMLElement;
    if (!ready) {
      htmlElement.style.overflow = 'hidden';
    } else {
      htmlElement.style.overflow = 'auto';
    }
  }, [ready]);

  return (
    <div
      className="preloader-overlay"
      style={ready ? { transform: 'translateY(100%)' } : { transform: 'transform: translateY(0)' }}
    >
      <div id="js-preloader" className="preloader">
        <div className="preloader-inner fadeInUp">
          <div className="pong-loader" />
          <div className="pong-loader-left" />
          <div className="pong-loader-right" />
          <svg role="img" className="df-icon df-icon--preloader-arcade">
            <PreloaderSVG />
          </svg>
        </div>
      </div>
    </div>
  );
}
