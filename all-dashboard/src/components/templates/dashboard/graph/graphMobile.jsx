import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { TabWrapper, Tab } from "ui/tab";
import MobileTabHost from "ui/tab/mobileTabHost";

const GraphMobile = ({ data }) => {
  const [tab, setTab] = React.useState("Week");
  const temproryApiDataFormat = [
    {
      date: "2024-01-01",
      amount: 2100,
    },
    // {
    //   date: "2024-01-30",
    //   amount: 4990,
    // },
    // {
    //   date: "2024-01-31",
    //   amount: 2450,
    // },
    {
      date: "2024-02-02",
      amount: 3100,
    },
    {
      date: "2024-03-03",
      amount: 3230,
    },
    {
      date: "2024-04-10",
      amount: 2998,
    },
    {
      date: "2024-05-13",
      amount: 4406,
    },
    {
      date: "2024-06-18",
      amount: 4670,
    },
    {
      date: "2024-07-26",
      amount: 6290,
    },
    {
      date: "2024-08-25",
      amount: 4650,
    },
    {
      date: "2024-09-28",
      amount: 3450,
    },
    {
      date: "2024-10-29",
      amount: 6450,
    },
    // {
    //   date: "2024-01-30",
    //   amount: 4990,
    // },
    // {
    //   date: "2024-01-31",
    //   amount: 2450,
    // },
    {
      date: "2024-11-01",
      amount: 3760,
    },
    {
      date: "2024-12-6",
      amount: 4340,
    },
    // {
    //   date: "2024-03-1",
    //   amount: 2670,
    // },
    // {
    //   date: "2024-03-4",
    //   amount: 2670,
    // },
  ];

  let seriesOne = [];
  let i = 0;
  for (; i < temproryApiDataFormat.length; i++) {
    const dateString = new Date(temproryApiDataFormat[i].date);

    if (dateString.getMonth() <= new Date().getMonth()) {
      if (
        dateString.getMonth() === new Date().getMonth() &&
        dateString.getDate() > new Date().getDate()
      )
        break;
      seriesOne.push(temproryApiDataFormat[i].amount);
      continue;
    }
    // if (dateString.getMonth() > new Date().getMonth()) break;
    // if (dateString.getDate() > new Date().getDate()) break;
    // seriesOne.push(temproryApiDataFormat[i].amount);
    break;
  }
  const lastDate = temproryApiDataFormat[i - 1].date;
  const seriesTwo = temproryApiDataFormat.map((el) => {
    const dateString = new Date(el.date);
    if (dateString.getMonth() > new Date(lastDate).getMonth()) {
      return el.amount;
    }
     if (
       dateString.getMonth() === new Date().getMonth() &&
       dateString.getDate() >= new Date(lastDate).getDate()
     ) {
       return el.amount;
     }
    if (dateString.getDate() === new Date(lastDate).getDate()) return el.amount;

    return null;
  });

  const dataForXAxis = temproryApiDataFormat.map((month, index) => {
    const dateString = new Date(month.date);
    return `${dateString.getDate()} ${dateString.toLocaleString("en-us", {
      month: "short",
    })}`;
  });

   const options = {
     xaxis: {
       // categories: [
       //   "Jan",
       //   "Feb",
       //   "Mar",
       //   "Apr",
       //   "May",
       //   "Jun",
       //   "Jul",
       //   "Aug",
       //   "Sep",
       //   "Oct",
       //   "Nov",
       //   "Dec",
       // ],

       // categories: data?.map(item => item.month),
       categories: dataForXAxis,
       min: undefined,
       max: undefined,
       stepSize: undefined,
       range: undefined,
       tooltip: {
         enabled: false,
       },
       labels: {
         show: true,
         // rotate: -45,
         // rotateAlways: true,
         style: {
           fontSize: "10px",
           fontWeight: 400,
         },
         datetimeUTC: true,
         datetimeFormatter: {
           year: "yyyy",
           month: "MMM 'yy",
           day: "dd MMM",
           hour: "HH:mm",
         },
         // formatter: function (value, timestamp, opts) {
         //   console.log(value);
         //   return new Date().getUTCDate();
         //   // return opts.dateFormatter(new Date(timestamp)).format("dd MMM");
         // },
       },
     },
     chart: { toolbar: { show: false }, zoom: { enabled: false } },
     dataLabels: {
       enabled: false,
     },
     // grid: {show: false},
     grid: {
       strokeDashArray: 7,
     },

     yaxis: {
       labels: {
         formatter: function (value) {
           return "$" + value;
         },
       },
     },
     colors: ["#1a7eec", "black"],
     fill: {
       colors: ["#00FFFF", "#7FFFD4"],
     },
     stroke: {
       width: 3,
       curve: ["smooth", "straight"],
     },
     legend: {
       show: false,
       position: "top",
       horizontalAlign: "right",
       fontSize: "16px",
       fontWeight: 400,
       markers: {
         width: "16px",
         height: "16px",
         gap: 2,
       },
       onItemClick: {
         toggleDataSeries: false,
       },
       onItemHover: {
         highlightDataSeries: true,
       },
     },
     markers: {
       size: 0,
       colors: "black",
       strokeColors: "white",
       strokeWidth: 4,
     },

     tooltip: {
       custom: function ({ series, seriesIndex, dataPointIndex, w }) {
         // console.log(
         //   dataPointIndex,
         //   series[0].length,
         //   series[0][dataPointIndex],
         //   series[1][dataPointIndex]
         // );
         let tipPointValue;
         if (dataPointIndex < series[0].length) {
           // console.log("if block");
           tipPointValue = series[0][dataPointIndex];
         } else {
           // console.log("else block");
           tipPointValue = series[1][dataPointIndex];
         }

         if (tipPointValue == undefined) return null;

         return (
           '<div class="!text-white bg-black px-2.5 py-2">' +
           "<span>" +
           "&#8593;" +
           "</span>" +
           "<span class='ml-[6px]'>" +
           "$" +
           "</span>" +
           "<span>" +
           tipPointValue +
           "</span>" +
           "</div>"
         );
       },
     },
   };

  const series = [
    {
      name: "Paid Out",
      type: "area",
      // data: [2323, 9323, 232, 4000, 2003, 8342],
      // data: data?.map(item => parseInt(item.value)),
      data: seriesOne,
      zIndex: 1,
    },
    {
      name: "Expected",
      type: "area",
      data: seriesTwo,
      // data: [
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   8342,
      //   2839,
      //   2389,
      //   5749,
      //   1223,
      //   5678,
      //   7823,
      // ],
      zIndex: 0,
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
      className="rounded-2xl p-0"
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
            <div className="text-[28px] font-medium">$0</div>
            <div className="text-[#049801] font-medium text-xs">
              <b>&#8593;</b>0%
            </div>
          </div>
          <div className="text-base font-normal text-grey-dark">
            Compared to $0 last month
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
