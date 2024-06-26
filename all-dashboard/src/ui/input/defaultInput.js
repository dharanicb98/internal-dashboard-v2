import React, { useRef } from "react";

export default function Input({
  lable,
  onChange,
  placeholder,
  value,
  autoComplete,
  type,
  required = false,
}) {
  return (
    <>
      {/* {lable && (
        <label className="mr-2" htmlFor={`${lable}`}>
          {lable}
          {required ? <span className="text-red-600">*</span> : ""}
        </label>
      )} */}
      <input
        className="pl-4 py-4  border rounded-lg md:rounded-xl w-full"
        type={type}
        name={`${lable}`}
        id=""
        onChange={onChange}
        placeholder={`${placeholder}`}
        value={value}
        autoComplete={autoComplete ? "on" : "off"}
        required={required}
      />
    </>
  );
}
