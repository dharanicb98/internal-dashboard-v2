import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "../../icons";

const HKDataTableHeader = (props) => {
  let columns = props.columns;

  const [open, setOpen] = useState(false);

  const sortColumn = (column, orderBy) => {
    props.onSort(column.field, orderBy);
  };

  return (
    <div className="flex bg-slate-500">
      {columns
        ? columns.map((column) => (
            <div
              key={column.id}
              className=" flex justify-start items-center text-white py-2 col-title "
              style={{
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
            >
              <div className="column-title  pl-4">{column.headerName}</div>
              {column.sortable && (
                <div className="sort-icons flex flex-col ml-1">
                  <div
                    onClick={(e) => sortColumn(column, "asc")}
                    className="cursor-pointer"
                  >
                    <ChevronUpIcon />
                  </div>
                  <div
                    onClick={(e) => sortColumn(column, "desc")}
                    className="cursor-pointer"
                  >
                    <ChevronDownIcon />
                  </div>
                </div>
              )}
            </div>
          ))
        : "no values"}
    </div>
  );
};

export default HKDataTableHeader;
