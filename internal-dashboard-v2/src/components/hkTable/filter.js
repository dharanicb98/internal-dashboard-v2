import React, { useState } from "react";
import { FilterIcon } from "../../icons";
import { useDispatch } from "react-redux";
import { applyFilter, resetFilter } from "../../store/reducers/queryBodySlice";
import { useSelector } from "react-redux";
import Checkbox from "../input/checkbox";

function Filter({ columns }) {
  // console.log("filter.js");

  const dispatch = useDispatch();
  const queryBody = useSelector((state) => state.queryBody);

  const [showFilterSelect, setShowFilterSelect] = useState(false);
  const [showInputFields, setShowInputFields] = useState([]);
  const [inputFieldValues, setInputValues] = useState();

  const hadleShowInputFields = (id, name, key, format, inputType, data) => {
    let index = showInputFields.findIndex((data) => data.id === id);

    if (index === -1) {
      //it is not present
      setShowInputFields((prev) => [
        ...prev,
        { id, name, key, inputType, format, data },
      ]);
    } else {
      //need to be removed
      const updateInputFields = [...showInputFields];
      updateInputFields.splice(index, 1);
      setShowInputFields(updateInputFields);
    }
    setShowFilterSelect((prev) => !prev);
  };

  const handleFilter = () => {
    setShowFilterSelect((prev) => !prev);
  };

  const handleOnChange = (e, key, format, rangeType) => {
    // console.log(e.target.value, key, format)

    switch (format) {
      case "array":
        setInputValues((prev) => {
          return { ...prev, [key]: { value: e.target.value, type: format } };
        });
        break;

      case "string":
        setInputValues((prev) => {
          return { ...prev, [key]: { value: e.target.value, type: format } };
        });
        break;

      case "range":
        setInputValues((prev) => {
          const updatedPrev = { ...(prev || {}) };
          const updatedObject = {
            ...updatedPrev[key],
            minVal: updatedPrev[key]?.minVal || 0,
            maxVal: updatedPrev[key]?.maxVal || 0,
            type: "range",
          };

          if (rangeType === "min") {
            updatedObject.minVal = Number(e.target.value);
          } else if (rangeType === "max") {
            updatedObject.maxVal = Number(e.target.value);
          }

          return {
            ...updatedPrev,
            [key]: updatedObject,
          };
        });
        break;

      default:
        break;
    }

    // console.log(inputFieldValues);
  };

  const handleApplyFilter = () => {
    if (Object.keys(inputFieldValues).length > 0) {
      Object.keys(inputFieldValues).map((data) => {
        if (inputFieldValues[data].type === "array") {
          let values = inputFieldValues[data].value;
          let splitValues = values.split(",").map(function (item) {
            return item.trim();
          });
          dispatch(
            applyFilter([
              ...queryBody.filters,
              { col: data, val: splitValues, type: "array" },
            ])
          );
        } else if (inputFieldValues[data].type === "string") {
          let value = inputFieldValues[data].value;
          dispatch(
            applyFilter([
              ...queryBody.filters,
              { col: data, val: value.trim(), type: "string" },
            ])
          );
        } else if (inputFieldValues[data].type === "range") {
          let minimumValue = inputFieldValues[data].minVal;
          let maximumValue = inputFieldValues[data].maxVal;
          dispatch(
            applyFilter([
              ...queryBody.filters,
              {
                col: data,
                val: { max: maximumValue, min: minimumValue },
                type: "range",
              },
            ])
          );
        }
      });
    }
  };

  const handleResetFilter = () => {
    dispatch(resetFilter());
    setShowInputFields([]);
  };

  return (
    <div className="my-4">
      <div
        onClick={handleFilter}
        className="flex items-center  gap-x-4  border-[1px] border-[#D9D9D9] w-[105px] h-[44px]  px-4 rounded-[8px] cursor-pointer hover:border-black"
      >
        <p className="text-[#5C5C5C]">Filter</p>
        <FilterIcon className="text-[#5C5C5C]" />
      </div>

      {showFilterSelect && (
        <div className="absolute bg-white shadow py-5 px-3 rounded-md">
          {columns.map((filter, index) => (
            <>
              {filter?.filter && (
                <div key={index} className="flex items-center my-2 gap-x-2">
                  <Checkbox
                    checked={showInputFields.some((data) => data.id === index)}
                    onChange={() =>
                      hadleShowInputFields(
                        index,
                        filter.headName,
                        filter.fieldName,
                        filter.filterFormat,
                        filter.inputType,
                        filter?.selectData
                      )
                    }
                  />
                  <p key={index}>{filter.headName}</p>
                </div>
              )}
            </>
          ))}
        </div>
      )}
      {/* filter input fields */}
      <RenderFilterInputFields
        showInputFields={showInputFields}
        handleOnChange={handleOnChange}
        handleApplyFilter={handleApplyFilter}
        handleResetFilter={handleResetFilter}
      />
    </div>
  );
}

const RenderFilterInputFields = ({
  showInputFields,
  handleOnChange,
  handleApplyFilter,
  handleResetFilter,
}) => {
  return (
    <>
      {showInputFields.length > 0 ? (
        <div className="flex items-center justify-between mt-3">
          {/*  */}
          {showInputFields.map((data, index) => (
            <div key={index}>
              {data.inputType === "text" && (
                <input
                  onChange={(e) => handleOnChange(e, data.key, data.format)}
                  className="border border-black rounded-md"
                  type="text"
                  placeholder={data.name}
                />
              )}
              {data.inputType === "select" && (
                <select
                  onChange={(e) => handleOnChange(e, data.key, data.format)}
                >
                  <option value="">Choose Step</option>
                  {data?.data.map((options, idx) => {
                    let [key, value] = Object.entries(options)[0];
                    return (
                      <option key={idx} value={value}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              )}
              {data.inputType === "range" && (
                <div className="bg-red-100 cursor-pointer">
                  <input
                    className="border"
                    onChange={(e) =>
                      handleOnChange(e, data.key, data.format, "min")
                    }
                  />
                  <input
                    className="border"
                    onChange={(e) =>
                      handleOnChange(e, data.key, data.format, "max")
                    }
                  />
                </div>
              )}

              {/* date */}
              {/* date range */}
            </div>
          ))}

          {/*  */}
          <div className="flex items-center gap-x-3">
            <button
              onClick={handleApplyFilter}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>
            <button
              onClick={handleResetFilter}
              className=" border-[1px] border-[#D9D9D9] text-[#D9D9D9] px-4 py-2 rounded-lg hover:border-black hover:text-black"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Filter;
