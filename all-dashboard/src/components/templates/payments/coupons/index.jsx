import React, { useState } from "react";
import CouponBgCard from "./couponBgCard";
import CouponCard from "./couponCard";
import CreateCoupon from "./createCouponDialog";

const CouponsTab = () => {

const [open, setOpen] = useState(false);

const handleClose = () => {
setOpen(false)
}

  return (
    <>
      <div>
        <CouponBgCard />
      </div>
      <div className="text-[24px] font-medium mt-[80px]">Your Coupons</div>
      <div className="flex overflow-auto gap-6">
        {/* <CouponCard />
        <CouponCard />
        <CouponCard />
        <CouponCard /> */}
      </div>
      <CreateCoupon open={open} onClose={handleClose} />
      <button className="bg-black text-white rounded-full px-3 py-2 mt-[40px]" onClick={() => setOpen(true)}>Create Coupon</button>
    </>
  );
};

export default CouponsTab;
