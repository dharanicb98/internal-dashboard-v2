import React from "react";
import Avatar from "ui/avatar";
import Divider from "ui/divider";
import PropertyImageDefault from "assets/images/MessageCardImage.png";
import Image from "next/image";
import RedArrow from "assets/images/rightarrowred.png";
import { formatCurrency } from "../../../../utils/common";
import AvatarIcon from "assets/images/avatar.svg";
import { getRangeBetweenDates2 } from "../../../../utils/common";
import { formatRecentMessageLatestMessage } from "../../../../utils/date";

const MessageCard = ({ onDetailsClick, message}) => {
const {user,lastMessage, latestOpenOrder, host} = message

console.log('message', message)

  return (
    <div className="min-h-[181px] border border-solid border-grey-dark rounded-2xl">
      <div className="px-6 py-4">
        <div className="flex justify-between">
          {/* left side */}
          <div className="flex flex-col w-1/2">
            <div className="flex items-center gap-4">
            <div className={`relative h-10 w-10`}>
                <Image
                  className="rounded-full h-10 w-10"
                  src={ user?.image || AvatarIcon }
                  alt="Rounded avatar"
                  fill
                />
                </div>
              <div className="flex flex-col">
                <div className="text-[20px] font-medium">
                  {user?.name || "Unknown"}
                </div>
                <div className="text-[#5c5c5c]">
                  {" "}
                  {formatRecentMessageLatestMessage(lastMessage?.timestamp) || ""}
                </div>
              </div>
            </div>
            <div className="pt-4">
              { lastMessage?.contentType ==='text' ? `${lastMessage?.content}` : ''}
            </div>
          </div>
          <Divider orientation="vertical" />
          {/* property image and other details */}
          <div>
            <div className="flex">
              <div className="mr-4">
                <Image
                  src={latestOpenOrder?.propertyImage || PropertyImageDefault}
                  alt="PropertyImage"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="text-[20px] font-medium">
                  {latestOpenOrder?.propertyName || "Unknown listing name"}
                </div>
                <div className="flex text-[14px] font-normal">
                  <div className="mr-2.5">{formatCurrency(latestOpenOrder?.currency, latestOpenOrder?.totalAmount) || "0"}</div>
                  <div className="mr-2.5">
                    <b>&#9679;</b> {getRangeBetweenDates2(latestOpenOrder?.startDate, latestOpenOrder?.endDate) || "2-7 may-2023"}
                  </div>
                  <div>
                    <b>&#9679;</b> {latestOpenOrder?.totalGuests || "0"} guests
                  </div>
                </div>
                <div className="text-[16px] font-normal">
                  Reservation Code: {latestOpenOrder?.ReservationCode || "0"}
                </div>
                <div>
                  <button onClick={onDetailsClick}>
                    <div className="flex items-center gap-1">
                      <div className="text-[#CD264F]">Details</div>
                      <Image
                        src={RedArrow}
                        alt="rightarrowicon"
                        className="w-[21px] h-[10px]"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-[16px]">
            {latestOpenOrder?.bookingStatus || "Unknown"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
