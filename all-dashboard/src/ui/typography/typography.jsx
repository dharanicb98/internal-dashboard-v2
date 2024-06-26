import React from "react";

export const variants = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span:'span'
};

export default function Typography({ children, className, variant, sd }) {

  let style = ""

  for( let key in sd ) {
    style += sd[key] + " "
  }

  const Element = variants[variant];

  return <Element className={` ${style} ${className}`}>{children}</Element>;
}  