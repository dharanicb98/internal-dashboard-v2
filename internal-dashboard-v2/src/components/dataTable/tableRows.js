import React, { useEffect } from "react";

const TableRow = ({ rowData, tableColumn, getAffiliatePage, link }) => {
  useEffect(() => {}, [rowData, tableColumn]);

  return (
    <div className="">
      {rowData.map((row, index) => {
        return (
          <div
            key={row.id}
            className="flex odd:bg-slate-100  hover:bg-slate-300 py-4"
          >
            {tableColumn.map((column) => (
              <div
                key={column.id}
                className="flex justify-start items-center  max-w-fit pl-4"
                style={{
                  width: column.width,
                  maxWidth: column.maxWidth,
                  minWidth: column.minWidth,
                }}
              >
                {row[column.field]}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
