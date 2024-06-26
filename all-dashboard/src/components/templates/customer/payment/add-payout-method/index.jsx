/* eslint-disable react/jsx-key */
import React from "react";
import Image from "next/image";
import ArrowBackIcon from "assets/icons/arrow-back.svg";
import PayPalIcon from "assets/icons/pay-pal.svg";
import MasterCardIcon from "assets/icons/master-card.svg";
import Point1Icon from "assets/icons/point1.svg";
import Point2Icon from "assets/icons/point2.svg";
import Point3Icon from "assets/icons/point3.svg";
import Point4Icon from "assets/icons/point4.svg";
import OutlinedInput from "./card-input";
import PayoutMobile from "./payout-mobile";
import CommonLayout from "../../../../layouts";

export default function AddPayoutMethod() {
  const methods = [
    {
      icon: PayPalIcon,
      title: "Paypal",
    },
    {
      icon: MasterCardIcon,
      title: "Master card",
    },
    {
      icon: PayPalIcon,
      title: "Bank Transfer",
    },
  ];
  const steps = [
    {
      icon: Point1Icon,
      title: "Easy and flexible payment methods",
    },
    {
      icon: Point2Icon,
      title: "24/7 Support System",
    },
    {
      icon: Point3Icon,
      title: "Payment & Invoice",
    },
    {
      icon: Point4Icon,
      title: "Lorem Ipsum is simply dummy text of",
    },
  ];
  return (
    <><div className="hidden md-m:block">
      <div className="py-16">
        <h3 className="text-3xl font-normal">Add Payout Method</h3>
      </div>
      <div className="flex gap-11 pb-16">
        <div>
          <div className="mb-14 flex  gap-[14px] ">
            <Image
              src={ArrowBackIcon}
              alt="arrow left icon"
              className="min-w-[9px]" />
            <h3 className="text-lg font-normal">Select Payment Method</h3>
          </div>

          <div className="flex flex-col gap-3">
            {methods.map((method, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div
                  className="flex place-content-between rounded-[6px] px-3 py-6 bg-[#FAFAFA] w-[548px]"
                  key={index}
                >
                  <div className="flex gap-4 justify-start">
                    <Image
                      src={method.icon}
                      alt="arrow left icon"
                      className="min-w-[22px]" />
                    <h3 className="text-lg font-normal">{method.title}</h3>
                  </div>

                  <div className="">
                    <input type="radio" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[572px]">
          <h3 className="text-lg font-normal pb-11"> Payment </h3>
          <div className="flex flex-col gap-3">
            <OutlinedInput label="Card Holder Name" />
            <OutlinedInput label="Card Number" />
            <div className="flex justify-between">
              <OutlinedInput label="Expiry Date" />
              <OutlinedInput label="CVV" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[151px]">
        <div className="w-[572px] pl-8 py-12 rounded-[9px] border-[1px] border-[#FAFAFA] bg-[#FAFAFA]">
          <div className="flex flex-col gap-8">
            {steps.map((step, index) => {
              return (
                <div className="flex gap-4 justify-start" key={index}>
                  <Image
                    src={step.icon}
                    alt="arrow left icon"
                    className="min-w-[28px]" />
                  <h3 className="text-base font-normal">{step.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[366px] pt-[13%]">
          <div className="flex gap-2 pb-[19px]">
            <input type="radio" />
            <h3 className="text-sm font-normal">By selecting the button, I agree <span className="underline text-[#CD264F]">terms & Conditions </span></h3>
          </div>
          <button className=" text-white bg-black px-5 py-2.5 rounded-full">Make Payment Method</button>
        </div>
      </div>
    </div><div className="block md-m:hidden">
        <PayoutMobile />
      </div></>
  );
}

AddPayoutMethod.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
