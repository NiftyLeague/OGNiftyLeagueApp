import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import { ReactComponent as PreloaderSVG } from 'assets/svg/preloader.svg';
import './preloader.css';

export default function Preloader({ ready, progress }: { ready: boolean; progress: number }): JSX.Element {
  const [percent, setPercent] = useState(progress);

  useEffect(() => {
    if (progress !== 90) {
      setPercent(progress);
    } else {
      const id = setInterval(() => {
        setPercent(p => (p < 90 ? p + 10 : 90));
      }, 100);
      return () => clearInterval(id);
    }
    return undefined;
  }, [progress]);

  useEffect(() => {
    const htmlElement = document.querySelector('html') as HTMLElement;
    if (!ready) {
      htmlElement.style.overflow = 'hidden';
    } else {
      htmlElement.style.overflow = 'auto';
    }
    return function cleanup() {
      htmlElement.style.overflow = 'auto';
    };
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
      <Progress
        key={percent}
        percent={percent}
        size="small"
        status={percent < 100 ? 'active' : 'success'}
        strokeColor="#a3ff12"
        style={{ width: 160, marginLeft: 32 }}
      />
    </div>
  );
}
