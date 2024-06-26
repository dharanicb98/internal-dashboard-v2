import React from "react";
import { Tab, TabWrapper } from "ui/tab";
import HighEarningListings from "./highEarningsListings";
import LowEarningListings from "./lowEarningsListings";

const YourPayments = () => {
  const [tab, setTab] = React.useState("High Earning Listings");

  const tabList = [
    {
      key: "High Earning Listings",
      value: "High Earning Listings",
    },
    {
      key: "Low Earning Listings",
      value: "Low Earning Listings",
    },
  ];

  const tabPanels = [
    {
      value: "High Earning Listings",
      component: <HighEarningListings />,
    },
    {
      value: "Low Earning Listings",
      component: <LowEarningListings />,
    },
  ];

  return (
    <>
      <Tab
        items={tabList}
        defaultTab="High Earning Listings"
        sticky
        value={tab}
        onChange={(value) => setTab(value)}
      />
      <TabWrapper
        tabs={tabPanels}
        value={tab}
        defaultTab="High Earning Listings"
      />
    </>
  );
};

export default YourPayments;
