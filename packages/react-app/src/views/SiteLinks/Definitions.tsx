import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Definitions = (): JSX.Element => (
  <>
    <Title level={3}>Interpretation and Definitions</Title>
    <Title level={4}>Interpretation</Title>
    <p>
      The words of which the initial letter is capitalized have meanings defined under the following conditions. The
      following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
    </p>
    <Title level={4}>Definitions</Title>
    <p>For the purposes of these Terms and Conditions:</p>
    <ul>
      <li>
        <strong>Company</strong> (referred to as either "the Nifty League", "We", "Us" or "Our" in this Agreement)
        refers to AMA LLC.
      </li>
      <li>
        <strong>You</strong> (also referred to as "User") refers to the individual accessing or using the Service, or
        the company, or other legal entity on behalf of which such individual is accessing or using the Service, as
        applicable.
      </li>
      <li>
        <strong>Terms and Conditions</strong> (also referred to as "Terms") mean these Terms and Conditions that form
        the entire agreement between You and the Company regarding the use of the Service.
      </li>
      <li>
        <strong>Site</strong> refers to the Nifty League, accessible from https://www.nifty-league.com and all
        subdomains as well as any other media form, media channel, mobile website or mobile application related, linked,
        or otherwise connected thereto.
      </li>
      <li>
        <strong>Online Games</strong> refer to any games accessible from https://www.nifty-league.com/games while
        interacting with our Smart Contracts.
      </li>
      <li>
        <strong>Smart Contracts</strong> mean digital contracts used with our Service on the Ethereum Blockchain,
        Polygon (or any other applicable network) which are immutable to any alteration.
      </li>
      <li>
        <strong>Application</strong> (also referred to as "App") collectively refers to the Smart Contracts, Site, and
        any Online Games offered by the Nifty League.
      </li>
      <li>
        <strong>Service</strong> refers to the App.
      </li>
      <li>
        <strong>NFT-Token</strong> means a digital good on the Ethereum Blockchain (or any other applicable network)
        which represents ownership of a certain piece of artwork such as our DEGEN NFTs or other assets offered by the
        Nifty League.
      </li>
      <li>
        <strong>Goods</strong> refer to the items and NFT-Tokens offered for sale on the Application.
      </li>
      <li>
        <strong>Orders</strong> means a request by You to purchase Goods from Us.
      </li>
    </ul>
  </>
);

export default Definitions;
