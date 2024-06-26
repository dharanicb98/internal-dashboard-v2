import React from "react";
import Avatar from "ui/avatar";
import AvatarIcon from "assets/images/avatar.svg";
import Image from "next/image";

const BookingCardMobile = () => {
  return (
    <div
      className="min-w-[380px] min-h-[270px] px-6 py-5 rounded-2xl"
      style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}
    >
      <div className="flex flex-col">
        <div className="mb-4">
          <div className="text-sm font-normal">Ongoing</div>
        </div>
        <div className="mb-[18px]">
          {" "}
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="mr-[10px]">
                <Avatar />
              </div>
              <div className="flex flex-col gap-[6px] mr-1">
                <div className="font-medium text-lg">Ash Gardener</div>
                <div className="font-normal text-xs">28Apr-30 (3 days)</div>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-2">
                <div className="flex -space-x-1 overflow-hidden shrink-0">
                  {[1, 2, 3].map((item, idx) => (
                    <Image
                      height={20}
                      width={20}
                      alt="avatar"
                      src={AvatarIcon}
                      className="inline-block rounded-full object-cover"
                      key={idx}
                    />
                  ))}
                </div>
                <div className="font-normal text-xs">6 guests</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-col gap-2">
            <div className="font-normal text-sm">
              5BR Lake Cabin with Awesome (197)
            </div>
            <div className="font-normal text-sm">
              Reservation Code- <b>HNCW123</b>
            </div>
          </div>
        </div>
        <div className="mb-[14px]">
          <div className="font-normal text-sm">Booking Date:- 5/21/2023 </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-normal">
                Message
              </button>
              <button className="text-sm font-normal border border-solid border-black px-[18px] py-[10px] rounded-full">
                Call
              </button>
            </div>
            <div>
              <div className="text-sm font-normal">Payouts</div>
              <div className="font-semibold text-lg">$7800</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCardMobile;
