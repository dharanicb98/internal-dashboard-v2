import React, { useRef } from "react";

export default function Input({
  lable,
  lable2,
  onChange,
  placeholder,
  value,
  autoComplete,
  type,
  required = false,
}) {
  return (
    <div className="">
      {/* {lable && (
        <label className="" htmlFor={`${lable}`}>
          {lable}
          {required ? <span className="text-red-600">*</span> : ""}
        </label>
      )} */}
      <div className=" flex flex-col justify-between ">
        <input
          className="pl-4 py-4  border rounded-lg w-[150px]"
          type={type}
          name={`${lable}`}
          id=""
          onChange={onChange}
          placeholder={`${placeholder}`}
          value={value}
          autoComplete={autoComplete ? "on" : "off"}
          required={required}
        />
        {lable2 && (
          <label className="" htmlFor={`${lable}`}>
            <div className="text-[12px] mx-2 mt-2">
            {lable2}
            </div>
            {required ? <span className="text-red-600">*</span> : ""}
          </label>
        )}
      </div>
    </div>
  );
}
