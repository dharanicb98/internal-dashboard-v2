import React, { useState, useEffect } from "react";
import Dropdown from "src/ui/dropdown";
import {
  endOfMonth,
  startOfMonth,
  addDays,
  format,
  parse,
  addMonths,
} from "date-fns";
import UpcomingCard from "./UpcomingCard";
import { useSelector } from "react-redux";

function UpcomingBooking() {
  const dateFormat = "MMMM yyyy";
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dropdownOptions, setDropDownOptions] = useState([]);
  const upcomingBooking = useSelector((state) => state.upcomingbookings);
  const selectedProperty = useSelector(
    (state) => state.propertylist.selectedProperty
  );

  useEffect(() => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i <= 12; i++) {
      const optionDate = addMonths(currentDate, i);
      options.push(format(optionDate, "MMMM yyyy"));
    }
    setDropDownOptions(options);
  }, []);

  const formatedCurrentMonth = (currentMonth) => {
    const formattedCurrentMonth = format(currentMonth, dateFormat);
    return formattedCurrentMonth;
  };

  const renderUpcomingBookings = () => {
    const upcomingBookingData = {};
    if (upcomingBooking?.length > 0) {
      upcomingBooking?.forEach((item) => {
        const checkinDate = new Date(item?.checkin);
        //  const key = checkinDate.toISOString().split('T')[0]
        const key =
          checkinDate.getFullYear() +
          "-" +
          (checkinDate.getMonth() + 1 > 9
            ? checkinDate.getMonth() + 1
            : "0" + (checkinDate.getMonth() + 1)) +
          "-" +
          (checkinDate.getDate() > 9
            ? checkinDate.getDate()
            : "0" + checkinDate.getDate());

        upcomingBookingData[key]
          ? upcomingBookingData[key].push(item)
          : (upcomingBookingData[key] = [item]);
      });
    }
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = monthStart;
    const endDate = monthEnd;
    const dateFormat = "EEE d";
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const currentDateISO =
        cloneDay.getFullYear() +
        "-" +
        (cloneDay.getMonth() + 1 > 9
          ? cloneDay.getMonth() + 1
          : "0" + (cloneDay.getMonth() + 1)) +
        "-" +
        (cloneDay.getDate() > 9
          ? cloneDay.getDate()
          : "0" + cloneDay.getDate());

      const available = upcomingBookingData[currentDateISO] ? true : false;
      const upcomingBookingsData = available
        ? upcomingBookingData[currentDateISO]
        : [];
      days.push(
        <div className="flex mb-[20px]" key={day.toString()}>
          <div className="text-xs md-m:text-base font-normal ">
            {formattedDate}
          </div>
          <div className="flex flex-1 ml-[6px] relative overflow-x-scroll no-scrollbar flex-wrap md-m:flex-nowrap">
            <div className="flex-1  h-[0.8px] bg-[#BBBBBB] mt-[10px] ml-[6px] w-[100%] absolute"></div>
            {upcomingBookingsData.filter(v => v.listing_id == selectedProperty?.listing_id)?.map((booking, index) => (
              <UpcomingCard booking={booking} key={index} />
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    return <div>{days}</div>;
  };

  return (
    <div className="py-[20px] w-full overflow-hidden">
      <p className="text-xl font-medium">UPCOMING BOOKINGS</p>
      <div className="pt-[20px] pb-[20px]">
        <Dropdown
          options={dropdownOptions}
          selectedValue={formatedCurrentMonth(currentMonth)}
          onSelect={(selectedValue) => {
            const selectedDate = parse(selectedValue, dateFormat, new Date());
            setCurrentMonth(selectedDate);
          }}
        />
      </div>
      <div className="w-full flex-col">{renderUpcomingBookings()}</div>
    </div>
  );
}

export default UpcomingBooking;
