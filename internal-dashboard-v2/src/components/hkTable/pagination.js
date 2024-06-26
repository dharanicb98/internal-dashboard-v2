import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyPage, applyLimit } from "../../store/reducers/queryBodySlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CorrectTickIcon,
  EditPencilIcon,
} from "../../icons";

function Pagination() {
  // console.log("pagination.js");
  const queryBody = useSelector((state) => state.queryBody);
  const [showInputField, setShowInputField] = useState(false);
  const [noOfEntries, setNoOfEntries] = useState(queryBody?.pagination?.limit);

  const dispatch = useDispatch();

  const handlePagination = (type) => {
    switch (type) {
      case "prev":
        if (queryBody?.pagination?.page > 1) {
          dispatch(applyPage({ page: queryBody?.pagination?.page - 1 }));
        }
        break;
      case "next":
        dispatch(applyPage({ page: queryBody?.pagination?.page + 1 }));
        break;

      default:
        break;
    }
  };
  const handleShowInputField = () => {
    setShowInputField((prev) => !prev);
  };
  const handleUpdateNoOfEntries = () => {
    dispatch(applyLimit({ limit: parseInt(noOfEntries) }));
    setShowInputField((prev) => !prev);
  };
  const handleOnChangeNoOfEntries = (e) => {
    let value = e.target.value;
    setNoOfEntries(value);
  };

  return (
    <div className="  flex items-center justify-between">
      <div className="flex items-center group">
        {!showInputField && (
          <p className="text-[#5C5C5C]">
            No. of Entries per page:{" "}
            <span className="text-black font-bold">
              {queryBody?.pagination?.limit}
            </span>
          </p>
        )}
        {showInputField && (
          <div className="flex items-center">
            <input
              onChange={(e) => handleOnChangeNoOfEntries(e)}
              value={noOfEntries}
              type="number"
              className="border-2"
              placeholder="Enter No of Entries per page"
            />
            <CorrectTickIcon
              onClick={handleUpdateNoOfEntries}
              className="text-[#5C5C5C] ml-2"
            />
          </div>
        )}
        {!showInputField && (
          <EditPencilIcon
            onClick={handleShowInputField}
            className="invisible group-hover:visible ml-2 text-[#5C5C5C]"
          />
        )}
      </div>
      <div className="flex items-center gap-x-8">
        <div>
          <ChevronLeftIcon onClick={() => handlePagination("prev")} />
        </div>
        <p className={`font-[400] text-[18px] leading-[21.78px]`}>
          {queryBody?.pagination?.page}
        </p>
        <div>
          {" "}
          <ChevronRightIcon onClick={() => handlePagination("next")} />
        </div>
      </div>
    </div>
  );
}

export default Pagination;
