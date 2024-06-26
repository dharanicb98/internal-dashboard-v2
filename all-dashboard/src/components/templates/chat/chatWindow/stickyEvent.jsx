import Image from "next/image";
import moment from "moment";
import React from "react";
import CloseRounded from "assets/icons/close-rounded.svg";
import AvatarIcon from "assets/images/avatar.svg";
import Link from "next/link";

export default function StickyEvent(props) {
  const { data, closeEventBar } = props;

  const getPrimaryGuest = data?.guests.find((item) => !!item.isPrimary);

  const startDate = moment(data?.startDate);
  const endDate = moment(data?.endDate);
  const isSameMonth = startDate.format("M") === endDate.format("M");

  const getDatesRange = (start, end) => {
    const isSameMonth = start.format("M") === end.format("M");
    const noOfDates = Math.abs(start.diff(end, "days"));

    return `${start.format("MMM D")}-${end.format( isSameMonth ? "D" : "MMM D")} (${noOfDates} Days)`;
  };

  return (
    !data?.bookedOn ? 
    <div className="flex divide-x divide-grey rounded-2xl p-4 bg-[#FFF8F3] border-orange border-2 last:divide-0 w-full overflow-hidden">
        Property: {data?.propertyName}
        <div className="pl-8 border-none ml-auto">
          <Image src={CloseRounded} alt="close" width={17} height={17} className="cursor-pointer" onClick={closeEventBar}/>
        </div>
    </div>
     :
    <>
    {/* desktop sticky */}

      <div className="flex divide-x divide-grey rounded-2xl p-4 bg-[#FFF8F3] border-orange border-2 last:divide-0 w-full overflow-hidden md:hidden">
        <div className="pr-8 text-center">
          <p className="font-normal text-sm leading-4 text-[#6B6B6B] mb-1">Check in </p>
          <p className="font-normal text-base leading-5 text-[#000000]">{moment(data?.startDate).format("MMM")}</p>
          <p className="font-medium text-xl leading-6 text-[#000000] mb-1">{moment(data?.startDate).format("D")}</p>
          <p className="font-normal text-sm leading-4">Ongoing</p>
        </div>
        <div className="px-8 shrink-0 xl:shrink">
          <div className="flex">
            <Image height={64} width={64} src={AvatarIcon} className="bg-green-50 rounded-full h-[64px] w-[64px]  mr-4 object-cover" alt=""/>
            <div>
              <p className="font-medium text-xl leading-8 text-[#000000] mb-2"> {getPrimaryGuest?.name}</p>
              <p className="font-normal text-base leading-5 text-[#000000]">{getDatesRange(startDate, endDate)}</p>
              <div className="flex items-center  overflow-hidden mt-3.5 ">
                {data?.guests?.map((item, idx) => (
                  <Image height={24} width={24}  alt="avatar"
                    src={AvatarIcon} className="bg-grey-100 inline-block rounded-full h-6 w-6 object-cover" key={idx}/>
                ))}
                <p className="font-normal text-sm leading-4 ml-2">{data?.guests?.length} Guests</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-8 gap-[17px] overflow-hidden">
          <p className="truncate font-normal text-base leading-5">{data?.propertyName}</p>
          <p className="mt-[17px] font-normal text-base leading-5 text-[#000000]">Reservation Code - <span className="font-medium text-base leading-5">{data?.ReservationCode}</span></p>
          <p className="mt-[17px] font-normal leading-[16.94px] text-[#000000]"> Booking Date - {moment(data?.bookedOn).format("DD/MM/YYYY")}</p>
        </div>

        <div className="pl-8 border-none ml-auto">
          <Image src={CloseRounded} alt="close" width={17} height={17} className="cursor-pointer" onClick={closeEventBar}/>
        </div>
      </div>

      {/* mobile sticky */}
      <div className="hidden py-[16px] px-[24px] bg-[#FFF8F3] w-full md:block">
        <div className="flex justify-between">
          <p className="font-medium text-[#000000] text-[18px] leading-[21.78px]">{data?.propertyName}</p>
          <p className="font-medium text-[#6B6B6B] leading-[16.94px] text-sm">Ongoing</p>
        </div>

        <div className="flex items-center mt-[15px]">
          <p className="text-[#000000] leading-[19.36px] text-base font-normal">{`$ ${7800}`}</p>
          <div className="colored-circle h-1 w-1 bg-black my-auto mx-2.5 shrink-0" />
          <p className="text-[#000000] font-normal text-base leading-[19.36px]">{`${startDate.format("MMM D")}-${endDate.format(isSameMonth ? "D" : "MMM D")}`}</p>
          <div className="colored-circle h-1 w-1 bg-black my-auto mx-2.5 shrink-0" />
          <p className="text-[#000000] leading-[19.36px] text-base font-normal">{`${data?.guests.length} Guests`}</p>
        </div>

        <div className="flex justify-between mt-5">
          <p className="text-[#000000] leading-[19.36px] text-base font-normal"> Reservation Code - <b>{data?.ReservationCode}</b></p>
          <Link href="#" className="text-[#000000] leading-[16.94px] text-sm underline font-medium">Details</Link>
        </div>

      </div>
    </>
  );
}
