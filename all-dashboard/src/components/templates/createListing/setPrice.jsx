import { useState } from "react";
import FillInput from "./fillInput";
import Image from "next/image";
import InfoOutlinedIcon from "assets/icons/info-outlined.png";
import { useDispatch } from "react-redux";
import { useCreateListingDataSelector } from "selectors/createListing";
import { updateData } from "slices/createListing";
import { currencyData } from "../../../constants/common";

function PriceInput(props) {
  const { title, info, value, onChange, required = false } = props;

  return (
    <div>
      <div>
        <p
          className={`text-grey-dark mb-[30px] text-base ${
            required
              ? "before:content-['*'] before:text-primary before:mr-1"
              : ""
          }`}
        >
          {title}
        </p>
        {!!info && <Image src={InfoOutlinedIcon} alt="info" />}
      </div>
      <FillInput
        className="text-xl"
        value={value || ""}
        onKeyDown={(evt) =>
          ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
        }
        onChange={(e) => onChange(e.target.value)}
        type="number"
        onWheel={(e) => {
          e.target.blur();
        }}
      />
    </div>
  );
}

function SetPrice() {
  const listingData = useCreateListingDataSelector();

  const dispatch = useDispatch();

  const handleUpdateData = (key, value) => {
    dispatch(updateData({ [key]: value }));
  };

  const handleUpdatePricingData = (key, value) => {
    const prevAddress = {
      ...listingData.basic_pricing,
      [key]: +value,
    };
    dispatch(updateData({ basic_pricing: prevAddress }));
    // dispatch(updateData({ [key]: value }));
  };

  const handleUpdateExtraData = (key, value) => {
    const extraGuests = { ...listingData.extra_guests, [key]: value };
    dispatch(updateData({ extra_guests: extraGuests }));
  };

  const handleUpdateCurrency = (e) => {
    let val = e.target.value;
    console.log("valvalvalavlalavlalavall", val);
    const curr = {
      ...listingData,
      currency: val.split(" ")[0],
      currency_symbol: val.split(" ")[1],
    };
    dispatch(updateData(curr));
  };

  console.log(listingData);

  return (
    <div className="flex flex-col gap-8">
      <div className="">
        <p className={`text-grey-dark mb-[30px] text-base `}>Select Currency</p>
        <select
          type="select"
          value={listingData?.currency + " " + listingData?.currency_symbol}
          className={`w-full h-[52px] rounded-lg placeholder-grey-dark focus:ring-0 or focus:ring-transparent !border-none 
      placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] text-[14px] 
      px-4 py-2  bg-grey-200 shadow-sm `}
          onChange={handleUpdateCurrency}
        >
          {/* <option>Select Currency</option> */}
          {Object.keys(currencyData).map((e, i) => (
            <option key={i} value={e + " " + currencyData[e].symbol}>
              {e} {currencyData[e].symbol}
            </option>
          ))}
        </select>
      </div>
      <PriceInput
        title="Base price"
        value={listingData?.basic_pricing?.base_price}
        onChange={(value) => handleUpdatePricingData("base_price", +value)}
        required
      />
      <PriceInput
        title="Weekend price"
        value={listingData?.basic_pricing?.weekend_price}
        onChange={(value) => handleUpdatePricingData("weekend_price", +value)}
        required
      />
      {/* <PriceInput
        title="One week +"
        value={listingData.week_price}
        onChange={(value) => handleUpdateData("week_price", +value)}
      />
      <PriceInput
        title="One month +"
        value={listingData.month_price}
        onChange={(value) => handleUpdateData("month_price", +value)}
      /> */}
      <PriceInput
        title="Price for additional guest +"
        value={listingData?.extra_guests?.additional_cost}
        onChange={(value) => handleUpdateExtraData("additional_cost", +value)}
      />
      <PriceInput
        title="Security Deposit +"
        value={listingData?.basic_pricing?.security_deposit}
        onChange={(value) =>
          handleUpdatePricingData("security_deposit", +value)
        }
        required
      />
    </div>
  );
}

export default SetPrice;
