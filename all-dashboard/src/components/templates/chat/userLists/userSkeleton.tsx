import React from "react";

export default function UserSkeleton() {
  return (
    <div className="border-b on border-grey py-4 last:pb-0 last:border-none cursor-pointer ">
      <div role="status" className="animate-pulse dark:border-gray-700">
        <div className="flex items-center mt-4 space-x-3">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-grey rounded-full dark:bg-grey-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-grey rounded-full dark:bg-grey-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
