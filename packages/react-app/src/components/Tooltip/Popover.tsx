/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useCallback, useState } from 'react';
import Portal from '@reach/portal';
import { transparentize } from 'polished';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import styled from 'styled-components';
import useInterval from 'hooks/useInterval';
import ThemeProvider from 'theme';

const PopoverContainer = styled.div`
  z-index: 9999;

  visibility: ${props => ((props as any).show ? 'visible' : 'hidden')};
  opacity: ${props => ((props as any).show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;

  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.shadow1)};
  color: ${({ theme }) => theme.text2};
  border-radius: 8px;
`;

const ReferenceElement = styled.div`
  display: inline-block;
`;

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme.bg3};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.bg2};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`;

interface PopoverProps {
  content: JSX.Element;
  show?: boolean;
  children?: JSX.Element;
  placement?: Placement;
}

const Popover = ({ content, show, children, placement }: PopoverProps): JSX.Element => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });
  const updateCallback = useCallback(() => {
    if (update) void update();
  }, [update]);
  useInterval(updateCallback, show ? 100 : null);

  return (
    <ThemeProvider>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <ReferenceElement ref={setReferenceElement}>{children}</ReferenceElement>
      <Portal>
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <PopoverContainer show={show} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {content}
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            ref={setArrowElement}
            style={styles.arrow}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </Portal>
    </ThemeProvider>
  );
};

Popover.defaultProps = {
  show: false,
  children: undefined,
  placement: 'auto',
};

export default Popover;
