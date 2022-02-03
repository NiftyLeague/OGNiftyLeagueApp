/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import { isWindows } from 'react-device-detect';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Typography } from 'antd';
import Container from '@material-ui/core/Container';
import MuiButton from '@material-ui/core/Button';
import { GetApp } from '@material-ui/icons';

import { NetworkContext } from 'NetworkProvider';

const { Title } = Typography;

const Downloader = (): JSX.Element => {
  const { currentTheme } = useThemeSwitcher();
  const { targetNetwork } = useContext(NetworkContext);
  const [version, setVersion] = useState('');
  const env = targetNetwork.chainId === 1 ? 'prod' : 'stage';
  const os = isWindows ? 'win' : 'osx';
  const fileName = `NiftyLauncher-setup-${version.substring(0, version.indexOf('-'))}.exe`;
  const downloadURL = `https://d7ct17ettlkln.cloudfront.net/launcher/${env}/${os}/${version}/${fileName}`;

  useEffect(() => {
    const fetchVersion = async () => {
      const v: string = await fetch(
        `https://nifty-league.s3.amazonaws.com/launcher/${env}/${os}/version.bin?t=${Date.now()}`,
      )
        .then(res => {
          if (res.status >= 400) {
            console.error(res.text());
            return '';
          }
          return res.text();
        })
        .catch(e => {
          console.error(e);
          return '';
        });
      setVersion(v);
    };
    void fetchVersion();
  }, [env, os]);

  return (
    <Container style={{ textAlign: 'left', padding: '40px' }}>
      <Title level={2}>
        Nifty League Desktop{' '}
        <span role="img" aria-label="joystick emoji">
          🕹️
        </span>
      </Title>
      <p>The Nifty League Desktop is recommended for best performance and latest game updates.</p>
      <Title level={4}>Setup Steps:</Title>
      <ol style={{ lineHeight: '2.5rem' }}>
        <li>Download the installer below</li>
        <MuiButton
          color="primary"
          disabled={!isWindows || !version}
          href={downloadURL}
          size="large"
          startIcon={<GetApp />}
          style={{ color: currentTheme === 'dark' ? 'white' : 'black' }}
          variant="contained"
        >
          {!version && isWindows
            ? 'Fetching installer version...'
            : `Download for ${isWindows ? 'Windows' : 'Mac OS will be added soon!'}`}
        </MuiButton>
        <li>
          Run the installer to install <strong>Nifty Launcher</strong> and an optional shortcut
        </li>
        <li>
          Launch the game using <strong>Nifty Launcher</strong>
        </li>
        <li>
          The game opens up <strong>nifty-league.com</strong> for account verification
        </li>
        <li>Sign a message via MetaMask or other accepted Web3 providers to verify your account</li>
        <li>
          Return to the game and <strong>SMASH</strong>!!
        </li>
      </ol>
      <p>
        <em>
          * We are in the process of obtaining a Code Signing Certificate to avoid the Windows' SmartScreen warning
        </em>
      </p>
    </Container>
  );
};

export default Downloader;
