import React, { useEffect, useMemo, useState } from "react";
import { FilledButton } from "ui/buttons";
import Image from "next/image";
import Avatar from "ui/avatar";
import AvatarIcon from "assets/images/avatar.svg";
import ReservationsMapIcon from "assets/icons/reservationsMapIcon.png";
import BookingDetailsDialog from "./bookingDetailsDialog";
import ThreeDotsIcon from "assets/icons/three-dots-vertical.svg";
import NoReservationIcon from "assets/icons/no-reservations.svg";
import { getRangeBetweenDates2 } from "utils/common";
import { useRouter } from "next/router";
import {
  PAYMENT_PENDING,
  PAYMENT_COMPLETED,
  PAYMENT_FAILED,
  PAYMENT_PROCESSING,
  BOOKING_STATUS_COMPLETED,
} from "src/constants/payment";
import Popover from "ui/popover";
import {
  getHostDetails,
  getReviewChecking,
} from "../../../services/customerReservations/apis";
import { formatCurrency } from "../../../utils/common/";
import createConversation from "../../../services/chat/createConversation";
import ReviewDialog from "./reviewDialog";
import Dialog from "ui/dialog";
import CloseIcon from "assets/icons/close-rounded.svg";

const ReservationCardMobile = ({
  key,
  data,
  handlePopOver,
  listingHashMap,
}) => {
  return (
    <div
      className="w-full min-h-[270px] px-6 py-5 rounded-2xl"
      style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}
      key={key}
      onClick={() => handlePopOver(data?.host_id, data)}
    >
      <div className="flex flex-col">
        <div className="mb-4">
          <div className="text-sm font-normal leading-8">
            {data?.payment_status == PAYMENT_COMPLETED
              ? "Paid"
              : // : data?.payment_status == PAYMENT_PROCESSING
              // ? "Requested"
              data?.payment_status == PAYMENT_PENDING
              ? "Pending"
              : // : data?.payment_status == PAYMENT_FAILED
                // ? "Failed"
                "Unknown"}
          </div>
          {/* <div className="text-sm font-normal">{checkout_status}</div> */}
        </div>
        <div className="mb-[18px]">
          {" "}
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="mr-[10px]">
                <Avatar url={AvatarIcon} />
              </div>
              <div className="flex flex-col gap-[6px] mr-1">
                {/* <div className="font-medium text-lg">{data?.user_name}</div> */}
                <div className="font-normal text-xs leading-3">
                  {" "}
                  {/* {getRangeBetweenDates2(data?.checkin, data?.checkout)} */}
                </div>
              </div>
            </div>
            <div>
              <div className="font-normal text-xs leading-3">
                {data?.total_guests} Guests
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-col gap-2">
            <div className="font-normal text-sm">
              {listingHashMap?.[data?.listing_id]?.title ||
                "listing id not found"}
            </div>
            <div className="font-normal text-sm">
              Reservation Code - <b>{data?.id}</b>
            </div>
          </div>
        </div>
        <div className="mb-[14px]">
          <div className="font-normal text-sm">
            Booking Date -{" "}
            {getRangeBetweenDates2(data?.checkin, data?.checkout)}
          </div>
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
              <div className="text-sm font-normal text-right">Paid</div>
              <div className="font-semibold text-lg">
                {formatCurrency(data?.user_currency, data?.total_amount)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ReservationList({
  reservations,
  isDefault,
  listingHashMap,
  regionHashmap,
}) {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState(false);
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const [openBookingDialog, setBookingDialog] = useState(false);
  const [hostId, setHostId] = useState(null);
  const [bookingDetailsData, setBookingDetailsData] = useState({});
  const [reviewDialog, setReviewDialog] = useState(false);
  const [addReviewDialog, setAddReviewDialog] = useState({
    bookingStatus: "",
    isReviewed: false,
    reviewDialogData: {},
  });

  const handlePopOver = async (hostId, data) => {
    let obj = {
      reservation_code: data?.id,
      checkin: data?.checkin,
      checkout: data?.checkout,
      listing_name:
        (listingHashMap && listingHashMap[data?.listing_id]?.title) ||
        "Listing id not found",
      wifi_network_name:
        (listingHashMap &&
          listingHashMap[data?.listing_id]?.wifi_network_name) ||
        undefined,
      wifi_network_password:
        (listingHashMap &&
          listingHashMap[data?.listing_id]?.wifi_network_password) ||
        undefined,
      custom_rule:
        (listingHashMap && listingHashMap[data?.listing_id]?.custom_rule) ||
        undefined,
      check_in_time:
        (listingHashMap && listingHashMap[data?.listing_id]?.check_in_time) ||
        undefined,
      check_out_time:
        (listingHashMap && listingHashMap[data?.listing_id]?.check_out_time) ||
        undefined,
      booking_date: getRangeBetweenDates2(data?.checkin, data?.checkout),
      pricing_data: JSON.parse(data?.pricing_data),
      user_currency: data?.user_currency,
      payment_status: data?.payment_status,
      total_guests: data?.total_guests,
      total_amount: data?.total_amount,
      amount_paid: data?.amount_paid,
      balance_amount: data?.balance_amount,
      listing_id: data?.listing_id,
      user_fname: data?.user_fname,
      user_lname: data?.user_lname,
      customer_id: data?.customer_id,
      booking_date_created_at: data?.created_at,
      booking_status: data?.booking_status,
    };
    let hostData;
    let hostRegion;

    if (hostId) {
      const response = await getHostDetails(hostId);
      const [data] = response?.data;
      hostRegion = regionHashmap[data?.state_id]?.name || "";
      hostData = {
        host_fname: data?.fname,
        host_lname: data?.lname,
        host_joined: data?.created_at,
        host_known_languages: data?.languages,
        host_profile: data?.user_avatar,
        host_mobile: data?.mobile,
        host_mobile_ext: data?.mobile_ext,
        hostId: hostId,
      };
    }

    setBookingDetailsData((prev) => {
      return { ...obj, hostRegion, ...hostData };
    });
    setOpenPopover(false);
    setOpenPopoverIndex(-1);
    setBookingDialog(true);
  };

  const handleSendMessageToHost = async (hostId, userData) => {
    //create conversation list here
    const response = await getHostDetails(hostId);
    const [data] = response?.data;

    let host = {
      id: hostId,
      name: `${data?.fname} ${data?.lname}`,
      image:
        "https://exchange.blockchainappdevs.com/holiday-chat-api/image_4.jpg",
      isOnline: 0,
    };

    let user = {
      id: userData?.customer_id,
      name: `${userData?.user_fname} ${userData?.user_lname}`,
      image:
        "https://exchange.blockchainappdevs.com/holiday-chat-api/image_4.jpg",
      isOnline: 0,
    };

    let latestOpenOrderData = {
      ReservationCode: userData?.reservation_code,
      bookedOn: userData?.booking_date_created_at,
      startDate: userData?.checkin,
      endDate: userData?.checkout,
      propertyId: userData?.listing_id,
      totalAmount: userData?.total_amount,
      totalGuests: userData?.total_guests,
      bookingStatus: userData?.booking_status,
      currency: userData?.user_currency,
      propertyName: userData?.listing_name,
      //conversationId:
    };

    let createChatPayload = {
      user: user,
      host: host,
      requestType: "chat",
      latestOpenOrder: latestOpenOrderData,
    };

    const chatCreation = await createConversation(createChatPayload);

    if (chatCreation?.status === 200) {
      router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/chat`);
    }
  };

  const handleAddReview = async (data) => {
    // console.log("----------------data", data);
    const response = await getReviewChecking({
      booking_id: data.reservation_code,
      user_id: data.customer_id,
    });
    // console.log("response------------", response);
    setAddReviewDialog((prev) => ({
      ...prev,
      bookingStatus: data?.booking_status,
      reviewDialogData: data,
      isReviewed: response?.status,
    }));
    setOpenPopover(false);
    setReviewDialog((prev) => !prev);
  };

  const failedReviewDialogBox = (displayText) => (
    <Dialog
      onClose={() => setReviewDialog(false)}
      open={reviewDialog}
      contentClass={
        "relative md-m:h-[200px] md-m:px-8 md:h-[300px] !w-[500px] md-m:w-auto bg-[#fff] p-4 rounded-xl m-4"
      }
    >
      <div className="flex justify-center items-center h-full">
        <h1>{displayText}</h1>
      </div>

      <Image
        src={CloseIcon}
        alt="close"
        width={26}
        height={26}
        className="absolute top-2 right-3 md:top-4 md:right-6 cursor-pointer md:!w-6 md:!h-6"
        onClick={() => setReviewDialog(false)}
      />
    </Dialog>
  );

  const tableHeaders = [
    "Destination",
    "Guests",
    "Booking Id",
    "Booking Date",
    "Amount",
    "Status",
  ];
  // console.log("addReviewDialog-------", addReviewDialog, reservations);
  return (
    <div>
      <BookingDetailsDialog
        open={openBookingDialog}
        setOpen={setBookingDialog}
        bookingDetailsData={bookingDetailsData}
        setHostId={setHostId}
        setBookingDetailsData={setBookingDetailsData}
        handleSendMessageToHost={handleSendMessageToHost}
      />

      {addReviewDialog.bookingStatus === BOOKING_STATUS_COMPLETED ? (
        addReviewDialog.isReviewed ? (
          failedReviewDialogBox("Allready Reviewed")
        ) : (
          <ReviewDialog
            open={reviewDialog}
            setOpen={setReviewDialog}
            data={addReviewDialog.reviewDialogData}
          />
        )
      ) : (
        failedReviewDialogBox("Give Review After Completed the payment")
      )}

      {/*List for desktop*/}
      <div className="hidden md-m:block">
        <table className=" table-auto w-full">
          <thead className="bg-[#F9FBFC] border-b border-b-[#DECCCC]">
            <tr>
              {tableHeaders.map((header, index) => (
                <th className="text-lg font-medium text-left p-4" key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations?.map((data, index) => (
              <tr key={index}>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  <div className="flex gap-2">
                    <Image
                      className="rounded-full"
                      src={data.listing_image ? data.listing_image : AvatarIcon}
                      alt="Rounded avatar"
                      width={60}
                      height={60}
                      // fill
                    />

                    <div className="flex flex-col justify-center">
                      <p className="text-sm font-medium">
                        {(listingHashMap &&
                          listingHashMap[data?.listing_id]?.title) ||
                          "Listing id not found"}
                      </p>
                      <div className="text-sm text-[#5C5C5C] flex items-center gap-x-[2px]">
                        <span>
                          <Image
                            src={ReservationsMapIcon}
                            width="12"
                            height="12"
                            alt="map"
                          />
                        </span>
                        <span>
                          {(regionHashmap &&
                            regionHashmap[
                              listingHashMap[data?.listing_id]?.address?.region
                            ]?.name) ||
                            "Region not found"}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  <span className="text-sm text-[#5C5C5C]">
                    {data?.total_guests}
                  </span>
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  <span className="text-sm text-[#5C5C5C]">{data?.id}</span>
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  <span className="text-sm text-[#5C5C5C]">
                    {getRangeBetweenDates2(data?.checkin, data?.checkout)}
                  </span>
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  <span className="text-sm text-[#5C5C5C]">
                    {formatCurrency(data?.user_currency, data?.total_amount)}
                  </span>
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  <div className="flex gap-5 relative">
                    <FilledButton
                      text={
                        data?.payment_status == PAYMENT_COMPLETED
                          ? "Paid"
                          : // : data?.payment_status == PAYMENT_PROCESSING
                          // ? "Requested"
                          data?.payment_status == PAYMENT_PENDING
                          ? "Pending"
                          : // : data?.payment_status == PAYMENT_FAILED
                            // ? "Failed"
                            "Unknown"
                      }
                      onClick={() => {}}
                      buttonClass="px-6 px-2.5 text-sm font-normal w-[125px]"
                    />
                    <Image
                      src={ThreeDotsIcon}
                      alt="three dots"
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenPopover(true);
                        setOpenPopoverIndex(index);
                      }}
                    />
                    {/*More Popover for desktop*/}
                    <Popover
                      openDialog={openPopover && openPopoverIndex == index}
                      setOpenDialog={setOpenPopover}
                      key={index}
                      containerClass={
                        "bg-white px-6 py-2.5 rounded-xl w-[150px] -left-[5px] top-[50px] border border-[#D9D9D9] shadow-base"
                      }
                    >
                      <div className="flex flex-col gap-5">
                        <span
                          className="text-base cursor-pointer"
                          onClick={() => {
                            handlePopOver(data?.host_id, data);
                          }}
                        >
                          View More
                        </span>
                        <span
                          onClick={() =>
                            handleSendMessageToHost(data?.host_id, {
                              reservation_code: data?.id,
                              checkin: data?.checkin,
                              checkout: data?.checkout,
                              booking_status: data?.booking_status,
                              total_guests: data?.total_guests,
                              total_amount: data?.total_amount,
                              user_currency: data?.user_currency,
                              booking_date_created_at: data?.created_at,
                              listing_name:
                                (listingHashMap &&
                                  listingHashMap[data?.listing_id]?.title) ||
                                "Listing id not found",
                              listing_id: data?.listing_id,
                              user_fname: data?.user_fname,
                              user_lname: data?.user_lname,
                              customer_id: data?.customer_id,
                            })
                          }
                          className="text-base cursor-pointer"
                        >
                          Message
                        </span>
                        <span
                          onClick={() =>
                            handleAddReview({
                              reservation_code: data?.id,
                              checkin: data?.checkin,
                              checkout: data?.checkout,
                              booking_status: data?.booking_status,
                              total_guests: data?.total_guests,
                              listing_name:
                                (listingHashMap &&
                                  listingHashMap[data?.listing_id]?.title) ||
                                "Listing id not found",
                              listing_id: data?.listing_id,
                              customer_id: data?.customer_id,
                            })
                          }
                          className="text-base cursor-pointer"
                        >
                          Add Review
                        </span>
                        <span className="text-base cursor-pointer">Report</span>
                      </div>
                    </Popover>
                  </div>
                </td>
              </tr>
            ))}

            {reservations && reservations.length == 0 && (
              <tr>
                <td
                  className="border-b-[1px] border-grey text-base font-normal p-4"
                  colspan={tableHeaders.length}
                >
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <Image src={NoReservationIcon} alt="no-reservations" />
                    <p className="text-[#5C5C5C] text-xl">
                      You have no Reservations yet!
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* mobile  */}
      <div className="flex flex-col gap-y-3.5 md-m:hidden">
        {!isDefault &&
          reservations
            ?.slice(0, 4)
            .map((data, index) => (
              <ReservationCardMobile
                key={index}
                data={data}
                listingHashMap={listingHashMap}
                handlePopOver={handlePopOver}
              />
            ))}
        {isDefault &&
          reservations?.map((data, index) => (
            <ReservationCardMobile
              key={index}
              data={data}
              listingHashMap={listingHashMap}
              handlePopOver={handlePopOver}
            />
          ))}
        {reservations && reservations.length == 0 && (
          <div className="border-b-[1px] border-grey text-base font-normal p-4">
            <div className="flex flex-col gap-4 justify-center items-center">
              <Image src={NoReservationIcon} alt="no-reservations" />
              <p className="text-[#5C5C5C] text-xl">
                You have no Reservations yet!
              </p>
            </div>
          </div>
        )}
        {!isDefault && reservations && reservations.length > 0 && (
          <div className="flex md-m:hidden flex-col gap-4 justify-center items-center border border-[#D9D9D9] rounded-2xl p-6 text-center mt-3.5">
            <div>
              <p className="text-lg font-medium">Show All</p>
              <p className="text-lg font-medium">Reservations</p>
            </div>
            <button
              className="bg-black px-9 py-5 rounded-2 rounded-full cursor-pointer"
              onClick={() =>
                router.push(
                  `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation`
                )
              }
            >
              <svg
                width="20"
                height="8"
                viewBox="0 0 20 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.07812L19 4.07812"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 7.07812L19 4.07812L16 1.07812"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationList;
