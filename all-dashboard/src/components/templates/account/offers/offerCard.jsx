import React from "react";
import Image from "next/image";
import RightArrowWhite from "assets/icons/RightArrowWhite.svg";
import Starwhite from "assets/icons/Starwhite.svg";
import Starblack from "assets/icons/Starblack.svg";
import RightArrowBlack from "assets/icons/RightArrowBlack.svg";

export default function OfferCard(props) {
  const {
    rating,
    title,
    no_of_bathrooms_max,
    no_of_bedrooms_max,
    no_of_guests_max,
    imgUrl,
  } = props;

  const textColorClass = (value) => (value ? "text-white" : "text-black");

  const starImage = imgUrl ? (
    <Image src={Starwhite} alt="star" />
  ) : (
    <Image src={Starblack} alt="star" />
  );

  const arrowImage = imgUrl ? (
    <Image src={RightArrowWhite} alt="arrow" />
  ) : (
    <Image src={RightArrowBlack} alt="arrow" />
  );

  const handleManageClick = () => {};

  return (
    <div
      className={`min-w-[355px] md:max-w-[380px] xl:max-w-[430px] md:min-w-full border border-gray-200 rounded-2xl shadow-base ${textColorClass(
        !!imgUrl
      )} bg-cover bg-no-repeat backdrop-filter-[1px] mx-auto`}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${imgUrl})`,
      }}
    >
      <div className="mx-5 mb-5 mt-16 flex flex-col gap-2">
        <p
          className={`${
            imgUrl ? "bg-white" : "bg-black"
          } w-fit py-1 px-2.5 rounded-full ${textColorClass(!imgUrl)} mb-5`}
        >
          5
        </p>
        <div className="gap-2 flex items-center mt-auto text-[10px]">
          {starImage}
          {rating}
        </div>
        <h3
          className={`text-[22px] font-bold ${textColorClass(!!imgUrl)} mb-2`}
        >
          {title}
        </h3>
        <div
          className={`flex flex-wrap gap-2 text-[14px] hidden ${textColorClass(
            !!imgUrl
          )}`}
        >
          <p>Upto {no_of_guests_max} guests</p>
          <b>&#9679;</b>
          <p>{no_of_bedrooms_max} bedrooms</p>
          <b>&#9679;</b>
          <p>{no_of_bathrooms_max} Washrooms</p>
        </div>

        <p
          className={`border-b-2 pb-3 text-[14px] ${textColorClass(
            !!imgUrl
          )} mt-[18px]`}
        >
          Discounts for Longer Stays
        </p>

        <button
          className={`gap-2 flex items-center ml-auto font-medium rounded-full text-sm px-5 py-2.5 ${textColorClass(
            !!imgUrl
          )}`}
          onClick={handleManageClick}
        >
          {arrowImage}
        </button>
      </div>
    </div>
  );
}
