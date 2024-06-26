import React from "react";
import Header from "./header";
import Body from "./body";
import Pagination from "./pagination";
import Filter from "./filter";

function Table({ rows, columns, filter, pagiNationFilter }) {
  // console.log("table index.js");
  return (
    <div className="ml-3 h-screen">
      <div className="">
        {filter && <Filter columns={columns} />}{" "}
        <div className="overflow-x-auto  scrollbar-hide ">
          <div className="min-w-fit">
            <Header columns={columns} />
            <div className="overflow-auto dark-scrollbar  w-[100%]  h-[430px] max-h-[500px]">
              <Body rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
      {pagiNationFilter && (
        <div className="mt-5 mb-5">
          <Pagination />
        </div>
      )}
    </div>
  );
}

export default Table;
