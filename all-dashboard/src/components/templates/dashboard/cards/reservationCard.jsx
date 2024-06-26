import Image from "next/image";
import moment from "moment";
import React from "react";
import MoreVertIcon from "assets/icons/kebab-menu.svg";
import Select from "ui/input/select";
import DetailsDialog from "./detailsDialog";
import { FilledButton, OutlinedButton } from "ui/buttons";

export default function ReservationCard(props) {
  const { data } = props;
  const [showDetailsDialog, setShowDetailsDialog] = React.useState(false);

  const getPrimaryGuest = data?.guests.find((item) => !!item.isPrimary);

  const startDate = moment(data?.startDate);
  const endDate = moment(data?.endDate);
  const isSameMonth = startDate.format("M") === endDate.format("M");
  const noOfDates = Math.abs(startDate.diff(endDate, "days"));
  const isRequested = false;

  const detailsHandler = (type) => {
    switch (type) {
      case "call":
        console.log("call");
        break;
      case "message":
        console.log("message");
        break;
      case "cancel":
        console.log("cancel");
        break;
      default:
        console.log("details");
        setShowDetailsDialog(true);
        break;
    }
  };

  return (
    <div className="md:hidden">
      <DetailsDialog
        open={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
      />
      <div
        className="flex rounded-lg p-[16px] border-2 w-full relative cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          detailsHandler("details");
        }}
      >
        <div className="pr-8 border-r text-center shrink-0">
          <p className="text-grey-light">Check-In </p>
          <p className="mt-auto">{moment(data?.startDate).format("MMM")}</p>
          <p>{moment(data?.startDate).format("D")}</p>
          <p>Ongoing</p>
        </div>
        <div className="flex justify-between w-full">
          <div className="px-8 shrink-0 flex flex-col gap-8">
            <div className="flex">
              <Image
                height={60}
                width={60}
                src={getPrimaryGuest?.image}
                className="rounded-full h-[60px] w-[60px] m-auto mr-[16px] object-cover"
                alt="avatar"
              />
              <div>
                <p className="md:text-xl font-[400]">{getPrimaryGuest?.name}</p>
                <p className="md:text-[16px] mt-[8px]">{`${startDate.format(
                  "MMM D"
                )}-${endDate.format(
                  isSameMonth ? "D" : "MMM D"
                )} (${noOfDates} Days)`}</p>
              </div>
            </div>
            <div className="flex -space-x-1 overflow-hidden ml-[60px]">
              {data?.guests?.map((item, idx) => (
                <Image
                  height={24}
                  width={24}
                  alt="avatar"
                  src={item.image}
                  className="inline-block rounded-full h-6 w-6 object-cover"
                  key={idx}
                />
              ))}
            </div>
          </div>
          <div className="px-8 overflow-hidden flex flex-col justify-between gap-[17px]">
            <p className="truncate"> {data?.propertyName}</p>
            <p className="">
              Reservation Code - <b>{data?.ReservationCode}</b>
            </p>
            <p className="">
              Booking Date - {moment(data?.bookedOn).format("DD/MM/YYYY")}
            </p>
          </div>
          <div
            className={`pl-8 flex ${
              isRequested
                ? "flex-row-reverse h-fit flex-wrap gap-y-5"
                : "flex-col"
            }`}
          >
            <div className={`${isRequested ? "flex flex-row-reverse" : ""}`}>
              <Select
                buttonContent={
                  <Image
                    src={MoreVertIcon}
                    alt="menu"
                    className="invert ml-auto shrink-0"
                  />
                }
                options={[
                  {
                    key: "Call",
                    value: "call",
                  },
                  {
                    key: "Message",
                    value: "message",
                  },
                  {
                    key: "More details",
                    value: "details",
                  },
                  {
                    key: "Cancel Booking",
                    value: "cancel",
                  },
                ]}
                onChange={detailsHandler}
                listPaperClass="overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
                containerClass="shrink-0"
              />

              <div
                className={`${
                  isRequested ? "flex gap-2 mr-2 items-center" : "mt-auto"
                } `}
              >
                <p className="text-right">Payouts</p>
                <p
                  className={`${isRequested ? "" : "text-[28px] font-medium"}`}
                >
                  $&nbsp;17,500
                </p>
              </div>
            </div>
            {isRequested && (
              <div>
                <p className="text-right mb-3">Booking Request</p>
                <div className="flex gap-2 ">
                  <FilledButton text="Accept" buttonClass="px-[30px] py-2.5" />
                  <OutlinedButton
                    text="Decline"
                    primary={false}
                    buttonClass="px-[30px] py-2.5"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
