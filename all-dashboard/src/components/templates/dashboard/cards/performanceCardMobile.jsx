import React from "react";
import Divider from "ui/divider";
import TableComponentMobile from "src/components/templates/dashboard/table/tableMobile";
import { TabWrapper } from "ui/tab";
import MobileTabHost from "ui/tab/mobileTabHost";
import Select from "ui/input/select";
import Downarrow from "assets/images/down-arrow-mobile.png";
import Image from "next/image";

const PerformanceCardMobile = ({ high, low, earnings }) => {
  const [select,setSelect] = React.useState("Week")
  const [tab, setTab] = React.useState("High Earnings Listings");
  const weeklyEarnings = earnings[0];
  const monthlyEarnings = earnings[1];
  const yearlyEarnings = earnings[2];
  // console.log(yearlyEarnings);

  const TableList = [
    {
      key: "High Earnings Listings",
      value: "High Earnings Listings",
    },
    {
      key: "Low Earnings Listings",
      value: "Low Earnings Listings",
    },
  ];

  const tabPanels = [
    {
      value: "High Earnings Listings",
      component: <TableComponentMobile data={high} />,
    },
    {
      value: "Low Earnings Listings",
      component: <TableComponentMobile data={low} />,
    },
  ];
  

  return (
    <div
      className="rounded-[16px] p-4"
      style={{
        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">Earnings</div>
        <Select
          onChange={setSelect}
          buttonContent={
            <div className="flex p-3.5 gap-4">
              <div className="text-sm font-medium">{select}</div>
              <Image
                className="w-[20px] h-[20px]"
                src={Downarrow}
                alt="Down-arrow-icon"
              />
            </div>
          }
          options={[
            {
              key: (
                <div className="flex p-3.5 gap-4">
                  <div className="text-sm font-medium">Week</div>
                  <Image
                    className="w-[20px] h-[20px]"
                    src={Downarrow}
                    alt="Down-arrow-icon"
                  />
                </div>
              ),
              value: "Week",
            },
            {
              key: (
                <div className="flex p-3.5 gap-4">
                  <div className="text-sm font-medium">Day</div>
                  <Image
                    className="w-[20px] h-[20px]"
                    src={Downarrow}
                    alt="Down-arrow-icon"
                  />
                </div>
              ),
              value: "Day",
            },
            {
              key: (
                <div className="flex p-3.5 gap-4">
                  <div className="text-sm font-medium">Month</div>
                  <Image
                    className="w-[20px] h-[20px]"
                    src={Downarrow}
                    alt="Down-arrow-icon"
                  />
                </div>
              ),
              value: "Month",
            },
            {
              key: (
                <div className="flex p-3.5 gap-4">
                  <div className="text-sm font-medium">Year</div>
                  <Image
                    className="w-[20px] h-[20px]"
                    src={Downarrow}
                    alt="Down-arrow-icon"
                  />
                </div>
              ),
              value: "Year",
            },
          ]}
          listPaperClass="overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
          containerClass="static"
        />
      </div>
      {select ==="Week" && weeklyEarnings && <TempCard earnings={weeklyEarnings} />}
      {select ==="Month" && monthlyEarnings &&  <TempCard earnings={monthlyEarnings} />}
      {select ==="Year" && yearlyEarnings && <TempCard earnings={yearlyEarnings} />}
     
      <Divider />
      <div className="mt-4">
        <MobileTabHost
          items={TableList}
          defaultTab="High Earnings Listings"
          sticky
          value={tab}
          onChange={(value) => setTab(value)}
          flexProps={{
            className: "flex justify-between",
          }}
        />
        <TabWrapper
          tabs={tabPanels}
          value={tab}
          defaultTab="High Earnings Listings"
          itemClass="mt-6"
        />
      </div>
    </div>
  );
};

export default PerformanceCardMobile;


const TempCard = ({ earnings }) => {
  const {total=0,text="0 Earningns"} = earnings
  return (
    <>
      <div className="py-4">
        <div className="text-[28px] font-bold">
          {total} <div className="inline text-base font-sans">USD</div>
        </div>
        <div className="text-grey-400">
          <b className="text-black">You earned $0 this week.</b> {text}
        </div>
      </div>
    </>
  );
}