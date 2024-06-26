import React from "react";
import BgImage from "assets/images/coupon-card-bg-image.png";

const CouponCard = () => {
  return (
    <div
      className="rounded-2xl min-w-[375px] min-h-[215px] p-4"
      style={{
        backgroundImage: `url(${BgImage.src}), linear-gradient(90deg, #000 32.8%, rgba(0, 0, 0, 0.00) 94.63%)`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "lightgrey",
      }}
    >
      <div>
        <div className="text-white">5 BR LAKE CABIN with Awesome (197) </div>
        <div className="text-white">valid till 23/12</div>
        <div className="text-white flex items-center justify-between">
          <div>Above $5690</div>
          <div>Code #123</div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
