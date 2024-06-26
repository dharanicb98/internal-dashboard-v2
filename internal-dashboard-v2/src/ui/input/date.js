import React, { useState } from "react";

const CustomDate = () => {
  return (
    <div className="flex text-lg border-2  rounded mt-2 border-gray-300">
      <div className="relative w-[250px]">
        <input
          type="date"
          id="floating_outlined"
          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900
          bg-transparent rounded-lg border-1 border-gray-300 appearance-none  
          focus:outline-none focus:ring-0  peer"
          placeholder=""
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-md text-dark duration-300 transform -translate-y-4
           scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 
           peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75
             peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4
              rtl:peer-focus:left-auto start-1"
        >
          Date
        </label>
      </div>
    </div>
  );
};

export default CustomDate;
