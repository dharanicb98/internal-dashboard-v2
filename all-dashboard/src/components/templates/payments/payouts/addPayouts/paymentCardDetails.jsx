import React from "react";

const PaymentCardDetails = () => {
  return (
    <div className="min-w-[450px] min-h-[210px] rounded-lg bg-green-200 px-[36px] py-[33px]">
      <div className="flex items-center justify-between">
        <div>Credit</div>
        <div>08/2025</div>
      </div>
      <div className="mt-[70px]">Daisy</div>
      <div className="flex items-center justify-between">
        <div>... ... ... 2550</div>
        <button className="underline">Remove</button>
      </div>
    </div>
  );
};

export default PaymentCardDetails;
