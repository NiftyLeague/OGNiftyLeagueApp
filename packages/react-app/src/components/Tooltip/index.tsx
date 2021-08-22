import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Popover from './Popover';

const TooltipContainer = styled.div`
  width: 228px;
  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;
  font-size: 16px;
`;

const TooltipInner = styled.div`
  height: 100%;
  display: flex;
`;

function Tooltip({ text, ...rest }): JSX.Element {
  return <Popover content={<TooltipContainer>{text}</TooltipContainer>} {...rest} />;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MouseoverTooltip({ children, ...rest }): JSX.Element {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return (
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'text' is missing in type '{ children: El... Remove this comment to see the full error message
    <Tooltip {...rest} show={show}>
      <TooltipInner onMouseEnter={open} onMouseLeave={close}>
        {children}
      </TooltipInner>
    </Tooltip>
  );
}

export default MouseoverTooltip;
