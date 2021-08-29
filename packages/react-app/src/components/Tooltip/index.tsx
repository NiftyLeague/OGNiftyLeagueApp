import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Placement } from '@popperjs/core';
import Popover from './Popover';

const TooltipContainer = styled.div`
  max-width: 300px;
  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;
  font-size: 16px;
`;

const TooltipInner = styled.div`
  height: 100%;
  display: flex;
`;

interface TooltipProps extends MouseoverTooltipProps {
  show: boolean;
}

function Tooltip({ children, placement, show, text }: TooltipProps): JSX.Element {
  return (
    <Popover content={<TooltipContainer>{text}</TooltipContainer>} placement={placement} show={show}>
      {children}
    </Popover>
  );
}

interface MouseoverTooltipProps {
  children: JSX.Element;
  // eslint-disable-next-line react/require-default-props
  placement?: Placement;
  text: string | JSX.Element;
}

function MouseoverTooltip({ children, placement, text }: MouseoverTooltipProps): JSX.Element {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return (
    <Tooltip placement={placement} text={text} show={show}>
      <TooltipInner onMouseEnter={open} onMouseLeave={close}>
        {children}
      </TooltipInner>
    </Tooltip>
  );
}

export default MouseoverTooltip;
