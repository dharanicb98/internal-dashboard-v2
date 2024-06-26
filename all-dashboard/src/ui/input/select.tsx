import React from "react";
import useDropdownMenu from "./useDropdown";
import Image from "next/image";

export default function Select(props: SelectProps) {
  const {buttonContent, options, onChange, listPaperClass = "", containerClass = "", optionsClass} = props;

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu<HTMLDivElement,HTMLLIElement>(options.length);
  const handleSelect = (option: string | number | HTMLDivElement) => { onChange(option); setIsOpen(false);};

  return (
    <>
      <div className={`relative ${containerClass}`}>
        <div className="cursor-pointer" {...buttonProps}>
          {buttonContent}
        </div>
        <ul id="options" className={`bg-white options absolute select__index mt-2 top-full ${isOpen ? "block" : "hidden"}  rounded ${listPaperClass}`}>
          {options?.map((option, index) => (
            <li key={index}
              className={`py-2 px-4 cursor-pointer hover:bg-gray-100 text-center ${optionsClass}`}
              onClick={(e) => {e.stopPropagation(); handleSelect(option.value);}}
              {...itemProps[index]}>
              {option.key}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

interface SelectProps {
  buttonContent?: React.ReactNode;
  options: KeyValue<string | number | HTMLDivElement>[];
  onChange: (value: string | number | HTMLDivElement) => void;
  listPaperClass?: string;
  containerClass?: string;
  optionsClass?: string;
}
