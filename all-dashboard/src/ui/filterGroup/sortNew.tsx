import SortIcon from "assets/icons/sort.svg";
import Image from "next/image";
import { useState } from "react";
import SortDialog from "ui/dialog/sortDialog";

export default function SortNew() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    console.log("clicked");
    setIsOpen((prev) => !prev);
  };

  const closeDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={openDialog}>
        <Image className="w-[24px] h-[24px]" src={SortIcon} alt="filter" />
      </button>
      {isOpen && (
        <SortDialog
          open={isOpen}
          SelectAction={closeDialog}
          containerClass="fixed bottom-0 left-0 w-full z-50"
        />
      )}
    </div>
  );
}
