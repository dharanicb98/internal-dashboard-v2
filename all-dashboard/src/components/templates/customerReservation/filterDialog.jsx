import { useState } from "react";
import Dialog from "ui/dialog";
import Calendar from "ui/calendar";
import DatesContainer from "ui/datesContainer";
import { FilledButton } from "ui/buttons";
import moment from "moment";

function FilterDialog({ open, setOpen, filters, setFilters }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const handleFilterByDates = () => {
  //   setFilters({ ...filter, fromDate: "2023-11-19", toDate: "2023-11-23" });
  // };

  const handleFilterByDates = (start, end) => {
    if ( start && end ) {
      setFilters({...filters, fromDate: moment(start).format("YYYY-MM-DD"),toDate: moment(end).format("YYYY-MM-DD")});
      setOpen(false)
    } else {
      setFilters({...filters, fromDate: null, toDate: null});
      setStartDate(null);
      setEndDate(null);
    }
  };



  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      contentClass={"h-auto w-[95%] md-m:w-[425px] bg-[#fff] p-4 rounded-xl"}
    >
      <div className="relative h-full overflow-y-scroll">
        <p className="mb-3">Filter</p>
        <DatesContainer
          fromValue={startDate}
          toValue={endDate}
          onChange={(key, value) => onChange(key, value)}
          fromTitle="From"
          toTitle="to"
          fromKey="check_in_time"
          toKey="check_out_time"
        />

        <Calendar
          startDate={startDate}
          endDate={endDate}
          setEndDate={(value) => setEndDate(value)}
          setStartDate={(value) => setStartDate(value)}
          daySize={50}
          basePrice={""}
          weekendPrice={""}
          currencySymbol={""}
          blockPreviousDates={false}
        />
        <div className="flex w-full bg-[#fff] justify-between items-end">
          <FilledButton
            text="Apply"
            onClick={() => handleFilterByDates(startDate, endDate)}
            buttonClass={`px-6 px-2.5 text-base font-normal ${
              startDate && endDate ? "bg-black" : "bg-[#c8c6c6]"
            }`}
            disabled={startDate && endDate ? false : true}
          />
          <span
            className="text-base cursor-pointer"
            style={{ textDecoration: "underline" }}
            onClick={() => handleFilterByDates(null, null)}
          >
            Clear
          </span>
        </div>
      </div>
    </Dialog>
  );
}

export default FilterDialog;
