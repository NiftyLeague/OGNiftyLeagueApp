import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Progress, Image, Layout, Menu, Row, Col, Card } from "antd";
import { SportsEsports, SportsMma } from "@material-ui/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";
import CharacterBGImg from "../assets/images/backgrounds/character_creator.png";
import NiftySmashers from "../assets/gifs/nifty-smashers.gif";
import "antd/dist/antd.css";

const { Content, Sider } = Layout;

const smashersContext = new UnityContext({
  loaderUrl: "niftySmashersBuild/0.3.12.loader.js",
  dataUrl: "niftySmashersBuild/0.3.12.data",
  frameworkUrl: "niftySmashersBuild/0.3.12.framework.js",
  codeUrl: "niftySmashersBuild/0.3.12.wasm",
  streamingAssetsUrl: "streamingassets",
  companyName: "NiftyLeague",
  productName: "NiftySmashers",
  productVersion: "0.3.12",
});

const Game = ({ unityContext }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [progression, setProgression] = useState(0);

  const onMouse = () => {
    const content = document.getElementsByClassName("game-canvas")[0];
    if (content) {
      content.style["pointer-events"] = "auto";
      content.style.cursor = "pointer";
    }
  };

  useEffect(() => {
    if (unityContext) {
      unityContext.on("progress", p => setProgression(parseInt(p * 100, 10)));
      unityContext.on("loaded", () => setLoaded(true));
      unityContext.on("error", console.error);
      unityContext.on("canvas", element => console.log("Canvas", element));
      document.addEventListener("mousemove", onMouse, false);
    }
    return () => {
      document.removeEventListener("mousemove", onMouse, false);
      unityContext.removeAllEventListeners();
    };
  }, [unityContext]);

  const ready = isLoaded && progression === 100;

  return (
    <>
      {!ready && (
        <div style={{ position: "absolute", top: 360, width: "100%", fontSize: "50px !important" }}>
          <div style={{ fontWeight: "bold" }}>Loading Nifty Smashers...</div>
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={progression}
            key={progression}
          />
        </div>
      )}
      <Unity
        className="game-canvas"
        unityContext={unityContext}
        style={{
          width: 1120,
          height: 840,
          visibility: ready ? "visible" : "hidden",
        }}
      />
    </>
  );
};

export default function Games() {
  const { currentTheme } = useThemeSwitcher();
  const [selectedGame, setSelectedGame] = useState("all");
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(selectedGame === "all");
  }, [selectedGame]);

  return (
    <Layout>
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
        <Content
          style={{
            height: 840,
            backgroundImage: `url(${CharacterBGImg})`,
            backgroundRepeat: "repeat-x",
            ...(selectedGame === "all" && { padding: 40 }),
          }}
        >
          {selectedGame !== "all" ? (
            <Game unityContext={selectedGame === "nifty-smashers" && smashersContext} />
          ) : (
            <Row gutter={{ xs: 16, md: 8 }}>
              <Col span={6}>
                <Card
                  cover={<img alt="NiftySmashers" src={NiftySmashers} />}
                  onClick={() => setSelectedGame("nifty-smashers")}
                  hoverable
                >
                  <Card.Meta title="Nifty Smashers" description="First of it's kind NFT brawler!" />
                </Card>
              </Col>
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
