import "react-dates/initialize";
import {
  DayPickerRangeController,
  FocusedInputShape,
  ModifiersShape,
  isInclusivelyAfterDay,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import React from "react";
import moment from "moment";

export default function Calendar(props: CalendarProps) {
  const {
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    daySize,
    numberOfMonths,
    orientation,
    basePrice,
    weekendPrice,
    currencySymbol,
    blockPreviousDates=true
  } = props;

  const [focusedInput, setFocusedInput] =
    React.useState<FocusedInputShape | null>("startDate");

  const onDateSelected: OnDatesChangeFunc = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const focusInputDate = (focusedInput: FocusedInputShape | null) => {
    setFocusedInput(focusedInput);
  };

  const renderDayContents: RenderDayContentsFunc = (e) => {
    let price = "";
    if (startDate && endDate) {
      const isbetween = e.isBetween(startDate, endDate);
      const issame = e.isSame(startDate) || e.isSame(endDate);
      if (isbetween || issame) {
        price = basePrice || "";
        if (e.format("dddd") == "Saturday" || e.format("dddd") == "Sunday") {
          price = weekendPrice || "";
        }
      }
    } else {
      price = basePrice || "";
      if (e.format("dddd") == "Saturday" || e.format("dddd") == "Sunday") {
        price = weekendPrice || "";
      }
    }

    return (
      <div className="w-[100%] overflow-hidden innerdate flex flex-col hover:flex-col">
        <p className=" font-medium text-base"> {e.format("D")} </p>
        <p className=" font-light text-[10px] ">
          {price ? `${currencySymbol || "$"}${price}` : ""}
        </p>
      </div>
    );
  };

  const renderKeyboardShortcutsButton = () => {
    return "";
  };

  const nextButtonSVG = () => (
    <span className="absolute top-5 right-5 w-[30px] h-[30px] border flex justify-center items-center rounded-full">
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.679134 11.633C0.866671 11.8357 1.18301 11.848 1.38571 11.6604L7.10683 6.3671C7.32075 6.16919 7.32075 5.83101 7.10684 5.63309L1.38572 0.339682C1.18302 0.152138 0.866667 0.164429 0.679132 0.367134L0.339541 0.734193C0.152016 0.936888 0.164307 1.25322 0.366995 1.44075L4.89813 5.63309C5.11204 5.83101 5.11204 6.16919 4.89813 6.36711L0.36701 10.5594C0.164316 10.747 0.15203 11.0633 0.339568 11.266L0.679134 11.633Z"
          fill="black"
        />
      </svg>
    </span>
  );

  const prevButtonSVG = () => (
    <span className="absolute top-5 left-5 w-[30px] h-[30px] border flex justify-center items-center rounded-full">
      <svg
        className="rotate-180"
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.679134 11.633C0.866671 11.8357 1.18301 11.848 1.38571 11.6604L7.10683 6.3671C7.32075 6.16919 7.32075 5.83101 7.10684 5.63309L1.38572 0.339682C1.18302 0.152138 0.866667 0.164429 0.679132 0.367134L0.339541 0.734193C0.152016 0.936888 0.164307 1.25322 0.366995 1.44075L4.89813 5.63309C5.11204 5.83101 5.11204 6.16919 4.89813 6.36711L0.36701 10.5594C0.164316 10.747 0.15203 11.0633 0.339568 11.266L0.679134 11.633Z"
          fill="black"
        />
      </svg>
    </span>
  );

  const handleOutRangeDates =  ( day:any ) => {
     if ( blockPreviousDates ) {
       return !isInclusivelyAfterDay(day, moment())
     }
     else {
      return false
     }
  }

  return (
    <div className="flex justify-center h-fit">
      <DayPickerRangeController
        numberOfMonths={numberOfMonths}
        startDate={startDate ? moment(startDate) : null}
        endDate={endDate ? moment(endDate) : null}
        focusedInput={focusedInput}
        onDatesChange={onDateSelected}
        onFocusChange={focusInputDate}
        firstDayOfWeek={6}
        weekDayFormat="ddd"
        daySize={daySize ? daySize : 40}
        navNext={nextButtonSVG()}
        navPrev={prevButtonSVG()}
        renderDayContents={renderDayContents}
        isOutsideRange={(day) => handleOutRangeDates(day)}
        keepOpenOnDateSelect
        renderKeyboardShortcutsButton={renderKeyboardShortcutsButton}
        initialVisibleMonth={() => moment()}
        orientation={orientation ? orientation : "horizontal"}
      />
    </div>
  );
}

interface CalendarProps {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  setEndDate: (date: moment.Moment | null) => void;
  setStartDate: (date: moment.Moment | null) => void;
  daySize: number;
  numberOfMonths: number;
  orientation?: "horizontal" | "vertical";
  basePrice: string|number;
  weekendPrice: string|number;
  currencySymbol: string;
  blockPreviousDates?: boolean
}

type RenderDayContentsFunc = (
  day: moment.Moment,
  modifiers: ModifiersShape
) => React.ReactNode;

type OnDatesChangeFunc = (arg: {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}) => void;
