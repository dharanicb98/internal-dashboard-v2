import React, { useState } from "react";
import CloseIcon from "assets/icons/close.svg";
import Image from "next/image";

export default function SortDialogWeb(props: SortDialogProps) {
  const { open, SelectAction, containerClass } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
    console.log("Selected Option:", newSelectedOption);
  };

  const sortOptions = [
    "newest",
    "price(high to low)",
    "price(low to High)",
    "Beds (Least)",
    "Beds (Most)",
  ];

  return (
    <div className={containerClass}>
      <div className="bg-white rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Sort by</div>
          <div>
            <button onClick={SelectAction}>
              <Image src={CloseIcon} alt="close icon" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start">
          {sortOptions.map((option, index) => (
            <div key={index} className="mb-4">
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleRadioChange}
                />
                {getOptionLabel(option)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getOptionLabel(option: string) {
  switch (option) {
    case "newest":
      return "Newest";
    case "price(high to low)":
      return "Price (High to Low)";
    case "price(low to High)":
      return "Price (Low to High)";
    case "Beds (Least)":
      return "Beds (Least)";
    case "Beds (Most)":
      return "Beds (Most)";
    default:
      return "";
  }
}

interface SortDialogProps {
  open: boolean;
  SelectAction: VoidFunction;
  containerClass: string;
}
