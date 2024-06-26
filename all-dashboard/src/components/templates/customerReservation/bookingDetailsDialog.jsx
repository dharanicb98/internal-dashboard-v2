import Dialog from "ui/dialog";
import Image from "next/image";
import Avatar from "ui/avatar";
import AvatarIcon from "assets/images/avatar.svg";
import { FilledButton, OutlinedButton } from "ui/buttons";
import CalendarIcon from "src/public/assets/icons/calendar-tick.svg";
import LocationIcon from "src/public/assets/icons/location-pin.svg";
import StarIcon from "src/public/assets/icons/review-star-outlined.svg";
import BriefcaseIcon from "src/public/assets/icons/briefcase-hosted.svg";
import ClockIcon from "src/public/assets/icons/clock.svg";
import LanguageIcon from "src/public/assets/icons/language.svg";
import { formatCurrency } from '../../../utils/common/'
import {
  PAYMENT_PENDING,
  PAYMENT_COMPLETED,
  PAYMENT_FAILED,
  PAYMENT_PROCESSING,
} from "src/constants/payment";
import React from "react";
import CloseIcon from "assets/icons/close-rounded.svg";



function BookingDetailsDialog({ open, setOpen, bookingDetailsData, setHostId, setBookingDetailsData, handleSendMessageToHost }) {
  return (
    <Dialog
      onClose={() => {
        setHostId(null);
        setOpen(false);
        setBookingDetailsData({})
      }}
      open={open}
      contentClass={"relative h-auto w-[95%] md-m:w-auto bg-[#fff] p-4 rounded-xl"}
    >
      <p className="md-m:text-xl md-m:mb-8 mb-4 font-medium leading-6 text-base">Booking Details</p>
      <Image
          src={CloseIcon}
          alt="close"
          width={26}
          height={26}
          className="absolute top-2 right-3 md:top-4 md:right-6 cursor-pointer md:!w-6 md:!h-6"
          onClick={() => {
            setHostId(null);
            setOpen(false);
            setBookingDetailsData({})
          }}
        />

      {bookingDetailsData && (
         <div className="flex flex-col gap-6">
         {/*Host details for desktop*/}
         <div className="hidden md-m:block rounded-xl border border-[#D9D9D9] py-6 px-8 ">
           <div className="flex gap-16 justify-between">
             <div className="flex flex-col gap-6">
               <div className="flex gap-2">
                <div className={`relative h-[60px] w-[60px]`}>
                  <Image
                    className="rounded-full"
                    src={bookingDetailsData?.host_profile ? `${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}/${bookingDetailsData?.host_profile}`: AvatarIcon}
                    alt="Rounded avatar"
                    fill
                  />
                </div>
              
                 <div className="flex flex-col justify-center">
                   <p className="text-xl font-medium leading-6">{bookingDetailsData?.host_fname} {bookingDetailsData?.host_lname}</p>
                   <p className="text-xs leading-3 font-normal mt-2">Host</p>
                 </div>
               </div>
               <div className="flex flex-col gap-3.5 text-sm font-light">
                 <p>{bookingDetailsData?.listing_name}</p>
                 <p>
                   Reservation Code- <strong>{bookingDetailsData?.reservation_code}</strong>
                 </p>
                 <p>Booking Date- {bookingDetailsData?.booking_date}</p>
               </div>
             </div>
             <div className="flex flex-col gap-7 justify-between">
               <div className="flex flex-col gap-2">
                 {(bookingDetailsData?.host_mobile && bookingDetailsData?.host_mobile_ext) ?
                 <>
                  <a className="text-black hover:text-white
                  hover:bg-black  flex items-center justify-center text-base font-normal  border-[#5C5C5C] 
                  min-w-[100px] h-[40px] bg-inherit rounded-full 
                  border " href={`tel:${bookingDetailsData?.host_mobile_ext} ${bookingDetailsData?.host_mobile}`}>Call</a>
                 </> :
                 <>
                 <OutlinedButton
                   text={"Call"}
                   primary={false}
                   buttonClass={
                     "px-6 text-base font-normal border border-[#5C5C5C] min-w-[100px] h-[40px]"
                   }
                 />
                 </>}

                 {/* <OutlinedButton
                   
                   text={"Call"}
                   primary={false}
                   buttonClass={
                     "px-6 text-base font-normal border border-[#5C5C5C] min-w-[100px] h-[40px]"
                   }
                 /> */}
                 <FilledButton
                   text={"Message"}
                   onClick={() => handleSendMessageToHost(bookingDetailsData?.hostId, bookingDetailsData)}
                   buttonClass="px-6 px-2.5 text-sm font-normal w-[125px]"
                 />
               </div>
               <div className="flex flex-col text-right">
                <p className="text-sm font-normal">Paid</p>
                <p className="text-lg font-semibold">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.amount_paid)}</p>
               </div>
             </div>
           </div>
         </div>

         {/*=====================Host details card for mobile==========================*/}
         <div
           className=" block md-m:hidden w-full min-h-[270px] px-6 py-5 rounded-2xl"
           style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}
         >
           <div className="flex flex-col">
             <div className="mb-4">
               <div className="text-sm font-normal">
                 {bookingDetailsData?.payment_status == PAYMENT_COMPLETED
                   ? "Paid"
                   : bookingDetailsData?.payment_status == PAYMENT_PROCESSING
                   ? "Requested"
                   : bookingDetailsData?.payment_status == PAYMENT_PENDING
                   ? "Pending"
                   : bookingDetailsData?.payment_status == PAYMENT_FAILED
                   ? "Failed"
                   : "Unknown"}
               </div>
             </div>
             <div className="mb-[18px]">
               {" "}
               <div className="flex items-center justify-between">
                 <div className="flex">
                   <div className="mr-[10px]">
                     <div className={`relative h-[60px] w-[60px]`}>
                      <Image
                        className="rounded-full"
                        src={bookingDetailsData?.host_profile ? `${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}/${bookingDetailsData?.host_profile}`: AvatarIcon}
                        alt="Rounded avatar"
                        fill
                      />
                     </div>
                   </div>
                   <div className="flex flex-col gap-[6px] mr-1">
                     <div className="font-medium text-lg">
                      {bookingDetailsData?.fname} {bookingDetailsData?.lname}
                     </div>
                     <div className="font-normal text-xs">Host</div>
                   </div>
                 </div>
                 <div>
                   <div className="font-normal text-xs">{bookingDetailsData?.total_guests} Guests</div>
                 </div>
               </div>
             </div>
             <div className="mb-4">
               <div className="flex flex-col gap-2">
                 <div className="font-normal text-sm">
                   {bookingDetailsData?.listing_name}
                 </div>
                 <div className="font-normal text-sm">
                   Reservation Code-{" "}
                   <b>
                   {bookingDetailsData?.reservation_code}
                   </b>
                 </div>
               </div>
             </div>
             <div className="mb-[14px]">
               <div className="font-normal text-sm">
                 Booking Date:-  {bookingDetailsData?.booking_date}{" "}
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
                   <div className="text-sm font-normal">Paid</div>
                   <div className="font-semibold text-lg">
                    {formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.amount_paid)}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="rounded-xl border border-[#D9D9D9] py-6 px-8">
           <p className="leading-6 text-xl font-medium mb-4">About Host</p>
           <div className="grid grid-cols-2 md-m:grid-cols-3 gap-4 text-sm">
             <div className="flex gap-2">
               <Image src={CalendarIcon} alt="calendar" />
               <span>Joined {new Date(bookingDetailsData?.host_joined)?.getFullYear() || '0000'}</span>
             </div>
             <div className="flex gap-2">
               <Image src={LocationIcon} alt="location" />
               <span>{bookingDetailsData?.hostRegion}</span>
             </div>
             <div className="flex gap-2">
               <Image src={StarIcon} alt="review" />
               <span>No Reviews</span>
             </div>
             <div className="flex gap-2">
               <Image src={BriefcaseIcon} alt="hosted" />
               <span>2 Hosted</span>
             </div>
             <div className="flex gap-2">
               <Image src={ClockIcon} alt="response" />
               <span>2hr Response Time</span>
             </div>
             <div className="flex gap-2">
               <Image src={LanguageIcon} alt="language" />
               <span>{bookingDetailsData?.host_known_languages}</span>
             </div>
           </div>
         </div>

         <div className="hidden md-m:block rounded-xl border border-[#D9D9D9] py-6 px-8">
            {(bookingDetailsData?.wifi_network_name && bookingDetailsData?.wifi_network_password) && (
             <>
              <p className="leading-6 text-xl font-medium mb-3">Wifi Details</p>
                <div className="flex justify-between mb-8">
                  <div>
                    <span className="text-sm font-medium leading-4">SSID-</span>
                    <span className="text-sm font-normal leading-3">{bookingDetailsData?.wifi_network_name}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium  leading-4">Passcode-</span>
                    <span className="text-sm font-normal leading-3">{bookingDetailsData?.wifi_network_password}</span>
                  </div>
                </div>
             </>
            )}
          
            {(bookingDetailsData?.check_in_time && bookingDetailsData?.check_out_time) && (
              <div>
                <p className="leading-6 text-xl font-medium mb-3">House Rules</p>
                <ul className="list-disc list-inside ml-2">
                  <li className="mb-4 text-sm leading-4">Check-in at {bookingDetailsData?.check_in_time}</li>
                  <li className="mb-4 text-sm leading-4">Check-out at {bookingDetailsData?.check_out_time}</li>
                  {bookingDetailsData?.custom_rule &&  <li className="mb-4 text-sm leading-4 max-w-sm">{bookingDetailsData?.custom_rule}</li>}
                </ul>
              </div>
            )}
          

         </div>

         <div className="hidden md-m:block  gap-4">

           {/* <div className="flex-1 rounded-xl border border-[#D9D9D9] py-6 px-8 bg-pink-600"> */}

             <div className="flex justify-between gap-x-3">

               <div className="flex items-center justify-between  w-[60%] border border-[#D9D9D9] rounded-xl py-6 px-8">
                  <div className="flex flex-col justify-center items-center gap-3.5">
                    <p className="text-xl font-normal leading-6">Total</p>
                    <p className="text-xl font-medium leading-6">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.total_amount)}</p>

                  </div>

                  <div className="border border-[#D9D9D9] h-full"></div>

                  <div className="flex flex-col justify-center items-center gap-3.5">
                    <p className="text-xl font-normal leading-6">Total Paid</p>
                    <p className="text-xl font-medium leading-6">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.amount_paid)}</p>

                  </div>
               </div>

               <div className=" w-[40%] flex flex-col justify-center items-center gap-3.5 rounded-xl border border-[#D9D9D9] py-6 px-8">
                <p className="text-xl font-normal leading-6">Due</p>
              
                <p className="text-xl font-medium leading-6">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.balance_amount)}</p>

             </div>

             </div>

           {/* </div> */}

           

         </div>
         
         {/*Price breakup for desktop*/}
         <div className="hidden md-m:block rounded-xl border border-[#D9D9D9] py-6 px-8">
           <p className="text-xl font-medium mb-4 leading-6">Paid</p>
           <div className="flex justify-between mb-4">
             <span className="text-lg font-medium leading-5">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.base_price_total/bookingDetailsData?.pricing_data?.no_of_days)} X {bookingDetailsData?.pricing_data?.no_of_days} Nights</span>
             <span className="text-lg font-medium leading-5">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.base_price_total)}</span>
           </div>
          
            <div className="flex justify-between border-b border-b-[#D9D9D9] text-sm py-2 mt-6">
               <span className="font-normal text-sm leading-4">Taxes</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.tax_price_total)}</span>
            </div>

            <div className="flex justify-between border-b border-b-[#D9D9D9] text-sm py-2 mt-4">
               <span className="font-normal text-sm leading-4">Security Deposit</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.security_deposit_total)}</span>
            </div>

            <div className="flex justify-between border-b border-b-[#D9D9D9] text-sm py-2 mt-4">
               <span className="font-normal text-sm leading-4">Extra Services Fees</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.extra_service_price_total)}</span>
            </div>

            <div className="flex justify-between border-b border-b-[#D9D9D9] text-sm py-2 mt-4">
               <span className="font-normal text-sm leading-4">Processing Fees</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.processing_fee_total)}</span>
            </div>
          

           <div className="flex justify-between mt-8">
             <span className="text-lg font-medium leading-5">Total</span>
             <span className="text-lg font-medium leading-5">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.final_price)}</span>
           </div>
         </div>

         {/*Price breakup for mobile*/}
         <div className="block md-m:hidden rounded-xl border border-[#D9D9D9] py-6 px-8">
           <p className="text-xl font-medium mb-4">Guest Paid</p>
           <div className="flex justify-between mb-4">
             <span className="text-lg font-medium">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.base_price_total/bookingDetailsData?.pricing_data?.no_of_days)} X {bookingDetailsData?.pricing_data?.no_of_days} Nights</span>
             <span className="text-lg font-medium">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.base_price_total)}</span>
           </div>

            <div className="flex justify-between  text-sm py-2">
               <span className="font-normal text-sm leading-4">Taxes</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.tax_price_total)}</span>
            </div>

            <div className="flex justify-between  text-sm py-2 mt-3">
               <span className="font-normal text-sm leading-4">Security Deposit</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.security_deposit_total)}</span>
            </div>

            <div className="flex justify-between  text-sm py-2 mt-3">
               <span className="font-normal text-sm leading-4">Extra Services Fees</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.extra_service_price_total)}</span>
            </div>

            <div className="flex justify-between  text-sm py-2 mt-3">
               <span className="font-normal text-sm leading-4">Processing Fees</span>
               <span className="font-normal text-sm leading-4">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.processing_fee_total)}</span>
            </div>
           
           <div className="flex justify-between mt-8">
             <span className="text-lg font-medium leading-5">Total</span>
             <span className="text-lg font-medium leading-5">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.final_price)}</span>
           </div>
         </div>

 
        <div className="rounded-xl border border-[#D9D9D9] py-6 px-8">
           <p className="text-xl font-medium mb-4">Popular Help Topics</p>
           <div className="border-b border-[#D9D9D] py-3.5">
             <p className="text-lg">How will you get Paid</p>
             <p className="mb-4 text-sm text-[#000000B2]">
               Guidelines to safeguard your account and money
             </p>
             <p className="underline cursor-pointer">Learn More</p>
           </div>
           <div className="border-b border-[#D9D9D] py-3.5">
             <p className="text-lg"> Need help with recent Payment</p>
             <p className="mb-4 text-sm text-[#000000B2]">
               Need not to worry read here to find out why this happened
             </p>
             <p className="underline cursor-pointer">Learn More</p>
           </div>
           <p className="text-lg font-medium mt-4 cursor-pointer">View All</p>
        </div>

       </div>
      )}
    </Dialog>
  );
}

export default React.memo(BookingDetailsDialog);
