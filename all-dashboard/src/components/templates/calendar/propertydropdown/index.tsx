import React, { useEffect, useState } from "react";
import List from "../propertyList/list";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPropertyList } from "store/slices/calendar/propertyList";

function PropertyDropdown() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const propertyList = useSelector(
    (state: any) => state.propertylist.propertyList
  );
  const selectedProperty = useSelector(
    (state: any) => state.propertylist.selectedProperty
  );

  useEffect(() => {
    if(propertyList && propertyList.length){
     dispatch(setSelectedPropertyList(propertyList[0]))
    }
  }, [propertyList]);

  const renderPropertyList = () => {
    return (
      <>
        {propertyList?.map((property: any, index: number) => (
          <div
            onClick={() => dispatch(setSelectedPropertyList(property))}
            key={index}
          >
            <List
              property={property}
              selected={
                Object.keys(selectedProperty).length > 0 &&
                selectedProperty.customId == property.customId
                  ? false
                  : false
              }
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="w-full flex gap-2 w-[100%] min-h-[90px] rounded-2xl border-[1px] border-[#C5C5C5]">
        <div className="flex-1">
          {Object.keys(selectedProperty).length > 0 ? (
            <List property={selectedProperty} selected={false} />
          ) : (
            <div className="flex items-center p-[12px] h-[100%]">
              <p className="text-base font-normal">Select Properties</p>
            </div>
          )}
        </div>
        <div
          className="flex items-center p-[12px] h-auto"
          onClick={() => setOpen(!open)}
        >
          {" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7272 10.364L10.3633 16.7279L3.99932 10.364"
              stroke="black"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {open && (
        <div
          className="mt-3 w-full flex flex-col gap-2 absolute max-h-[60vh] overflow-y-scroll z-10 rounded-2xl border-[1px] border-[#C5C5C5] bg-[#fff]"
          style={{ boxShadow: " 0px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
        >
          {propertyList?.length > 0 ? (
            renderPropertyList()
          ) : (
            <div>No Properties available.</div>
          )}
        </div>
      )}
    </>
  );
}

export default PropertyDropdown;
