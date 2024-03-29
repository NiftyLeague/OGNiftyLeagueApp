/* eslint-disable no-nested-ternary */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { isMobileOnly } from 'react-device-detect';
import { Button, Card, Col, Image, Layout, Menu, Row } from 'antd';
import { SportsEsports, WebAsset, DesktopWindows } from '@mui/icons-material';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { NetworkContext } from 'NetworkProvider';
import Preloader from 'components/Preloader';
import withVerification from 'components/Authentication';
import NiftySmashers from 'assets/gifs/nifty-smashers.gif';
import NiftySmashersThumb from 'assets/images/alien-dj.png';
import NiftyDesktop from 'assets/gifs/nifty-smashers-desktop.gif';
import NiftyDesktopThumb from 'assets/images/games/smashers_icon.png';
import { DEBUG, NETWORK_NAME } from '../../constants';
import Downloader from './Downloader';
import './games.css';

const { Content, Sider } = Layout;

const baseUrl = process.env.REACT_APP_UNITY_SMASHERS_BASE_URL as string;
const buildVersion = process.env.REACT_APP_UNITY_SMASHERS_BASE_VERSION as string;

const smashersContext = new UnityContext({
  loaderUrl: `${baseUrl}/Build/${buildVersion}.loader.js`,
  dataUrl: `${baseUrl}/Build/${buildVersion}.data.br`,
  frameworkUrl: `${baseUrl}/Build/${buildVersion}.framework.js.br`,
  codeUrl: `${baseUrl}/Build/${buildVersion}.wasm.br`,
  streamingAssetsUrl: `${baseUrl}/StreamingAssets`,
  companyName: 'NiftyLeague',
  productName: 'NiftySmashers',
  productVersion: buildVersion,
});

const Game = ({ auth, unityContext }: { auth: string; unityContext: UnityContext }) => {
  const { address, targetNetwork } = useContext(NetworkContext);
  const favs = window.localStorage.getItem('FAV_DEGENS') || '';
  const authMsg = `true,${address || '0x0'},Vitalik,${auth},${favs}`;
  const authCallback = useRef<null | ((authMsg: string) => void)>();
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (address.length && authCallback.current) {
      authCallback.current(authMsg);
    }
  }, [address, authMsg]);

  const startAuthentication = useCallback(
    (e: CustomEvent<{ callback: (auth: string) => void }>) => {
      if (DEBUG) console.log('Authenticating:', authMsg);
      e.detail.callback(authMsg);
      authCallback.current = e.detail.callback;
    },
    [authMsg],
  );

  const getConfiguration = useCallback(
    (e: CustomEvent<{ callback: (network: string) => void }>) => {
      const networkName = NETWORK_NAME[targetNetwork.chainId];
      const version = process.env.REACT_APP_SUBGRAPH_VERSION;
      if (DEBUG) console.log(`${networkName},${version ?? ''}`);
      setTimeout(() => e.detail.callback(`${networkName},${version ?? ''}`), 1000);
    },
    [targetNetwork.chainId],
  );

  const onMouse = useCallback(() => {
    const content = Array.from(document.getElementsByClassName('game-canvas') as HTMLCollectionOf<HTMLElement>)[0];
    if (content) {
      content.style['pointer-events'] = 'auto';
      content.style.cursor = 'pointer';
    }
  }, []);

  useEffect(() => {
    if (unityContext) {
      window.unityInstance = unityContext;
      // eslint-disable-next-line @typescript-eslint/unbound-method
      window.unityInstance.SendMessage = unityContext.send;
      unityContext.on('loaded', () => setLoaded(true));
      unityContext.on('error', console.error);
      unityContext.on('progress', p => setProgress(p * 100));
      window.addEventListener('StartAuthentication', startAuthentication);
      window.addEventListener('GetConfiguration', getConfiguration);
      document.addEventListener('mousemove', onMouse, false);
    }
    return () => {
      if (window.unityInstance) window.unityInstance.removeAllEventListeners();
      window.removeEventListener('StartAuthentication', startAuthentication);
      window.removeEventListener('GetConfiguration', getConfiguration);
      document.removeEventListener('mousemove', onMouse, false);
    };
  }, [unityContext, onMouse, startAuthentication, getConfiguration]);

  const handleOnClickFullscreen = () => {
    if (window.unityInstance) window.unityInstance.setFullscreen(true);
  };

  const btnStyles = {
    verticalAlign: 'top',
    marginLeft: 8,
    marginTop: 16,
    background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    color: '#fff',
    borderColor: '#6f6c6c',
  };

  return (
    <>
      <Preloader ready={isLoaded} progress={progress} />
      <Unity
        className="game-canvas"
        unityContext={unityContext}
        style={{
          width: 'calc(90vh * 1.33)',
          height: '90vh',
          marginTop: 5,
          visibility: isLoaded ? 'visible' : 'hidden',
        }}
      />
      <Button style={btnStyles} shape="round" size="large" onClick={handleOnClickFullscreen}>
        Fullscreen
      </Button>
    </>
  );
};

const GameWithAuth = withVerification((props: { auth: string; unityContext: UnityContext }) => Game(props));

export default function Games(): JSX.Element {
  const { currentTheme } = useThemeSwitcher();
  const [selectedGame, setSelectedGame] = useState('all');
  const [collapsed, setCollapsed] = useState(true);

  return !isMobileOnly ? (
    <Layout className="games">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme={currentTheme}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedGame]}
          onClick={({ key }) => setSelectedGame(key)}
          style={{ textAlign: 'center' }}
        >
          <Menu.Item key="all" icon={<SportsEsports />}>
            All Games
          </Menu.Item>
          <Menu.Item key="nifty-smashers" icon={<WebAsset />}>
            Nifty Smashers WebGL
          </Menu.Item>
          {!collapsed && <Image width={190} src={NiftySmashers} />}
          <Menu.Item key="nifty-league-desktop" icon={<DesktopWindows />}>
            Nifty League Desktop
          </Menu.Item>
          {!collapsed && <Image width={190} src={NiftySmashers} />}
          {!collapsed && (
            <Menu.Item key="more" disabled>
              More coming soon!
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content style={{ ...(selectedGame === 'all' && { padding: 40 }) }}>
          {selectedGame !== 'all' ? (
            <>
              {selectedGame === 'nifty-smashers' ? <GameWithAuth unityContext={smashersContext} /> : null}
              {selectedGame === 'nifty-league-desktop' ? <Downloader /> : null}
            </>
          ) : (
            <Row gutter={{ xs: 16, md: 16 }}>
              <Col xs={12} md={12} xl={8} xxl={6}>
                <Card
                  cover={<img alt="Nifty Smashers" src={NiftySmashers} />}
                  onClick={() => setSelectedGame('nifty-smashers')}
                  hoverable
                >
                  <Card.Meta
                    title="Nifty Smashers WebGL"
                    description="The first and only NFT brawler!"
                    avatar={
                      <div className="thumb">
                        <img src={NiftySmashersThumb} alt="game icon" />
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={12} md={12} xl={8} xxl={6}>
                <Card
                  cover={<img alt="Nifty League Desktop" src={NiftyDesktop} />}
                  onClick={() => setSelectedGame('nifty-league-desktop')}
                  hoverable
                  className="desktop"
                >
                  <Card.Meta
                    title="Nifty League Desktop"
                    description="Use our Desktop app for latest updates"
                    avatar={
                      <div className="thumb">
                        <img src={NiftyDesktopThumb} alt="game icon" />
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  ) : (
    <div style={{ paddingTop: 60 }}>Gaming is not supported on mobile devices at the moment</div>
  );
}
