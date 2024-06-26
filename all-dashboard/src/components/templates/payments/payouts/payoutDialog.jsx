import React, { useState } from "react";
import Dialog from "ui/dialog";
import Image from "next/image";
import CloseRoundedIcon from "assets/icons/close-rounded.svg";
import Divider from "ui/divider";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";

const PayoutDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open}>
      <div className="w-[480px] rounded-2xl bg-white dark-scrollbar">
        <div className="flex flex-row justify-between pt-[40px] px-4 mb-4">
          <div className="flex items-center gap-2">
            <button onClick={onClose}>
              <Image src={ChevronLeftIcon} alt="chevron-left" />
            </button>
            <div className="text-[32px] font-medium">Payout Details</div>
          </div>
          <button onClick={() => onClose(null)}>
            <Image src={CloseRoundedIcon} alt="close" />
          </button>
        </div>
        <Divider />
        {/* h-[150px] overflow-auto dark-scrollbar */}
        <div className="p-4">
          <div className="p-4 mt-4 h-[400px] overflow-auto dark-scrollbar">
            <div className="flex flex-col gap-2 mb-[25px]">
              <div className="text-lg font-medium">5BR DUBAI LAKE</div>
              <div className="text-base font-normal">
                <div className="flex items-center gap-2">
                  <div>$7800</div>
                  <div>
                    <b>&#9679;</b> 2 -7 May 2023
                  </div>
                  <div>
                    <b>&#9679;</b> 2 Guests
                  </div>
                </div>
              </div>
              <div className="text-lg font-normal">Deshmith Rose</div>
            </div>
            <Divider className="mb-[25px]" />
            <div className="flex items-center justify-between">
              <div className="text-lg font-normal">Reservation Code</div>
              <div className="text-lg font-normal">DE239N MM</div>
            </div>
            <Divider className="mb-[25px]" />
            <div className="flex items-center justify-between">
              <div className="text-lg font-normal">$1700</div>
              <div className="text-lg font-normal">Credited on 17-Aug</div>
            </div>
            <Divider className="mb-[25px]" />
            <div>
              <div className="font-medium text-xl">Host Payout Details</div>
              <div className="flex items-center justify-between">
                <div>2-night fee</div>
                <div className="text-[#6b6b6b]">$1900</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Cleaning fee</div>
                <div className="text-[#6b6b6b]">$50</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Host service fee</div>
                <div className="text-[#6b6b6b]">$150</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-normal">Total fee</div>
              <div className="text-lg font-normal">$1700</div>
            </div>
          </div>
          <div className="flex justify-end mt-[40px]">
            <button className=" bg-black text-white rounded-full px-2 py-1">
              Print
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PayoutDialog;
