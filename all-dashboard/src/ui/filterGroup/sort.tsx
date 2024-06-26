import SortIcon from "assets/icons/sort.svg";
import Image from "next/image";
import { useState } from "react";
import SortDialogWeb from "ui/dialog/sortDialogWeb";

export default function Sort() {
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
        <Image src={SortIcon} alt="filter" />
      </button>
      {/* {isOpen && <SortDialogWeb open={isOpen} SelectAction={closeDialog} containerClass="" />} */}
    </div>
  );
}
