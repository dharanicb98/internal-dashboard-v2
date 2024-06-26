import React, { useEffect, useState } from "react";
import {
  startOfWeek,
  endOfMonth,
  startOfMonth,
  endOfWeek,
  addDays,
  addMonths,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  parse,
} from "date-fns";
import Dropdown from "src/ui/dropdown";
import CalendarPopup from "../modal/CalendarPopup";
import CalendarBlockIcon from "assets/icons/calendar-block.svg";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { getBlockedDates } from "services/calendar/apis";
import {
  setCalendarList,
  setCalendarLoader,
} from "store/slices/calendar/propertyList";

export default function CustomCalendar({ device = "desktop" }) {
  const dispatch = useDispatch();
  const [calendarView, setCalendarView] = useState(
    device == "desktop" ? "Month" : "Year"
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [modalOpen, setMOdalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState([]);
  const propertyList = useSelector((state) => state.propertylist.propertyList);
  const selectedProperty = useSelector(
    (state) => state.propertylist.selectedProperty
  );
  const isCalendarDates = useSelector((state) => state.propertylist.calendar);
  const calendar_loader = useSelector(
    (state) => state.propertylist.calendar_loader
  );
  const upcomingBookings = useSelector((state) => state.upcomingbookings);

  useEffect(() => {
    (async function () {
      if (selectedProperty?.listing_id) {
        dispatch(setCalendarLoader(true));
        const dd = await getBlockedDates({
          enq_data: {
            listing_id: selectedProperty?.listing_id,
          },
          start_date: format(currentMonth, "yyyy-MM-01"),
          end_date:
            calendarView == "Year"
              ? format(currentMonth, "yyyy") + "-12-31"
              : format(currentMonth, "yyyy-MM-") +
                new Date(
                  new Date(currentMonth).getFullYear(),
                  new Date(currentMonth).getMonth() + 1,
                  0
                ).getDate(),
        });
        dispatch(setCalendarList(dd?.calendar_data || {}));
        dispatch(setCalendarLoader(false));
        setSelectedToDate(null);
        setSelectedFromDate(null);
      }
    })();
  }, [selectedProperty, calendarView, currentMonth, refresh]);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    const options = [];
    const currentDate = new Date();

    for (let i = 0; i <= 12; i++) {
      const optionDate = addMonths(currentDate, i);
      options.push(format(optionDate, "MMMM yyyy"));
    }
    const formattedCurrentMonth = format(currentMonth, dateFormat);
    return (
      <>
        <CalendarPopup
          isOpen={modalOpen}
          onClose={(e) => {
            setMOdalOpen(false);
            if (e == "refresh") {
              setRefresh(!refresh);
            }
            setSelectedToDate(null);
            setSelectedFromDate(null);
          }}
          selectedFromDate={selectedFromDate}
          selectedToDate={selectedToDate}
          selectedProperty={selectedProperty}
        />
        {device == "desktop" && (
          <div className="header row flex-middle">
            <div className="col col-start ">
              {calendarView == "Month" && (
                <Dropdown
                  options={options}
                  selectedValue={formattedCurrentMonth}
                  onSelect={(selectedValue) => {
                    const selectedDate = parse(
                      selectedValue,
                      dateFormat,
                      new Date()
                    );
                    setCurrentMonth(selectedDate);
                  }}
                />
              )}
            </div>

            <div className="col col-end">
              <div className="flex  border-grey-dark border rounded-full gap ">
                <div
                  className={`px-4 py-2 rounded-full ${
                    calendarView == "Month"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } cursor-pointer`}
                  onClick={() => setCalendarView("Month")}
                >
                  Month
                </div>
                <div
                  className={`px-6 py-2 rounded-full ${
                    calendarView == "Year"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } cursor-pointer`}
                  onClick={() => setCalendarView("Year")}
                >
                  Year
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderDays = () => {
    const dateFormat = "eeee";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          <span className="text-base ">
            {format(addDays(startDate, i), dateFormat).substring(0, 3)}
          </span>
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderMonth = (month, type) => {
    //codes for creating object(date:price) from the available[] array coming from API
    const availabilityData = {};
    if (selectedProperty && Object.keys(selectedProperty).length > 0) {
      selectedProperty?.available &&
        selectedProperty?.available.forEach((item) => {
          if (item.isAvailable == true) {
            const start = new Date(item.startDate);
            const end = new Date(item.endDate);
            let currentDate = start;

            while (currentDate <= end) {
              availabilityData[currentDate.toISOString().split("T")[0]] =
                item.price;
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }
        });
    }

    //codes for creating object(date:'booked') from the booked[] array coming from API
    const bookedData = {};
    // if (selectedProperty && Object.keys(selectedProperty).length > 0) {
    //   selectedProperty?.booked &&
    //     selectedProperty?.booked.forEach((item) => {
    //       const start = new Date(item.startDate);
    //       const end = new Date(item.endDate);
    //       let currentDate = start;

    //       while (currentDate <= end) {
    //         bookedData[currentDate.toISOString().split("T")[0]] = {
    //           color: [selectedProperty.property_color],
    //           price: item.price,
    //         };
    //         currentDate.setDate(currentDate.getDate() + 1);
    //       }
    //     });
    // } else {
    // let colorArr = [];
    // propertyList?.map((property) => {
    //   colorArr.push(property.property_color);
    //   property?.booked.forEach((item) => {
    //     const start = new Date(item.startDate);
    //     const end = new Date(item.endDate);
    //     let currentDate = start;
    //     while (currentDate <= end) {
    //       bookedData[currentDate.toISOString().split("T")[0]]
    //         ? (bookedData[currentDate.toISOString().split("T")[0]] = {
    //             color: colorArr,
    //             price: "",
    //           })
    //         : (bookedData[currentDate.toISOString().split("T")[0]] = {
    //             color: [property.property_color],
    //             price: "",
    //           });
    //       currentDate.setDate(currentDate.getDate() + 1);
    //     }
    //   });
    // });
    // }

    if (upcomingBookings && upcomingBookings.length > 0) {
      upcomingBookings.forEach((item) => {
        if(item?.listing_id == selectedProperty?.listing_id){
        const vColor = propertyList.find(
          (v) => v.listing_id == item?.listing_id
        )?.property_color;
        const start = new Date(item.checkin);
        const end = new Date(item.checkout);
        let currentDate = start;
        while (currentDate <= end) {
          const mgDate = currentDate.toISOString().split("T")[0].toString();
          if (!bookedData[mgDate]) {
            bookedData[String(mgDate)] = {
              color: [vColor],
              price: "",
            };
          } else {
            bookedData[mgDate].color = [...bookedData[mgDate].color, vColor];
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        }
      });
    }

    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
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
        const todaysDate = new Date();
        const todaysDateISO =
          todaysDate.getFullYear() +
          "-" +
          (todaysDate.getMonth() + 1 > 9
            ? todaysDate.getMonth() + 1
            : "0" + (todaysDate.getMonth() + 1)) +
          "-" +
          (todaysDate.getDate() > 9
            ? todaysDate.getDate()
            : "0" + todaysDate.getDate());
        const blocked =
          new Date(cloneDay).getTime() < new Date(todaysDateISO).getTime()
            ? true
            : isCalendarDates?.[currentDateISO]?.isBlocked || false;
        const available = availabilityData[currentDateISO] ? true : false;
        const booked = bookedData[currentDateISO] ? true : false;
        let price = available
          ? availabilityData[currentDateISO]
          : "" || booked
          ? bookedData[currentDateISO].price
          : "";
        const color = booked ? bookedData[currentDateISO].color : [];
        if (!price) price = isCalendarDates?.[currentDateISO]?.price || 0;

        days.push(
          <div
            className={`col cell select-none  ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : selectedFromDate && isSameDay(day, selectedFromDate)
                ? "selected"
                : selectedToDate && isSameDay(day, selectedToDate)
                ? "selected"
                : selectedFromDate &&
                  selectedToDate &&
                  isWithinInterval(day, {
                    start: selectedFromDate,
                    end: selectedToDate,
                  })
                ? "selectedGray"
                : ""
            }  ${
              type == "Month"
                ? "border-r-[1px] border-r-[#EEEEEE] h-[5em] md-m-[6em] xl-m:h-[7em] 2xl-m:h-[10em]"
                : "h-[4em]"
            } ${
              blocked
                ? `t-${blocked} selectedGray` + (blocked != "manual" ? " disabled" : "")
                : ""
            }`}
            key={day.toString()}
            onClick={() => {
              onDateClick(cloneDay);
              setMOdalOpen(true);
            }}
            onMouseDown={() => {
              setSelectedFromDate(cloneDay);
              setSelected([]);
              setSelectedToDate(null);
            }}
            onMouseOver={() => {
              if (
                selectedFromDate &&
                cloneDay > selectedFromDate &&
                !selectedToDate
              ) {
                if (selected[selected.length - 1] > cloneDay) {
                  setSelected(selected.filter((s) => s <= cloneDay));
                } else setSelected([...selected, cloneDay]);
              }
            }}
            onMouseUp={() => {
              if (selectedFromDate && cloneDay > selectedFromDate) {
                setSelectedToDate(cloneDay);
                setMOdalOpen(true);
              } else {
                setSelected([]);
                setSelectedFromDate(null);
                setSelectedToDate(null);
              }
            }}
          >
            {calendarView == "Month" && (
              <>
                <div className="top">
                  <p
                    className={`text-base font-normal ${
                      blocked ? "line-through" : ""
                    }`}
                  >
                    {formattedDate}
                  </p>
                  <div className="flex">
                    {color.map((propColor, index) => (
                      <span
                        key={index}
                        className="h-[8px] w-[8px] rounded-full mr-[2px]"
                        style={{ backgroundColor: propColor }}
                      ></span>
                    ))}
                  </div>
                </div>
                <Image
                  src={CalendarBlockIcon}
                  alt="blocked"
                  className={`${
                    blocked ? "absolute bottom-3 left-2 right-2" : "hidden"
                  } `}
                />
                <span
                  className={`absolute bottom-2 right-2 text-sm font-medium ${
                    blocked ? "line-through" : ""
                  }`}
                >
                  {"$" + (price || 0)}
                </span>
              </>
            )}
            {calendarView == "Year" && (
              <div className="flex flex-col justify-center items-center">
                <p className={`text-xs ${blocked ? "line-through" : ""}`}>
                  {formattedDate}
                </p>
                <span
                  className={`text-[10px] font-medium ${
                    blocked ? "line-through" : ""
                  }`}
                >
                  {price ? "$" + price : ""}
                </span>
                <div className="flex">
                  {color.map((propColor, index) => (
                    <span
                      key={index}
                      className="h-[6px] w-[6px] rounded-full mr-[2px]"
                      style={{ backgroundColor: propColor }}
                    ></span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className={`row ${
            type == "Month" ? "border-b-[1px] border-b-[#EEEEEE]" : ""
          }`}
          key={day.toString()}
        >
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div
        className={`body cellbody ${
          type == "Month" ? "border-[1px] border-[#EEEEEE]" : ""
        }`}
      >
        {rows}
      </div>
    );
  };

  const onDateClick = (day) => {
    if (selectedFromDate && selectedFromDate.getDate() === day.getDate()) {
      setSelectedFromDate(null);
      setSelectedToDate(null);
    } else if (!selectedFromDate) {
      setSelectedFromDate(day);
      setSelectedToDate(null);
    } else if (!selectedToDate && day >= selectedFromDate) {
      setSelectedToDate(day);
    } else if (selectedToDate && selectedToDate.getDate() === day.getDate()) {
      setSelectedToDate(null);
    } else {
      setSelectedFromDate(day);
      setSelectedToDate(null);
    }
  };

  const renderYear = () => {
    const dateFormat = "MMMM yyyy";
    const currentDate = new Date();
    const months = [];

    for (let i = 0; i < 12; i++) {
      const month = addMonths(currentDate, i);
      const formattedMonth = format(month, dateFormat);

      months.push(
        <div
          className="month w-[100%] xl-m:w-[48%] border-b-[1px] md-m:border-0 border-b-[#D9D9D9]"
          key={formattedMonth}
        >
          <p className="text-base font-medium">{formattedMonth}</p>
          {renderDays()}
          {renderMonth(month, calendarView)}
        </div>
      );
    }

    return <div className="year flex flex-wrap justify-between">{months}</div>;
  };

  return (
    <div className="calendar relative">
      {calendar_loader ? <Loader /> : ""}
      {renderHeader()}
      {calendarView === "Month" && (
        <>
          {renderDays()}
          {renderMonth(currentMonth, calendarView)}
        </>
      )}
      {calendarView === "Year" && (
        <div className="h-auto md-m:max-h-[700px] dark-scrollbar overflow-y-scroll pr-[5px]">
          {renderYear()}
        </div>
      )}
    </div>
  );
}

const Loader = ({ className }) => {
  return (
    <div
      className={`flex z-10 justify-center w-full h-full absolute top-[0%] ${className}`}
      role="status"
    >
      <svg
        aria-hidden="true"
        class="w-[38px] h-[38px] text-gray-200 animate-spin dark:text-gray-600 fill-black"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  );
};
