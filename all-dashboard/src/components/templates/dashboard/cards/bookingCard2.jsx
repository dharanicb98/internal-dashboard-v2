import React from "react";
import Divider from "ui/divider";
import Avatar from "ui/avatar";
import { FilledButton } from "ui/buttons";

const BookingCard = () => {
  return (
    <div className="border border-solid border-black rounded-2xl">
      <div className="px-6 py-4 flex justify-between">
        {/* checkin side */}
        <div className="flex-col justify-center items-center">
          <div className="text-grey-dark text-sm font-normal text-center">
            Check-in
          </div>
          <div className="flex-col justify-center items-center gap-2.5 text-center">
            <div className="flex-col justify-center items-center gap-1">
              <div className=" text-base font-normal">Jan</div>
              <div className="text-2xl font-normal">5</div>
            </div>
          </div>
          <div className="text-sm font-medium">Requested</div>
        </div>
        <Divider orientation="vertical" />
        {/* name and guests */}
        <div className="flex flex-col w-[235px] h-[115px]">
          <div className="flex justify-between items-center">
            <div>
              <Avatar />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-xl">Rosalie Jazz</div>
              <div className="font-normal text-base">28Apr-30 (3 days)</div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <Avatar />
            </div>
            <div className="font-normal text-sm">6 guests</div>
          </div>
        </div>
        {/* <div className="flex gap-3">
          <div>
            <Avatar/>
          </div>
          <div className="flex flex-col gap-8">
          <div className="font-medium text-xl">Rosalie Jazz</div>
              <div className="font-normal text-base">28Apr-30 (3 days)</div>
            </div>
            <div className="flex justify-center items-center">
            <div>
              <Avatar />
            </div>
            <div className="font-normal text-sm">6 guests</div>
          </div>
          </div> */}
        {/* </div> */}
        {/* villa name, reservation code and booking date */}
        <div className="flex flex-col justify-between">
          <div className="font-normal text-base">
            Mesmerising Villa for Rent...
          </div>
          <div className="font-normal text-base">
            Reservation Code- <b>HNCW123</b>
          </div>
          <div className="font-normal text-sm">Booking Date:- 5/21/2023 </div>
        </div>
        {/* payouts and buttons */}
        <div className="flex flex-col justify-between">
          <div className="flex">
            <div className="font-normal text-sm">
              Payouts <b>$17500</b>
            </div>
            <button>!!</button>
          </div>
          <div>Booking Request</div>
          <div className="flex">
            <FilledButton text="Accept" />
            <button className="border rounded-full p-2">Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
