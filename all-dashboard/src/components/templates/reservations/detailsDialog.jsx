import Dialog from "ui/dialog";
import Image from "next/image";
import Avatar from "assets/images/avatar.svg";
import { OutlinedButton, FilledButton } from "ui/buttons";
import Divider from "ui/divider";
import CalendarIcon from "assets/icons/calendar.png";
import LanguageIcon from "assets/icons/language.png";
import StarIcon from "assets/icons/star.png";
import SuitCaseIcon from "assets/icons/suit-case.png";
import ClockIcon from "assets/icons/clock.png";
import LocationPin from "assets/icons/location-pin.png";
import WalletIcon from "assets/icons/wallet.png";
import CloseIcon from "assets/icons/close-rounded.svg";
import ReservationDetailsCard from "./detailsCard";
import TransactionDetailsContent from "./transactionDetailsDialog";
import React from "react";
import { formatCurrency } from '../../../utils/common/'

export function CardContainer(props) {
  const { children } = props;
  return (
    <div className="py-6 px-8 rounded-2xl border border-grey">{children}</div>
  );
}

function GetPriceBreakUpContainer({label='', value='', className=''}) {
  return (
    <>
      <div className={`flex justify-between py-2 mt-4 ${className}`}>
        <p className="text-[#000000] leading-4 text-sm font-normal">{label}</p>
        <p className="text-[#000000CC] leading-4 text-sm font-normal">{value}</p>
      </div>
      <hr className="mt-2"/>
    </>
  )
}



function DetailsDialog(props) {
  const { open, onClose, bookingDetailsData } = props;
  
  return (
    <Dialog open={open} onClose={() => onClose()} contentClass="relative h-auto w-[95%] md-m:w-auto bg-[#fff] p-4 rounded-xl">
       <h1 className="text-[#000000] leading-6 text-xl font-medium">Booking Details</h1>
        <Image
          src={CloseIcon}
          alt="close"
          width={26}
          height={26}
          className="absolute top-2 right-3 md:top-4 md:right-6 cursor-pointer md:!w-6 md:!h-6"
          onClick={onClose}
        />
      <div className="flex flex-col gap-y-8 mt-5">
        <CardContainer>
          <ReservationDetailsCard bookingDetailsData={bookingDetailsData}/>
        </CardContainer>

        <CardContainer>
          <p className="text-xl font-medium">About {bookingDetailsData?.user_fname} {bookingDetailsData?.user_lname}</p>
          <div className="mt-4 grid grid-cols-2 md-m:grid-cols-3 gap-4  ">
            {[
              { icon: CalendarIcon, value: `Joined ${new Date(bookingDetailsData?.customer_joined)?.getFullYear() || '0000'}` },
              { icon: LocationPin, value: `${bookingDetailsData?.customer_region}` },
              { icon: StarIcon, value: "No reviews" },
              { icon: SuitCaseIcon, value: "0 Bookings" },
              { icon: ClockIcon, value: "2hr Response Time " },
              { icon: LanguageIcon, value: `${bookingDetailsData?.customer_known_languages}` },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center">
                <Image src={item.icon} alt="about-icon" />
                <p className="ml-2 text-sm truncate font-normal leading-4 text-[#000000]">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContainer>

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

        <CardContainer>
          <p className="text-[#000000] leading-6 text-xl font-medium">Guest Paid</p>
          <div className="flex justify-between mt-4">
            <p className="font-medium text-lg leading-5">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.base_price_total/bookingDetailsData?.pricing_data?.no_of_days)} X {bookingDetailsData?.pricing_data?.no_of_days} Nights</p>
            <p className="font-medium text-lg leading-5">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.base_price_total)}</p>
          </div>

         <GetPriceBreakUpContainer label={'Taxes'} value={formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.tax_price_total)} />
         <GetPriceBreakUpContainer label={'Security Deposit'} value={formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.security_deposit_total)}/>
         <GetPriceBreakUpContainer label={'Extra Services Fees'} value={formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.extra_service_price_total)}/>
         <GetPriceBreakUpContainer label="Processing Fees" value={formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.processing_fee_total)}/>

          <div className="flex justify-between mt-8">
            <p className="font-medium text-lg leading-5">Total</p>
            <p className="font-medium text-lg leading-5">{formatCurrency(bookingDetailsData?.user_currency, bookingDetailsData?.pricing_data?.final_price)}</p>
          </div>

        </CardContainer>

        <CardContainer>
          <div className="flex justify-between">
            <p className="text-[#000000] leading-6  text-xl font-medium">Popular Help Topics</p>
              <Image
                src={WalletIcon}
                alt="wallet"
                height={29}
                width={32}
                className="mb-auto"
              />
          </div>
          
          <div className="mt-7">
            <p className="text-[#000000] text-lg leading-5 font-normal">How will you get Paid</p>
            <p className="text-[#000000B2] leading-7 text-sm font-normal mt-2 mb-7">  Guidelines to safeguard your account and money</p>
            <a href='#' className="underline cursor-pointer leading-7 text-sm font-normal text-[#000000]">Learn More</a>
          </div>
     
          <Divider />

          <div className="flex justify-between mt-6">
            <p className="text-[#000000] leading-6  text-lg font-normal">Need help with recent Payment</p>
            <Image
              src={WalletIcon}
              alt="wallet"
              height={29}
              width={32}
              className="mb-auto"
            />
          </div>

          <div className="mt-7">
            <p className="text-[#000000] text-sm leading-5 font-normal mb-7">
              Need not to worry read here to find out why this happened
            </p>
            <a href='#' className="underline cursor-pointer leading-7 text-sm font-normal text-[#000000]">Learn More</a>
          </div>
        </CardContainer>
      </div>
    </Dialog>
  );
}

export default DetailsDialog;
