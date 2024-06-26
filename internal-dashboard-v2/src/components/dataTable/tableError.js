import React from "react";

function TableError({ errorInApi, handleErrorInApi }) {
  // console.log("In Table-Error Component", errorInApi, handleErrorInApi);
  return (
    <div className="h-full w-full bg-slate-100">
      <div className=" h-[496px] mx-auto flex flex-col justify-center items-center border mr-40">
        <div className="mb-4 text-purple-900 flex flex-col items-center">
          <div className="text-2xl">No Relevent Data Found!</div>
          <div className="text-sm"> Try Searching with other values.</div>
        </div>
        <button
          onClick={() => handleErrorInApi()}
          className="bg-main text-white py-2 px-8 rounded-sm"
        >
          Ok!
        </button>
      </div>
    </div>
  );
}

export default TableError;
