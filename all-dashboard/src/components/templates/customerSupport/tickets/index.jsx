import React, { useState } from "react";
import { Tab } from "ui/tab";
import { FilledButton } from "ui/buttons";
import { getRangeBetweenDates2 } from "utils/common";
import AddTicketDialog from "./addTicketDialog";

const tabList = [
  {
    key: "Raised",
    value: "raised",
  },
  {
    key: "Solved",
    value: "solved",
  },
];

const raisedTickets = [
  {
    guest_name: "Desmith Rose ",
    guests: 2,
    total_amount: "1750",
    listing_name: "5BR Dubai Lake",
    checkin: "18-8-2023",
    checkout: "18-8-2023",
    order_id: "Hdg6798",
  },
  {
    guest_name: "Desmith Rose ",
    guests: 2,
    total_amount: "1750",
    listing_name: "5BR Dubai Lake",
    checkin: "18-8-2023",
    checkout: "18-8-2023",
    order_id: "Hdg6798",
  },
  {
    guest_name: "Desmith Rose ",
    guests: 2,
    total_amount: "1750",
    listing_name: "5BR Dubai Lake",
    checkin: "18-8-2023",
    checkout: "18-8-2023",
    order_id: "Hdg6798",
  },
  {
    guest_name: "Desmith Rose ",
    guests: 2,
    total_amount: "1750",
    listing_name: "5BR Dubai Lake",
    checkin: "18-8-2023",
    checkout: "18-8-2023",
    order_id: "Hdg6798",
  },
  {
    guest_name: "Desmith Rose ",
    guests: 2,
    total_amount: "1750",
    listing_name: "5BR Dubai Lake",
    checkin: "18-8-2023",
    checkout: "18-8-2023",
    order_id: "Hdg6798",
  },
];

const solvedTickets = [
  {
    guest_name: "Harry Brook",
    guests: 2,
    total_amount: "1780",
    listing_name: "5BR Dubai Lake",
    checkin: "18-12-2023",
    checkout: "25-12-2023",
    order_id: "Hdg67578",
  },
  {
    guest_name: "Harry Brook",
    guests: 2,
    total_amount: "1780",
    listing_name: "5BR Dubai Lake",
    checkin: "18-12-2023",
    checkout: "25-12-2023",
    order_id: "Hdg67578",
  },
  {
    guest_name: "Harry Brook",
    guests: 2,
    total_amount: "1780",
    listing_name: "5BR Dubai Lake",
    checkin: "18-12-2023",
    checkout: "25-12-2023",
    order_id: "Hdg67578",
  },
];

const tableHeaders = [
  "Name",
  "Guests",
  "Amount",
  "Property",
  "Date",
  "Reservation code",
  "",
];

function Tickets() {
  const [tab, setTab] = useState("raised");
  const [openAddTicketDialog, setOpenAddTicketDialog] = useState(false);
  return (
    <>
      <AddTicketDialog
        open={openAddTicketDialog}
        setOpen={setOpenAddTicketDialog}
      />
      <div className="flex flex-col gap-8">
        <Tab
          items={tabList}
          defaultTab={"raised"}
          sticky
          onChange={(value) => setTab(value)}
          value={tab}
          flexProps={{
            className: "flex gap-8 overflow-auto",
          }}
          containerClass="overflow-auto md:hidden"
          buttonClass="whitespace-nowrap"
        />
        <table className="table-auto w-full">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  className="bg-[#F2F2F2] text-lg font-medium text-left p-4"
                  key={index}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              (tab == "raised" && raisedTickets) ||
              (tab == "solved" && solvedTickets)
            ).map((data, index) => (
              <tr key={index}>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  {data.guest_name}
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  {data.guests} {"Guests"}
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  {data?.currency_symbol ? data.currency_symbol : "$"}{" "}
                  {data?.total_amount}
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  {data.listing_name}
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  {getRangeBetweenDates2(data?.checkin, data?.checkout)}
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  {data.order_id}
                </td>
                <td className="border-b-[1px] border-grey text-base font-normal p-4">
                  <FilledButton
                    text={"Details"}
                    onClick={() => {}}
                    buttonClass="px-6 px-2.5 text-xs font-light max-w-[160px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <FilledButton
          text={"Add Ticket"}
          onClick={() => setOpenAddTicketDialog(true)}
          buttonClass="px-6 px-2.5 text-xs font-light max-w-fit"
        />
      </div>
    </>
  );
}

export default Tickets;
