/* eslint-disable react/jsx-key */
import React from "react";
import Image from "next/image";
import ArrowBackIcon from "assets/icons/arrow-back.svg";
import VisaIcon from "assets/icons/visa.svg";
import MasterCardIcon from "assets/icons/master.svg";
import AmericanIcon from "assets/icons/american-express.svg";
import ArrowIcon from "assets/icons/forward-arrow.svg";
import CommonLayout from "../../../../layouts";

export default function AddPayoutMethod() {
  const methods = [
    {
      icon: VisaIcon,
      title: "Visa",
    },
    {
      icon: MasterCardIcon,
      title: "Mastercard",
    },
    {
      icon: AmericanIcon,
      title: "American Express",
    },
  ];
  return (
    <div className="bg-white">
      <div className=" ml-4  flex  gap-[16px] pt-[66px]">
        <Image
          src={ArrowBackIcon}
          alt="arrow left icon"
          className="min-w-[9px]"
        />
        <h3 className="text-xl font-medium ">Choose Payout Method</h3>
      </div>
      <div className=" my-[32px]  h-[1px] bg-[#D9D9D9]"></div>
      <div>
        {methods.map((method, index) => {
          return (
            <>
              {" "}
              <div className="flex place-content-between m-4">
                <div className="flex  gap-4 " key={index}>
                  <h3 className="text-lg font-normal ">{method.title}</h3>
                  <Image src={method.icon} alt="" className="min-w-[9px]" />
                </div>
                <Image src={ArrowIcon} alt="" className="min-w-[9px] grid" />
              </div>
              <div className="m-4 mb-[32px] mt-[24px] h-[1px] bg-[#D9D9D9]"></div>
            </>
          );
        })}
        <div className="flex place-content-between m-4">
          <div className="flex  gap-4">
            <h3 className="text-lg font-normal ">Paypal</h3>
          </div>
          <Image src={ArrowIcon} alt="" className="min-w-[9px] grid" />
        </div>
        <div className="m-4 mb-[32px] mt-[24px] h-[1px] bg-[#D9D9D9]"></div>
        <div className="flex place-content-between m-4">
          <div className="flex  gap-4">
            <h3 className="text-lg font-normal ">Bank Transfer</h3>
          </div>
          <Image src={ArrowIcon} alt="" className="min-w-[9px] grid" />
        </div>
        <div className="m-4 mb-[32px] mt-[24px] h-[1px] bg-[#D9D9D9]"></div>
      </div>
    </div>
  );
}

AddPayoutMethod.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
