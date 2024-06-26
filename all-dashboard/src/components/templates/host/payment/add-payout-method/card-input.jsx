import React from "react";
import OutlinedInput from "src/ui/input/outlinedInput";
function Outlinedinput({ value, onChange, label = "" }) {
  return (
    <div>
      <p className="text-base font-normal mb-4 ">{label}</p>
      <OutlinedInput
        className={
          "rounded-[8px] py-4 px-6 bg-[#FAFAFA] border-none max-w-[100%] text-base"
        }
        onChange={onChange}
        value={value}
        label={label}
      />
    </div>
  );
}

export default Outlinedinput;
