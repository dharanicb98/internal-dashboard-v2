import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { TabWrapper, Tab } from "ui/tab";
import MobileTabHost from "ui/tab/mobileTabHost";

const GraphMobile = () => {
  const [tab, setTab] = React.useState("Week");

  const options = {
    xaxis: {
      categories: [
        "Jan",
        // "Feb",
        "Mar",
        // "Apr",
        "May",
        // "Jun",
        "Jul",
        // "Aug",
        "Sep",
        // "Oct",
        "Nov",
        // "Dec",
      ],
    },
    chart: { toolbar: { show: false } },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#E5E5EF",
      strokeDashArray: 7,
    },
    colors: ["#0096C7"],

    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="!text-black bg-white px-2.5 py-2">' +
          "<span>" +
          "&#8593;" +
          "</span>" +
          "<span class='ml-[6px]'>" +
          "$" +
          "</span>" +
          "<span>" +
          series[seriesIndex][dataPointIndex] +
          "</span>" +
          "</div>"
        );
      },
    },
  };

  const series = [
    {
      name: "series-1",
      data: [1432, 1189, 1321, 1926, 1550, 1123],
    },
  ];

  const TableList = [
    {
      key: "Week",
      value: "Week",
    },
    {
      key: "Month",
      value: "Month",
    },
    {
      key: "Year",
      value: "Year",
    },
  ];

  const tabPanels = [
    {
      value: "Week",
      component: <Chart options={options} series={series} type="area" />,
    },
    {
      value: "Month",
      component: <Chart options={options} series={series} type="area" />,
    },
    {
      value: "Year",
      component: <Chart options={options} series={series} type="area" />,
    },
  ];

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex flex-col">
        <div>
          {" "}
          <Tab
            items={TableList}
            defaultTab="Week"
            sticky
            value={tab}
            onChange={(value) => setTab(value)}
            flexProps={{
              className:
                "border border-hidden flex rounded-[16px] m-auto overflow-hidden w-fit justify-center",
            }}
            buttonClass="border border-hidden bg-[#e4e4e4] px-7 py-2 pb-2"
            selectedClass="bg-[#F5F4F4]"
            // liClass="[&>li]:last:mr-0"
            // containerClass="[&>li]:last:mr-0"
            containerClass="[&>li]:last:mr-0"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center">
            <div className="text-[28px] font-medium">$2197</div>
            <div className="text-[#049801] font-medium text-xs">
              <b>&#8593;</b>14.2%
            </div>
          </div>
          <div className="text-base font-normal text-grey-dark">
            Compared to $1340 last month
          </div>
        </div>
        <div>
          {" "}
          <TabWrapper
            tabs={tabPanels}
            value={tab}
            defaultTab="Week"
            itemClass="mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default GraphMobile;
