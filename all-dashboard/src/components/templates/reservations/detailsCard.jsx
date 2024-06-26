import Image from "next/image";
import React from "react";
import { OutlinedButton, FilledButton } from "ui/buttons";
import Avatar from "assets/images/avatar.svg";
import { useRouter } from "next/router";
import { formatCurrency } from '../../../utils/common/'
import { PAYMENT_PENDING, PAYMENT_COMPLETED, PAYMENT_FAILED,  PAYMENT_PROCESSING} from "src/constants/payment";
import AvatarIcon from "assets/images/avatar.svg";
import moment from "moment";
import { getRangeBetweenDates2 } from "utils/common";


function ReservationDetailsCard({bookingDetailsData, handleDetailsCard, callFunction=false}) {

  const startDate = moment(bookingDetailsData?.checkin);
  const endDate = moment(bookingDetailsData?.checkout);
  const isSameMonth = startDate.format("M") === endDate.format("M");
  const noOfDates = Math.abs(startDate.diff(endDate, "days"));

  return (
    <div >
      <p className="text-sm mb-4">
      {bookingDetailsData?.payment_status == PAYMENT_PENDING ? 'Pending' : 
      bookingDetailsData?.payment_status == PAYMENT_COMPLETED ? 'Completed': 'Unknown'
      // bookingDetailsData?.payment_status === PAYMENT_FAILED ? 'Cancelled':
      // bookingDetailsData?.payment_status === PAYMENT_PROCESSING ? 'Processing' :'Unkown'
      }
      </p>
      <div className="flex justify-between md:flex-col md:justify-center gap-12">
        <div>
          <div className="flex items-center">
            <div className={`relative h-[60px] w-[60px] mr-2.5 md:mr-2`}>
              <Image
                src={bookingDetailsData?.customer_profile ? `${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}/${bookingDetailsData?.customer_profile}`: AvatarIcon}
                alt="avatar"
                className="rounded-full "
                fill
              />
            </div>
            
            <div className="">
              <div className="w-full">
                <p className="text-xl font-medium line-clamp-2 md:text-lg">
                  {bookingDetailsData?.user_fname} {bookingDetailsData?.user_lname}
                </p>
              </div>

              <p className="text-xs mt-2 md:text-dark  w-full">
              {`${startDate.format("MMM D")}-${endDate.format( isSameMonth ? "D" : "MMM D")} (${noOfDates} Nights)`}
              </p>
    
            </div>

            <div className="flex items-center self-start  shrink-0">
              <div className="flex -space-x-1 overflow-hidden shrink-0">
                {Array(3)?.fill('')?.map((_, idx) => (
                  <Image
                    height={16}
                    width={16}
                    alt="avatar"
                    src={Avatar}
                    className="inline-block rounded-full object-cover"
                    key={idx}
                  />
                ))}
              </div>
              <p className="text-xs ml-1 shrink-0">{bookingDetailsData?.total_guests} Guests </p>
            </div>

           
          </div>

          <div className="flex flex-col gap-y-3 font-light text-sm mt-6">
            <p>{bookingDetailsData?.listing_name}</p>
            <p>
              Reservation Code - <span className="font-normal">{bookingDetailsData?.id}</span>
            </p>
            <p>Booking Date- {bookingDetailsData?.booking_created_At}</p>
          </div>
        </div>

        <div className="flex flex-col ml-auto md:ml-0 md:flex-row md:justify-between md:gap-10">
          <div className="flex flex-col gap-4 md:flex-row-reverse md:h-fit md:mt-auto">
          <button className="text-sm font-normal border border-solid border-black px-[18px] py-[10px] rounded-full">
                Call
              </button>
            <button className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-normal">
                Message
              </button>
          </div>
          <div className="mt-auto text-right">
            <p className="text-sm">Paid</p>
            <p className="font-semibold text-lg">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.amount_paid)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetailsCard;
