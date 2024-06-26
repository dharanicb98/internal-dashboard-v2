import Dialog from ".";
import CloseIcon from "assets/icons/close.svg";
import Image from "next/image";
import { useState } from "react";

export default function SortDialog(props: SortDialogProps) {
  const { open, SelectAction, containerClass } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id);
  };

  return (
    <div className={`${containerClass}`}>
      <div className="bg-white rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">Sort by</div>
          <div>
            <button onClick={() => SelectAction()}>
              <Image src={CloseIcon} alt="close icon" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mb-4">
            <input
              type="radio"
              id="newest"
              checked={selectedOption === "newest"}
              onChange={handleRadioChange}
            />
            <label htmlFor="newest" className="ml-2">
              Newest
            </label>
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="price(high to low)"
              checked={selectedOption === "price(high to low)"}
              onChange={handleRadioChange}
            />
            <label htmlFor="price(high to low)" className="ml-2">
              Price (High to Low)
            </label>
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="price(low to High)"
              checked={selectedOption === "price(low to High)"}
              onChange={handleRadioChange}
            />
            <label htmlFor="price(low to High)" className="ml-2">
              Price (Low to High)
            </label>
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="Beds (Least)"
              checked={selectedOption === "Beds (Least)"}
              onChange={handleRadioChange}
            />
            <label htmlFor="Beds (Least)" className="ml-2">
              Beds (Least)
            </label>
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="Beds (Most)"
              checked={selectedOption === "Beds (Most)"}
              onChange={handleRadioChange}
            />
            <label htmlFor="Beds (Most)" className="ml-2">
              Beds (Most)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SortDialogProps {
  open: boolean;
  SelectAction: VoidFunction;
  containerClass: string;
}
