import React from 'react';
import { Link } from 'react-router-dom';
import { createFromIconfontCN, TwitterOutlined } from '@ant-design/icons';

import './footer.css';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2659896_snpn0dgh5n9.js',
});

export default function Footer(): JSX.Element {
  return (
    <footer>
      <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/NiftyLeague">
        <TwitterOutlined />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/niftyleague">
        <IconFont className="discord" type="icon-discord" />
      </a>
      <div className="siteLinks">
        <Link to="/terms-of-service">Terms of Service</Link> • <Link to="/disclaimer">Disclaimer</Link> •{' '}
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
