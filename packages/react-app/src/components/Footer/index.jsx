import React from 'react';

import { createFromIconfontCN, TwitterOutlined } from '@ant-design/icons';

import './footer.css';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2659896_snpn0dgh5n9.js',
});

export default function Footer() {
  return (
    <footer>
      <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/NiftyLeague">
        <TwitterOutlined />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4bmTHYWjhe">
        <IconFont className="discord" type="icon-discord" />
      </a>
    </footer>
  );
}
