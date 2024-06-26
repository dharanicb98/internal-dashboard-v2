import React from "react";

const Toggle = (props: ToggleProps) => {
  const { checked, onChange } = props;
  return (
    <label className="relative inline-flex items-center cursor-pointer h-fit">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <div className="w-11 h-6 bg-[#AFAFAF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
    </label>
  );
};

export default Toggle;

interface ToggleProps {
  checked: boolean;
  onChange: (state: boolean) => void;
}
