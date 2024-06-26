import React from "react";
import OutlinedInput from "src/ui/input/outlinedInput";
function Outlinedinput({ value, onChange, label = "" }) {
  return (
    <div>
      <p className="text-lg text-[#6B6B6B] mb-3.5 ">{label}</p>
      <OutlinedInput
        className={
          "rounded-xl py-4 px-6 !border-grey border max-w-[700px] text-lg"
        }
        onChange={onChange}
        value={value}
        label={label}
      />
    </div>
  );
}

export default Outlinedinput;
