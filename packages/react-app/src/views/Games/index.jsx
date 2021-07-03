import React, { useCallback, useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Image, Layout, Menu, Row, Col, Card } from "antd";
import { SportsEsports, SportsMma } from "@material-ui/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Preloader from "components/Preloader";
import NiftySmashers from "assets/gifs/nifty-smashers.gif";
import NiftySmashersThumb from "assets/images/characters/alien-dj.png";
import "./games.css";

const { Content, Sider } = Layout;

const smashersContext = new UnityContext({
  loaderUrl: "niftySmashersBuild/0.6.9.loader.js",
  dataUrl: "niftySmashersBuild/0.6.9.data",
  frameworkUrl: "niftySmashersBuild/0.6.9.framework.js",
  codeUrl: "niftySmashersBuild/0.6.9.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "NiftyLeague",
  productName: "NiftySmashers",
  productVersion: "0.6.9",
});

const Game = ({ address, unityContext }) => {
  const [isLoaded, setLoaded] = useState(false);

  const startAuthentication = useCallback(
    async e => {
      const result = `true,${address},My awesome Username`;
      e.detail.callback(result);
    },
    [address],
  );

  const onMouse = useCallback(() => {
    const content = document.getElementsByClassName("game-canvas")[0];
    if (content) {
      content.style["pointer-events"] = "auto";
      content.style.cursor = "pointer";
    }
  }, []);

  useEffect(() => {
    if (unityContext) {
      window.unityInstance = unityContext;
      window.unityInstance.SendMessage = unityContext.send;
      unityContext.on("loaded", () => setLoaded(true));
      unityContext.on("error", console.error);
      unityContext.on("canvas", element => console.log("Canvas", element));
      window.addEventListener("StartAuthentication", startAuthentication);
      document.addEventListener("mousemove", onMouse, false);
    }
    return () => {
      unityContext.removeAllEventListeners();
      window.removeEventListener("StartAuthentication", startAuthentication);
      document.removeEventListener("mousemove", onMouse, false);
    };
  }, [unityContext, onMouse]);

  return (
    <>
      <Preloader ready={isLoaded} />
      <Unity
        className="game-canvas"
        unityContext={unityContext}
        style={{
          width: 1120,
          height: 840,
          visibility: isLoaded ? "visible" : "hidden",
        }}
      />
    </>
  );
};

export default function Games({ address }) {
  const { currentTheme } = useThemeSwitcher();
  const [selectedGame, setSelectedGame] = useState("all");
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(selectedGame === "all");
  }, [selectedGame]);

  return (
    <Layout className="games">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme={currentTheme}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedGame]}
          onClick={({ key }) => setSelectedGame(key)}
          style={{ textAlign: "center" }}
        >
          <Menu.Item key="all" icon={<SportsEsports />}>
            All Games
          </Menu.Item>
          <Menu.Item key="nifty-smashers" icon={<SportsMma />}>
            NiftySmashers
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
        <Content style={{ ...(selectedGame === "all" && { padding: 40 }) }}>
          {selectedGame !== "all" ? (
            <Game address={address} unityContext={selectedGame === "nifty-smashers" && smashersContext} />
          ) : (
            <Row gutter={{ xs: 16, md: 8 }}>
              <Col span={6}>
                <Card
                  cover={<img alt="NiftySmashers" src={NiftySmashers} />}
                  onClick={() => setSelectedGame("nifty-smashers")}
                  hoverable
                >
                  <Card.Meta
                    title="Nifty Smashers"
                    description="The first and only NFT brawler!"
                    avatar={
                      <div className="thumb">
                        <img src={NiftySmashersThumb} alt="game icon" />
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
  );
}
