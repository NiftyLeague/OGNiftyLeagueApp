import { darken } from "polished";
import React, { HTMLProps, useCallback } from "react";
import ReactGA from "react-ga";
import styled from "styled-components";

export const Button = styled.button.attrs<{ warning: boolean }, { backgroundColor: string }>(({ warning, theme }) => ({
  backgroundColor: warning ? theme.red1 : theme.primary1,
}))`
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.white};
  width: 100%;

  :hover,
  :focus {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => darken(0.1, backgroundColor)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text4};
    cursor: auto;
  }
`;

// for wrapper react feather icons
export const IconWrapper = styled.div<{ stroke?: string; size?: string; marginRight?: string; marginLeft?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? "20px"};
  height: ${({ size }) => size ?? "20px"};
  margin-right: ${({ marginRight }) => marginRight ?? 0};
  margin-left: ${({ marginLeft }) => marginLeft ?? 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke ?? theme.blue1};
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #0094ec;
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = "_blank",
  href,
  rel = "noopener noreferrer",
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, "as" | "ref" | "onClick"> & { href: string }) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === "_blank" || event.ctrlKey || event.metaKey) {
        ReactGA.outboundLink({ label: href }, () => {
          console.debug("Fired outbound link event", href);
        });
      } else {
        event.preventDefault();
        // send a ReactGA event and then trigger a location change
        ReactGA.outboundLink({ label: href }, () => {
          window.location.href = href;
        });
      }
    },
    [href, target],
  );
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClick} {...rest} />;
}
