import SortIcon from "assets/icons/sort.svg";
import FilterIcon from "assets/icons/filter-3.svg";
import Image from "next/image";
import FilterDialog from "./filterDialog";
import { useState } from "react";
import { Tab } from "ui/tab";
import Popover from "ui/popover";
import React from "react";

const filtersList = [
  {
    key: "All",
    value: "All",
  },
  {
    key: "Upcoming",
    value: "Upcoming",
  },
  {
    key: "Cancelled",
    value: "Cancelled",
  },
  {
    key: "Completed",
    value: "Completed",
  },
  {
    key: "Unsucessfull",
    value: "Unsucessfull",
  },
];

function Filters({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
  const [openSortPopover, setOpenSortPopover] = useState(false);

  return (
    <>
      <FilterDialog
        open={open}
        setOpen={setOpen}
        filters={filters}
        setFilters={setFilters}
      />

      {/*Filters for web*/}
      <div className="hidden md-m:block">
        <div className="flex justify-between items-center bg-[#F9FBFC] rounded-lg px-4 py-3 ">
          <div className="flex rounded-lg border border-[#D9D9D9]">
            <div
              className={`px-5 py-2.5 border-r border-r-[#D9D9D9] cursor-pointer ${
                filters.reservationType == "All"
                  ? "text-[#000] font-medium"
                  : "text-[#5C5C5C]"
              }`}
              onClick={() => setFilters({ ...filters, reservationType: "All" })}
            >
              All
            </div>
            <div
              className={`px-5 py-2.5 border-r border-r-[#D9D9D9] cursor-pointer ${
                filters.reservationType == "Upcoming"
                  ? "text-[#000] font-medium"
                  : "text-[#5C5C5C]"
              }`}
              onClick={() =>
                setFilters({ ...filters, reservationType: "Upcoming" })
              }
            >
              Upcoming
            </div>
            <div
              className={`px-5 py-2.5 border-r border-r-[#D9D9D9] cursor-pointer ${
                filters.reservationType == "Cancelled"
                  ? "text-[#000] font-medium"
                  : "text-[#5C5C5C]"
              }`}
              onClick={() =>
                setFilters({ ...filters, reservationType: "Cancelled" })
              }
            >
              Cancelled
            </div>
            <div
              className={`px-5 py-2.5 border-r border-r-[#D9D9D9] cursor-pointer ${
                filters.reservationType == "Completed"
                  ? "text-[#000] font-medium"
                  : "text-[#5C5C5C]"
              }`}
              onClick={() =>
                setFilters({ ...filters, reservationType: "Completed" })
              }
            >
              Completed
            </div>
            <div
              className={`px-5 py-2.5 cursor-pointer ${
                filters.reservationType == "Unsucessfull"
                  ? "text-[#000] font-medium"
                  : "text-[#5C5C5C]"
              }`}
              onClick={() =>
                setFilters({ ...filters, reservationType: "Unsucessfull" })
              }
            >
              Unsucessfull
            </div>
          </div>

          <div className="flex gap-3.5 ">
            <div
              className="flex gap-1 px-5 py-2.5 rounded-lg border border-[#D9D9D9] cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              Filter
              <Image src={FilterIcon} alt="filter" />
            </div>

            <div
              className="flex gap-1 px-5 py-2.5 rounded-lg border border-[#D9D9D9] cursor-pointer relative"
              onClick={() => setOpenSortPopover(true)}>
              Sort
              <Image src={SortIcon} alt="sort" />
              {/*Sort dialog for web*/}

              <Popover
                openDialog={openSortPopover}
                setOpenDialog={setOpenSortPopover}
                containerClass={
                  "bg-white px-6 py-8 rounded-xl w-[330px] -left-[230px] top-[50px] border border-[#D9D9D9] shadow-base"
                }
              >
                <p className="text-xl font-medium mb-6">Sort By</p>
                <div className="flex flex-col gap-8">
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="message-sort"
                      className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
                      checked={filters.sortBy == "desc"}
                      onChange={() => {
                        setFilters({
                          ...filters,
                          sortBy: "desc",
                          col:"id",
                          paymentStatus: "",
                        });
                        setOpenSortPopover(false);
                      }}
                    />
                    <label className="text-base font-normal">New to old</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="message-sort"
                      className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
                      checked={filters.sortBy == "asc"}
                      onChange={() => {
                        setFilters({
                          ...filters,
                          sortBy: "asc",
                          col:"id",
                          paymentStatus: "",
                        });
                        setOpenSortPopover(false);
                      }}
                    />
                    <label className="text-base font-normal">Old to new</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="message-sort"
                      className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
                      checked={filters.paymentStatus == "paid"}
                      onChange={() => {
                        setFilters({
                          ...filters,
                          paymentStatus: "paid",
                          sortBy: "",
                        });
                        setOpenSortPopover(false);
                      }}
                    />
                    <label className="text-base font-normal">Paid</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="message-sort"
                      className="focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
                      checked={filters.paymentStatus == "pending"}
                      onChange={() => {
                        setFilters({
                          ...filters,
                          paymentStatus: "pending",
                          sortBy: "",
                        });
                        setOpenSortPopover(false);
                      }}
                    />
                    <label className="text-base font-normal">Pending due</label>
                  </div>
                </div>
              </Popover>

            </div>
          </div>
        </div>
      </div>

      {/*Filters for mobile*/}
      <div className="block md-m:hidden">
        <Tab
          items={filtersList}
          defaultTab="All"
          sticky
          onChange={(value) => setFilters({ ...filters, reservationType: value })}
          value={filters.reservationType}
          flexProps={{
            className: "flex justify-between gap-8",
          }}
          containerClass="md:border md:border-primary md:px-2 md:py-2.5 md:rounded-full md:px-4"
          selectedTabClass="md:border-none md:bg-white md:rounded-full md:px-2.5 md:font-normal"
          buttonClass="md:pb-0"
        />
      </div>
    </>
  );
}

export default React.memo(Filters);
