import React from "react";
import OutlinedInput from "src/ui/input/outlinedInput";
function Outlinedinput({ value, onChange, label = "" }) {
  return (
    <div>
      <p className="text-lg text-[#6B6B6B] mb-3.5 md:text-base md:mb-2">
        {label}
      </p>
      <OutlinedInput
        className={
          "rounded-xl py-4 px-6 !border-grey border max-w-[700px] text-lg md:text-base md:rounded-none md:border-0 md:border-b md:px-0 md:py-2"
        }
        onChange={onChange}
        value={value}
        label={label}
      />
    </div>
  );
}

export default Outlinedinput;
