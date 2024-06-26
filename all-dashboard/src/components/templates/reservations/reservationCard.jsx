import Image from "next/image";
import moment from "moment";
import React from "react";
import MoreVertIcon from "assets/icons/kebab-menu.svg";
import Select from "ui/input/select";
import DetailsDialog from "./detailsDialog";
import AvatarIcon from "assets/images/avatar.svg";
import { formatCurrency } from '../../../utils/common/'
import { PAYMENT_PENDING, PAYMENT_COMPLETED} from "src/constants/payment";
import { getRangeBetweenDates2 } from "utils/common";
import {formatBookingCreatedAt} from "utils/date"
import { getCustomerDetails } from "../../../services/customerReservations/apis";

export default function ReservationCard(props) {
  const { data, listingHashMap={}, regionHashmap={} } = props;
  const [showDetailsDialog, setShowDetailsDialog] = React.useState(false);
  const [bookingDetailsData, setBookingDetailsData] = React.useState({})

  const startDate = moment(data?.checkin);
  const endDate = moment(data?.checkout);
  const isSameMonth = startDate.format("M") === endDate.format("M");
  const noOfDates = Math.abs(startDate.diff(endDate, "days"));
  const isRequested = false;

  const detailsHandler = ( type ) => {
    switch ( type ) {
      case "call":
        break;

      case "message":
        break;

      case "cancel":
        break;

      case 'details':
        handleDetails()
        break;

      default:
        break;
    }
  };

  async function handleDetails(userId, data) {
    let reservationsObj = {
      id : data?.id ,
      user_fname : data?.user_fname, 
      user_lname : data?.user_lname, 
      total_guests: data?.total_guests,
      listing_name: listingHashMap && listingHashMap[data?.listing_id]?.title || 'Listing id not found',
      booking_date: getRangeBetweenDates2(data?.checkin, data?.checkout),
      checkin:data?.checkin, 
      checkout:data?.checkout,
      wifi_network_name: listingHashMap && listingHashMap[data?.listing_id]?.wifi_network_name || undefined,
      wifi_network_password: listingHashMap && listingHashMap[data?.listing_id]?.wifi_network_password || undefined,
      custom_rule: listingHashMap && listingHashMap[data?.listing_id]?.custom_rule || undefined,
      check_in_time: listingHashMap && listingHashMap[data?.listing_id]?.check_in_time || undefined,
      check_out_time: listingHashMap && listingHashMap[data?.listing_id]?.check_out_time || undefined,
      pricing_data: data?.pricing_data && JSON.parse( data?.pricing_data ),
      user_currency: data?.user_currency, 
      payment_status: data?.payment_status,
      total_guests:data?.total_guests,
      total_amount: data?.total_amount,
      amount_paid: data?.amount_paid,
      balance_amount: data?.balance_amount,
      booking_created_At: formatBookingCreatedAt(data?.created_at)
    }

    let customerData 

    const [customerResponse] = await getCustomerDetails( userId );

    customerData = { 
      customer_region: regionHashmap && regionHashmap[customerResponse?.state_id]?.name || '',
      customer_joined: customerResponse?.created_at,
      customer_known_languages:customerResponse?.languages,
      customer_profile: customerResponse?.user_avatar,
    }

    setShowDetailsDialog(true);
    setBookingDetailsData((prev) => {return {...reservationsObj, ...customerData}})
    // setOpenPopover(false);
    // setOpenPopoverIndex(-1);
  }



  return (
    <div className="md:hidden mb-2 last:mb-0">
      <DetailsDialog bookingDetailsData={bookingDetailsData} open={showDetailsDialog}  onClose={() => setShowDetailsDialog(false)}/>

      <div className="flex rounded-2xl py-[16px] px-[24px] border border-[#5C5C5C] w-full relative cursor-pointer ">

       {/*  */}

        <div className="pr-8 border-r border-[#D9D9D9] text-center shrink-0 w-[10%]">
          <p className="text-[#5C5C5C] font-normal text-sm leading-4">Check in </p>
          <p className="mt-4 text-[#000000] text-base leading-5 font-normal">{startDate.format("MMM")}</p>
          <p className="text-[#000000] font-normal text-2xl leading-7 mt-1">{startDate.format("D")}</p>
          <p className="text-[#000000] leading-4 text-sm font-medium mt-2">
            {data?.payment_status == PAYMENT_PENDING ? 'Pending' : 
             data?.payment_status == PAYMENT_COMPLETED ? 'Completed': 'Unkown'
            //  data?.payment_status === PAYMENT_FAILED ? 'Cancelled':
            //  data?.payment_status === PAYMENT_PROCESSING ? 'Processing' :'Unkown'
           }
          </p>
        </div>

        <div className="flex justify-between w-full">
{/*  */}
          <div className="px-8 shrink-0 flex flex-col gap-8">
            <div className="flex">
              <Image
                height={64}
                width={64}
                src={AvatarIcon}
                className="rounded-full h-[60px] w-[60px]  mr-[16px] object-cover"
                alt="avatar"
              />
              <div>
                <p className="text-[#000000] font-medium text-xl leading-8">{data?.user_fname} {data?.user_lname}</p>
                <p className="text-[#000000] mt-2 font-normal text-base leading-5">{`${startDate.format(
                  "MMM D")}-${endDate.format( isSameMonth ? "D" : "MMM D")} (${noOfDates} Days)`}</p>

                  <div className="flex items-center -space-x-1 overflow-hidden mt-8">
                  {data?.total_guests && Array(data.total_guests).fill('').map((_, idx) => (
                    <Image height={24} width={24}
                      alt="avatar" src={AvatarIcon} className="inline-block rounded-full h-6 w-6 object-cover"
                      key={idx}/>
                    ))}
                    <span className="text-[#000000] font-normal text-sm leading-4 pl-2">{data?.total_guests} Guests</span>
                  </div>
              </div>
            </div>
          </div>

          <div className="px-8 overflow-hidden flex flex-col justify-between">
            <p className="truncate text-[#000000CC] leading-5 text-base font-normal"> {listingHashMap && listingHashMap[data?.listing_id]?.title}</p>
            <p className="text-[#000000] font-normal leading-5 text-base">Reservation Code - <span className="font-medium">{data?.id}</span></p>
            <p className="text-[#000000] leading-4 text-sm font-normal">Booking Date - {moment(data?.created_at).format("DD/MM/YYYY")}</p>
          </div>
{/*  */}

          {isRequested && (
            <div>
              <div className="flex items-end justify-end gap-x-2">
                  <div className="self-center flex items-center gap-x-4">
                    <span className="text-[#000000CC] text-sm leading-4">Total</span>
                    <span className="text-[#000000] font-medium text-base leading-5"> {formatCurrency(data?.user_currency, data?.total_amount)}</span>
                  </div>

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

                onChange={() => handleDetails(data?.customer_id, data)}
                listPaperClass="overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
                containerClass="shrink-0"
                   />
              </div>

              <div className="flex flex-col items-end justify-end">
                  <p className="text-[#000000] mt-5 leading-5 text-base font-normal">Booking Request</p>
                  <div className="flex gap-x-2  mt-3">
                    <button className="bg-[#000000] text-[#FFFFFF] py-2 px-7 rounded-[98px] leading-5 text-base font-normal">Accept</button>
                    <button className="bg-[#FFFFFF] border border-[#5C5C5C] py-2 px-7 rounded-[98px] text-[#5C5C5C] leading-5 text-base font-normal">Decline</button>
                  </div>
              </div>

            </div>
          )}

          {!isRequested && (
            <div className="">
                 <div>
                  <Select
                    buttonContent={
                    <Image
                      src={MoreVertIcon}
                      alt="menu"
                      className="invert ml-auto  shrink-0"
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

                  onChange={() => handleDetails(data?.customer_id, data)}
                  listPaperClass="overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
                  containerClass="shrink-0"
                    />
                 </div>

                 <div className="flex flex-col mt-3">
                    <span className="text-right">Total</span>
                    <span className="text-[#000000] leading-7 text-[28px] font-semibold">{formatCurrency(data?.user_currency, data?.total_amount)}</span>
                 </div>
            </div>
          )}

{/*  */}
       
        </div>
      </div>
    </div>
  );
}
