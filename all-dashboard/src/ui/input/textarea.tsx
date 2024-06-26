import React from "react";

const Textarea = (props: TextareaProps) => {
  const { labelName, row, value, onChange, className = "", ...restProps } = props;

  return (
    <>
      {!!labelName && (
        <label
          className="block mb-2 font-light text-grey-dark"
        >
          {labelName}
        </label>
      )}

      <textarea
        rows={row}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`resize-none rounded-2xl w-full ${className}`}
        {...(restProps || {})}
      />
    </>
  );
};

export default Textarea;

interface TextareaProps {
  row: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  labelName?: string;
  placeholder?: string;
  required?: boolean;
}
