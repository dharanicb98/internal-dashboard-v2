import React from "react";
import BgImage from "assets/images/coupon-bg-image.png";
import HkImage from "assets/images/hk-image-white.png";
import Image from "next/image";

const CouponBgCard = () => {
  return (
    <div
      className="rounded-2xl w-full h-[290px]"
      style={{
        backgroundImage: `url(${BgImage.src}), linear-gradient(90deg, #000 32.8%, rgba(0, 0, 0, 0.00) 94.63%)`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "lightgrey",
      }}
    >
<div className="w-3/5 h-full" style={{ background: 'linear-gradient(90deg, #000 32.8%, rgba(0, 0, 0, 0.00) 94.63%)' }}>
  <div className="h-full pt-[60px] ml-[60px]">
        <Image src={HkImage} alt="hk-image" />
        <div className="text-white text-[32px] font-normal mt-[25px]">
          Experience the magic of vacation with our Coupons exclusive to the
          customers.
        </div>
        </div>
      </div>
    </div>
  );
};

export default CouponBgCard;
