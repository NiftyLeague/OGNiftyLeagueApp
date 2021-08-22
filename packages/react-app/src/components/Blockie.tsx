import React from 'react';
import Blockies from 'react-blockies';

// provides a blockie image for the address using "react-blockies" library

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Blockie(props): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { address }: { address: string } = props;
  if (!address || typeof address.toLowerCase !== 'function') {
    return <span />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Blockies seed={address.toLowerCase()} {...props} />;
}
