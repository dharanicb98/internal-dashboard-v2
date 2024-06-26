import React from "react";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import Divider from "ui/divider";
import Image from "next/image";

const MobileappbarPayments = () => {
  return (
    <>
      <div className="flex items-center justify-start  gap-4 mb-8 ml-5">
        <button>
          <Image
            // className="w-[10px] h-[16px]"
            src={ChevronLeftIcon}
            alt="chevron-left"
          />
        </button>

        <div className="text-[20px] font-medium">Payment & Payout</div>
      </div>
      <Divider className="my-2" />
    </>
  );
};

export default MobileappbarPayments;
