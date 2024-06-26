import React from "react";
import TableComponentG from "ui/table";

const headerData = ["Name", "Guests", "Amount", "Property", "Date"];
const data = [
  
];

const handler = (item, idx) => {
  console.log(item, "itemdetails");
  console.log(idx, "rowIndex");
};

const CompletedDisputes = () => {
  const rowData = data.map((item, idx) => [
    ...item,
    <button
      key={idx}
      className="bg-black text-white px-6 py-2.5 rounded-[24px] float-right"
      onClick={() => handler(item, idx)}
    >
      Details
    </button>,
  ]);

  return (
    <div>
      <TableComponentG headerData={headerData} rowData={rowData} />
    </div>
  );
};

export default CompletedDisputes;
