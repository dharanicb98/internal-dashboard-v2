import React from 'react'

const PriceCard = ({
  price,
  percentage,
  comparedprice,
  title,
  total,
  text,
}) => {
  return (
    <div className="flex-col">
      <div className="font-medium text-base capitalize">{title}</div>
      <div className="flex gap-2 items-center">
        <div className="text-[28px] font-medium">{total || "$0"}</div>
        <div className="text-[#049801] font-medium text-xs">
          <b>&#8593;</b>
          {percentage || "0"}%
        </div>
      </div>
      <div className="text-base font-normal text-grey-dark">
        {text}
      </div>
    </div>
  );
};

export default PriceCard