import React from "react";
import { classNames } from "helpers";

const VARIANTS = {
  hero: "text-hero",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  h5: "text-h5",
  body: "text-body",
  caption: "text-caption",
  caption2: "text-caption-2",
};

function Typography({ variant = "body", weight = 400, component = "div", className = "text-primary", children = [] }) {
  return React.createElement(component, { className: classNames(VARIANTS[variant], className) }, children);
}

export default Typography;
