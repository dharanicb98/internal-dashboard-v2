import React, { useState } from "react";
import TableComponentG from "ui/table";

const headerData = ["Name", "Amount", "Date"];
const data = [
 
];

const handler = (item, idx) => {
  console.log(item, "itemdetails");
  console.log(idx, "rowIndex");
};

const CompletedPayments = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerPage = 5;
  // const firstIndex = (currentPage - 1) * recordsPerPage;
  // const lastIndex = currentPage * recordsPerPage;
  // const records = rowData.slice(firstIndex, lastIndex);
  // const totalPageCount = Math.ceil(rowData.length / recordsPerPage);
  // const pageNumbers = [...Array(totalPageCount).keys()].map((pageNumber) => pageNumber + 1);

  // const changePage = (page) => {
  //   setCurrentPage(page);
  // };

  const rowData = data.map((item, idx) => [
    ...item,
    <button
      className="bg-black text-white px-6 py-2.5 rounded-[24px] float-right"
      onClick={() => handler(item, idx)}
    >
      View
    </button>,
  ]);

  return (
    <div>
      <TableComponentG headerData={headerData} rowData={rowData} />
    </div>
  );
};

export default CompletedPayments;
