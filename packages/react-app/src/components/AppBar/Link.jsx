import React, { useCallback } from "react";
import { Link as ReactRouterLink, NavLink as ReactRouterNavLink } from "react-router-dom";
import ReactGA from "react-ga";

function Link({
  href = "#",
  children,
  className = "text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis p-1 md:p-2",
  ...rest
}) {
  return (
    <ReactRouterLink href={href} className={className} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

export default Link;

export function NavLink({
  href = "#",
  children,
  className = "text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis p-2 md:p-3 whitespace-nowrap",
  ...rest
}) {
  return (
    <ReactRouterNavLink href={href} className={className} activeClassName="text-high-emphesis" {...rest}>
      {children}
    </ReactRouterNavLink>
  );
}

export function ExternalLink({
  target = "_blank",
  href,
  children,
  rel = "noopener noreferrer",
  className = "",
  ...rest
}) {
  const handleClick = useCallback(
    event => {
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

  return (
    <a
      target={target}
      rel={rel}
      href={href}
      onClick={handleClick}
      className={`text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis p-2 md:p-3 ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
