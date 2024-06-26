import Dialog from "ui/dialog";
import { useState } from "react";

function SortDialogMobile({ open, setOpen , filters, setFilters}) {
  const [selected, setSelected] = useState("booking_newwest");

  const handleApply = () => {
    switch (selected) {
      case 'booking_newwest':
        setFilters({...filters, sortBy:'desc', col:'id',  paymentStatus: ""})
        break 

      case 'booking_oldest':
        setFilters({...filters, sortBy:'asc', col:'id', paymentStatus: ""})
        break 

      case 'checkin_newwest':
        setFilters({...filters, sortBy:'desc', col:'checkin',  paymentStatus: ""})
        break

      case 'checkin_oldest':
        setFilters({...filters, sortBy:'asc', col:'checkin',  paymentStatus: ""})
        break
        
      default:
        break
    }
    setOpen((prev) => !prev)
  }

  return (
    <Dialog
      onClose={() => setOpen(false)} open={open}
      contentClass={"h-auto w-[95%] md-m:w-auto bg-[#fff] p-4 rounded-xl"}>
      <p className="mb-8">Sort By</p>
      <div className="flex flex-col gap-8">
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            name="message-sort"
            className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={selected == "checkin_newwest"}
            onChange={() => setSelected("checkin_newwest")}
          />
          <label className="text-base font-normal">
            Check-in date from newest to oldest
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            name="message-sort"
            className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={selected == "checkin_oldest"}
            onChange={() => setSelected("checkin_oldest")}
          />
          <label className="text-base font-normal">
            Check-in date from oldest to newest
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            name="message-sort"
            className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={selected == "booking_newwest"}
            onChange={() => setSelected("booking_newwest")}
          />
          <label className="text-base font-normal">
            Booking date from newest to oldest
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            name="message-sort"
            className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={selected == "booking_oldest"}
            onChange={() => setSelected("booking_oldest")}
          />
          <label className="text-base font-normal">
            Booking date from oldest to newest
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handleApply()}
            className={`px-5 py-2.5 text-white rounded-full text-xs font-normal ${
              selected ? "bg-black" : "bg-[#c8c6c6]"
            }`}
            disabled={selected ? false : true}
          >
            Apply
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default SortDialogMobile;
