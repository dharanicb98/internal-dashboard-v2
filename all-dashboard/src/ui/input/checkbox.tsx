import React from "react";

export default function Checkbox(props: CheckboxProps) {
  const { isChecked, handleChange, className = "" } = props;

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      className={`w-4 h-4 text-black  rounded-full focus:ring-0 p-1 ${className}`}
    />
  );
}

interface CheckboxProps {
  isChecked: boolean;
  handleChange: () => void;
  className?: string;
}
