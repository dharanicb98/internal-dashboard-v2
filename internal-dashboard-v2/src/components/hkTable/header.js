import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "../../icons";
import { useDispatch } from "react-redux";
import { applySort } from "../../store/reducers/queryBodySlice";

function Header({ columns }) {
  // console.log("table header.js");

  const dispatch = useDispatch();

  const handleSort = (type, columnName) => {
    dispatch(applySort({ col: columnName, orderby: type }));
  };

  return (
    <div className="flex items-center  px-4 bg-[#F2F2F2] p-[16px] h-[54px]">
      {columns?.map(
        (column, index) =>
          !column?.hideColumn && (
            <div
              key={index}
              className={`flex items-center mr-4 ${column?.className}`}
            >
              <p className="font-[500] text-[18px] leading-[21.78px]">
                {column?.headName}
              </p>
              {column?.sort && (
                <div className="flex flex-col  ml-3">
                  <ChevronUpIcon
                    className="w-[15px] h-[15px] cursor-pointer hover:scale-150"
                    onClick={() => handleSort("desc", column?.fieldName)}
                  />
                  <ChevronDownIcon
                    className="w-[15px] h-[15px] cursor-pointer  hover:scale-150"
                    onClick={() => handleSort("asc", column?.fieldName)}
                  />
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
}

export default Header;
