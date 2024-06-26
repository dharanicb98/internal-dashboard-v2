import React from "react";
const InputField = ({ className, onChange, label = "Input" }) => {
  return (
    <div className=" mt-5 mb-3 flex justify-center items-center bg-white">
      <label className="relative cursor-pointer">
        <input
          onChange={onChange}
          type="text"
          placeholder="Input"
          className={`${className} h-[60px] w-[400px] px-6 text-2xl
           text-gray-500 bg-white border-[#D9D9D9] border-[1px] 
           rounded-[8px] border-opacity-50 outline-none focus:border-[#D9D9D9] 
            placeholder-gray-300 placeholder-opacity-0 transition duration-200`}
        />
        <span
          className="text-2xl px-2 text-gray-500 text-opacity-80 bg-white
         absolute left-4 top-3  transition duration-200 input-text"
        >
          {label}
        </span>
      </label>
    </div>
  );
};
export default InputField;
