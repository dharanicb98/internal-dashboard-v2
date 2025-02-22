import React from "react";

export default function LeftArrow({ width, height, className }) {
  return (
    <svg
      className={`${className} `}
      width={width || "15"}
      height={height || "9"}
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 9L0 1.7027L1.75 0L7.5 5.59459L13.25 0L15 1.7027L7.5 9Z"
        fill="#1C1B1F"
      />
    </svg>
  );
}
