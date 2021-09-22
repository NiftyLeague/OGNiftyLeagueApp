import React from 'react';
import { Typography } from 'antd';
import { Container } from '@material-ui/core';
import Footer from 'components/Footer';

const { Title } = Typography;

const ContractAddresses = (): JSX.Element => (
  <>
    <Container style={{ textAlign: 'left', padding: '40px', height: '100%' }}>
      <Title level={2}>Contracts and Links</Title>
      <Title level={4}>
        NFTL Token:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://etherscan.io/token/0x3c8D2FCE49906e11e71cB16Fa0fFeB2B16C29638"
        >
          0x3c8D2FCE49906e11e71cB16Fa0fFeB2B16C29638
        </a>
      </Title>
      <Title level={4}>
        NiftyDegen NFT:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://etherscan.io/token/0x986aea67C7d6A15036e18678065eb663Fc5BE883"
        >
          0x986aea67C7d6A15036e18678065eb663Fc5BE883
        </a>
      </Title>
      <Title level={4}>
        Airdrop Merkle Distributor:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://etherscan.io/address/0x96192Bbeb47F3f97927C18f274bE5B50360b9c61"
        >
          0x96192Bbeb47F3f97927C18f274bE5B50360b9c61
        </a>
      </Title>
      <Title level={4}>
        Nifty DAO Treasury:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://etherscan.io/address/0xd06ae6fb7eade890f3e295d69a6679380c9456c1"
        >
          0xd06ae6fb7eade890f3e295d69a6679380c9456c1
        </a>
      </Title>
      <Title level={4}>
        Team NFTL Timelock:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://etherscan.io/address/0xFeB2f45A3817EF9156a6c771FfC90098d3DFe003"
        >
          0xFeB2f45A3817EF9156a6c771FfC90098d3DFe003
        </a>
      </Title>
    </Container>
    <Footer />
  </>
);

export default ContractAddresses;
