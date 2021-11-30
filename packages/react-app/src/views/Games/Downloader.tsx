/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { isWindows } from 'react-device-detect';
import download from 'downloadjs';
import { Typography } from 'antd';
import Container from '@material-ui/core/Container';
import MuiButton from '@material-ui/core/Button';
import { GetApp } from '@material-ui/icons';

import { NetworkContext } from 'NetworkProvider';

const { Title } = Typography;

const Downloader = (): JSX.Element => {
  const { targetNetwork } = useContext(NetworkContext);

  const handleDownload = async () => {
    const env = targetNetwork.chainId === 1 ? 'prod' : 'staging';
    const os = isWindows ? 'win' : 'osx';
    const baseURL = `https://nifty-league.s3.amazonaws.com/launcher/${env}/${os}`;
    const version: string = await fetch(`${baseURL}/version.bin`)
      .then(res => res.text())
      .catch(e => {
        console.error(e);
        return '';
      });
    const fileName = `NiftyLauncher-setup-${version.substring(0, version.indexOf('-'))}.exe`;
    const downloadURL = `${baseURL}/${version}/${fileName}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    download(downloadURL, fileName, 'application/octet-stream');
  };

  return (
    <Container style={{ textAlign: 'left', padding: '40px' }}>
      <Title level={2}>
        Nifty Smahers Desktop{' '}
        <span role="img" aria-label="joystick emoji">
          🕹️
        </span>
      </Title>
      <p>The Nifty League Desktop launcher is recommended for best performance... lorem ipsum... :)</p>
      <Title level={4}>Setup Steps:</Title>
      <ol style={{ lineHeight: '2.5rem' }}>
        <li>Download app below</li>
        <MuiButton
          variant="contained"
          disabled={!isWindows}
          color="primary"
          size="large"
          startIcon={<GetApp />}
          onClick={handleDownload}
        >
          Download for {isWindows ? 'Windows' : 'Mac OS will be added soon!'}
        </MuiButton>
        <li>Launch the game</li>
        <li>The game opens nifty-league.com to a link that is used for authentication with a unique token</li>
        <li>
          nifty-league.com then opens Metamask or other injected Web3 provider for signing a message to verify DEGEN
          ownership
        </li>
        <li>SMASH!</li>
      </ol>
    </Container>
  );
};

export default Downloader;
