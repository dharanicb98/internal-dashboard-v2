import React from "react";

function TableNavigation({ handlePageNavigation, pageConfiguration }) {
  function handleNavigation(navDirection) {
    
    handlePageNavigation(navDirection);
  }
  return (
    <>
      <div
        className={`  w-3/4 ml-16 py-2 flex  justify-center items-center text-white `}
      >
        <div className="w-3/4 flex justify-center items-center relative">
          <button
            className={`bg-slate-500 border mr-4 py-2 px-4 ${
              !pageConfiguration.hasPrev ? "bg-black" : ""
            }`}
            onClick={() => handleNavigation("prev")}
          >
            Previous
          </button>

          <div className="rounded-sm bg-slate-400 text-white p-2">
            {pageConfiguration.page}
          </div>
          <button
            className={`bg-slate-500 border ml-4 py-2 px-4 ${
              !pageConfiguration.hasNext ? "bg-black" : ""
            }`}
            onClick={() => handleNavigation("next")}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default TableNavigation;
