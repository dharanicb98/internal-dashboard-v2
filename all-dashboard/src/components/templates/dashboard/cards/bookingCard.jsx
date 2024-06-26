import React, { useState } from "react";
import Divider from "ui/divider";
import moment from "moment";
import Avatar from "ui/avatar";
import MoreVertIcon from "assets/icons/kebab-menu.svg";
import Image from "next/image";
import Select from "ui/input/select";
import AvatarIcon from "assets/images/avatar.svg";

const BookingCard = ({ reservation }) => {
  const {
    listing,
    code,
    createdAt,
    grand_total,
    checkIn,
    checkOut,
    checkout_status,
    user,
    no_of_guests,
  } = reservation;

  const startDate = moment(checkIn);
  const endDate = moment(checkOut);
  const isSameMonth = startDate.format("M") === endDate.format("M");
  const noOfDates = Math.abs(startDate.diff(endDate, "days"));

  const [bookingStatus, setBookingStatus] = useState("Pending");
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [isBookingRequest, setIsBookingRequest] = useState(true);

  const detailsHandler = (type) => {
    switch (type) {
      case "call":
        console.log("call");
        break;
      case "message":
        console.log("message");
        break;
      default:
        console.log("details");
        setShowDetailsDialog(true);
        break;
    }
  };

  // const options = [
  //   { label: "Call" },
  //   { label: "Message" },
  //   { label: "Details" },
  // ];

  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  //   setIsOpen(false);
  // };

  const handleAcceptBooking = () => {
    setBookingStatus("Accepted");
  };

  const handleDeclineBooking = () => {
    setBookingStatus("Declined");
  };

  return (
    <div className="min-w-[925px] border border-solid border-black rounded-2xl mb-4 last:mb-0">
      <div className="px-6 py-4 flex justify-between">
        {/* checkin side */}
        <div className="flex flex-col justify-center items-center gap-y-3">
          <div className="text-grey-dark text-sm font-normal text-center">
            Check-in
          </div>
          <div className="flex flex-col justify-center items-center gap-2.5 text-center">
            <div className="flex flex-col justify-center items-center gap-1">
              <div className=" text-base font-normal">
                {moment(checkIn).format("MMM")}
              </div>
              <div className="text-2xl font-normal">
                {moment(checkIn).format("D")}
              </div>
            </div>
          </div>
          <div className="text-sm font-medium">{checkout_status}</div>
        </div>
        <Divider orientation="vertical" />
        {/* name and guests */}
        <div className="flex gap-3">
          <div>
            <Avatar url={user.user_picture} />
          </div>
          <div>
            <div className="flex flex-col justify-between items-start">
              <div className="font-medium text-xl">{user.user_name}</div>
              <div className="font-normal text-base">{`${startDate.format(
                "MMM D"
              )}-${endDate.format(
                isSameMonth ? "D" : "MMM D"
              )} (${noOfDates} Days)`}</div>
            </div>
            <div className="flex justify-center items-center gap-2">
              {/* <div>
                <Avatar />
              </div> */}
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
              <div className="font-normal text-sm">{no_of_guests} guests</div>
            </div>
          </div>
        </div>
        {/* villa name, reservation code and booking date */}
        <div className="flex flex-col justify-between">
          <div className="font-normal text-base">
            {/* Mesmerising Villa for Rent... */}
            {listing.title}
          </div>
          <div className="font-normal text-base">
            Reservation Code- <b>{code}</b>
          </div>
          <div className="font-normal text-sm">
            Booking Date:- {moment(createdAt).format("DD/MM/YYYY")}{" "}
          </div>
        </div>
        {/* payouts and buttons */}
        {isBookingRequest && (
          <div className="flex flex-col justify-between gap-4">
            <div className="flex justify-end items-center gap-2">
              <div className="font-normal text-sm">Payouts</div>
              <div className="font-normal text-sm">
                <b>${grand_total}</b>
              </div>
              <Select
                buttonContent={
                  <Image
                    src={MoreVertIcon}
                    alt="menu"
                    className="invert ml-auto"
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
                ]}
                onChange={detailsHandler}
                listPaperClass="overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
                containerClass="static"
              />
              {/* <button onClick={() => setIsOpen(!isOpen)}>
              <Image
                src={MoreVertIcon}
                alt="more-vert-icon"
                className="invert"
              />
            </button>
            {isOpen && (
              <ul className="dropdown-options" style={{backgroundColor: 'white',}}>
                {options.map((option,index) => (
                  <li key={index} onClick={() => handleOptionSelect(option.label)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )} */}
            </div>
            <div className="text-right">Booking Request</div>
            {bookingStatus === "Pending" && (
              <div className="flex gap-2">
                <button
                  onClick={handleAcceptBooking}
                  className="px-[30px] py-2.5 rounded-full bg-black text-white"
                >
                  Accept
                </button>
                <button
                  onClick={handleDeclineBooking}
                  className="border rounded-full px-[30px] py-2.5"
                >
                  Decline
                </button>
              </div>
            )}
            {bookingStatus === "Accepted" && (
              <div className="px-5 py-2.5 bg-black text-white rounded-full flex items-center justify-between">
                <div>Accepted</div> <div>&#x2713;</div>
              </div>
            )}
            {bookingStatus === "Declined" && (
              <div className="px-5 py-2.5 bg-black text-white rounded-full flex items-center justify-between">
                <div>Declined</div> <div>&#10006;</div>
              </div>
            )}
          </div>
        )}
        {!isBookingRequest && (
          <div className="flex flex-col justify-between">
            <Select
              buttonContent={
                <Image
                  src={MoreVertIcon}
                  alt="menu"
                  className="invert ml-auto"
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
              ]}
              onChange={detailsHandler}
              listPaperClass="overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
              containerClass="static"
            />
            <div className="flex flex-col">
              <div className="font-normal text-base text-right">Payouts</div>
              <div className="text-[28px] font-semibold">
                <b>${grand_total}</b>
              </div>
              {/* <button onClick={() => setIsOpen(!isOpen)}>
              <Image
                src={MoreVertIcon}
                alt="more-vert-icon"
                className="invert"
              />
            </button>
            {isOpen && (
              <ul className="dropdown-options" style={{backgroundColor: 'white',}}>
                {options.map((option,index) => (
                  <li key={index} onClick={() => handleOptionSelect(option.label)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
