import React from "react";
import { FilledButton } from "ui/buttons";

const MobileAppbarBottomListing = (props: MobileAppbarBottomListingProps) => {
  const { title, buttonclick } = props;
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white  dialog__index">
      <div className="flex items-center justify-between">
        <p>{title}</p>
        <FilledButton
          text="Update"
          onClick={buttonclick}
          buttonClass="px-4 py-2 rounded-xl"
        />
      </div>
    </div>
  );
};

export default MobileAppbarBottomListing;

interface MobileAppbarBottomListingProps {
  title: string;
  buttonclick: () => void;
}
