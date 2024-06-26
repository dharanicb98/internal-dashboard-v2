import React, { useEffect, useState, useRef } from "react";
import { formatDate } from "../../utils/common";

function TableFilter(props) {
  let columns = props.columns;
  // console.log("columns from the table filter", columns);
  const [filterCol, setFilterCol] = useState();
  const [defaultFilterCol, setDefaultFilterCol] = useState("");
  const [filterType, setFilterType] = useState("text");
  const [options, setOptions] = useState();
  const [filterVal, setFilterVal] = useState("");
  const [filterDateVal, setFilterDateVal] = useState("");
  const [defaultFilterSelectVal, setDefaultFilterSelectVal] = useState("");
  const [filterSelectVal, setFilterSelectVal] = useState("");
  const textInputRef = useRef("");

  useEffect(() => {
    setDefaultFilterCol(
      columns.filter((column) => column.filterable)[0]?.field
    );
    setFilterCol(columns.filter((column) => column.filterable)[0]?.field);
    setFilterType(columns.filter((column) => column.filterable)[0]?.type);
    if (textInputRef) {
      // textInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (filterType === "select") {
      let selectOptions = columns?.filter(
        (column) =>
          column.field ===
          (filterCol === undefined ? defaultFilterCol : filterCol)
      )[0]?.options;
      // console.log("select options: ", selectOptions);
      setDefaultFilterSelectVal(Object.keys(selectOptions[0]));
      setOptions(selectOptions);
    }
  }, [filterType]);

  const handleFilterVal = (e) => {
    // console.log("The Filter Val : ", e.target.value, e)
    if (e.key === "Enter") {
      // console.log("Enter Clicked! please filter");
      filterInTable("filter");
    } else {
      if (e.target.value === "") {
        props.onFilter();
      } else {
        // console.log("The filter value:- ", e.target.value);
        setFilterVal(e.target.value);
      }
    }
  };
  function handleOptionChange(e) {
    let filterCol = e.target.value;
    setFilterCol(e.target.value);
    let filterType = columns.filter(
      (column) => column.field === e.target.value
    )[0].type;
    // console.log("filterType", filterType);
    setFilterType(filterType);
    if (filterType === "select") {
      let selectOptions = columns.filter(
        (column) => column.field === filterCol
      )[0].options;
      // console.log("select options: ", selectOptions);
      setDefaultFilterSelectVal(selectOptions[0]);
      setOptions(selectOptions);
    }
  }
  function handleFilterDateInput(e) {
    setFilterDateVal(e.target.value);
  }
  function handleSelectTypeOptionChange(e) {
    // console.log("select filter option value: ", e.target.value);
    let encodedURI = encodeURI(e.target.value);
    setFilterSelectVal(encodedURI);
  }
  // calling the main filter function in the parent component
  const filterInTable = (type) => {
    if (type) {
      if (!filterCol) {
        props.onFilter(defaultFilterCol, filterVal);
      } else {
        if (filterType === "text") {
          props.onFilter(filterCol, filterVal.trim());
        } else if (filterType === "date") {
          props.onFilter(filterCol, filterDateVal);
        } else if (filterType === "select") {
          if (filterSelectVal) {
            props.onFilter(filterCol, filterSelectVal);
          } else {
            props.onFilter(filterCol, defaultFilterSelectVal);
          }
        }
      }
    } else {
      setFilterVal("");
      props.onFilter();
      textInputRef.current.value = "";
    }
  };
  return (
    <>
      {defaultFilterCol && (
        <div className="bg-slate-300 text-black  py-2">
          <div className="text-black w-1/2 flex justify-start items-center pl-3">
            <div className=" ">
              <select
                onChange={(e) => handleOptionChange(e)}
                defaultValue={defaultFilterCol}
                className="flex justify-center mx-auto placeholder:italic placeholder:text-slate-500  bg-white border border-slate-300 rounded-md py-2  px-3 shadow-sm focus:outline-none focus:border-red-300 focus:ring-red-300 focus:ring-1 sm:text-sm"
              >
                {columns.map((column, index) =>
                  column.filterable ? (
                    <option
                      key={column.field}
                      value={column.field}
                      className="text-center"
                    >
                      {column.headerName}
                    </option>
                  ) : null
                )}
              </select>
            </div>
            <div className="pl-4 w-full">
              {filterType === "text" && (
                <input
                  placeholder="Search Anythig in this table ... "
                  className="w-full min-w-[240px] placeholder:italic placeholder:text-slate-500 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-red-300 focus:ring-red-300 focus:ring-1 sm:text-sm"
                  onKeyUp={(e) => handleFilterVal(e)}
                  ref={textInputRef}
                />
              )}
              {filterType === "date" && (
                <div className="flex">
                  <input
                    type="date"
                    className="w-auto max-w-fit placeholder:italic placeholder:text-slate-500 block bg-white  border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-red-300 focus:ring-red-300 focus:ring-1 sm:text-sm"
                    onChange={(e) => handleFilterDateInput(e)}
                    w-auto="true"
                    max-w-fit="true"
                  />
                  <input
                    // placeholder="Search Anythig in this table ... "
                    className=" w-auto mx-auto ml-1 max-w-fit placeholder:italic placeholder:text-slate-500 block bg-white  border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-red-300 focus:ring-red-300 focus:ring-1 sm:text-sm"
                    onChange={(e) => handleFilterVal(e)}
                    value={
                      filterDateVal
                        ? formatDate(filterDateVal)
                        : "select any date"
                    }
                  />
                </div>
              )}
              {filterType === "select" && (
                <select
                  onChange={handleSelectTypeOptionChange}
                  className="w-full min-w-[240px] mx-auto ml-1 placeholder:italic placeholder:text-slate-500 block bg-white  border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-red-300 focus:ring-red-300 focus:ring-1 sm:text-sm"
                >
                  {options?.map((option) => (
                    <>
                      {typeof option === "string" && (
                        <option className="text-center" key={option}>
                          {option}
                        </option>
                      )}
                      {typeof option === "object" && (
                        <option
                          className="text-center flex justify-center"
                          key={option}
                          value={Object.keys(option)[0]}
                        >
                          {Object.values(option)[0]}
                        </option>
                      )}
                    </>
                  ))}
                </select>
              )}
            </div>
            <button
              className="border  py-2 px-6 ml-4 text-slate-600 rounded-lg  hover:border-white hover:shadow-m"
              onClick={() => filterInTable("filter")}
            >
              Filter
            </button>
            <button
              className="border  min-w-fit py-2 px-6 ml-4 text-slate-600 rounded-lg  hover:border-white hover:shadow-m"
              onClick={() => filterInTable()}
            >
              Remove Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default TableFilter;
