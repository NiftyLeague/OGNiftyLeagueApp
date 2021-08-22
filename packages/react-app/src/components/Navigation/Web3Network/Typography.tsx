import React from 'react';
import clsx from 'clsx';

const VARIANTS = {
  hero: 'text-hero',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  body: 'text-body',
  caption: 'text-caption',
  caption2: 'text-caption-2',
};

function Typography({ variant = 'body', component = 'div', className = 'text-primary', children = [] }): JSX.Element {
  return React.createElement(component, { className: clsx(VARIANTS[variant], className) }, children);
}

export default Typography;
