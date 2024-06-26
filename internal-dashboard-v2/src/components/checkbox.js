import React, { useEffect, useState } from "react";

const Checkbox = ({
  id,
  name,
  icon_path = "",
  checkboxSelect,
  setCheckboxSelect,
}) => {
  // console.log("=============", name);
  const addItem = () => {
    // console.log(checked,id);
    const existingId = checkboxSelect.includes(id);
    if (existingId) {
      //if id is present then remove it
      let newList = checkboxSelect.filter((el) => {
        return el !== id;
      });
      setCheckboxSelect(newList);
    } else {
      //if id not present - add it
      setCheckboxSelect((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1 flex-wrap  p-4">
        <input
          type="checkbox"
          className=" accent-black relative shrink-0 border-[#6B6B6B] border w-6 h-6 rounded bg-white focus:outline-none focus:ring-offset-0 "
          onChange={addItem}
        />
        <img className="w-[40px]" src={icon_path} alt=".." />
        <label className="text-lg text-slate-800">{name}</label>
      </div>
    </>
  );
};

export default Checkbox;
