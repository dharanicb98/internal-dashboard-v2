import React from "react";

export default function individual({
  width = 14,
  height = 15,
  fill = "none",
  strokeWidth = "0.5",
}) {
  return (
    <svg
      width={width || "14"}
      height={height || "15"}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_698_3197)">
        <path
          d="M6.89 7.63965C10.56 7.63965 13.53 10.6196 13.53 14.2796H0.25C0.25 10.6096 3.23 7.63965 6.89 7.63965Z"
          stroke="black"
          strokeWidth={strokeWidth ? strokeWidth : "0.5"}
          strokeMiterlimit="10"
        />
        <path
          d="M6.88922 7.63C8.92715 7.63 10.5792 5.97793 10.5792 3.94C10.5792 1.90207 8.92715 0.25 6.88922 0.25C4.85129 0.25 3.19922 1.90207 3.19922 3.94C3.19922 5.97793 4.85129 7.63 6.88922 7.63Z"
          stroke="black"
          strokeWidth={strokeWidth ? strokeWidth : "0.5"}
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_698_3197">
          <rect width="13.79" height="14.53" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
