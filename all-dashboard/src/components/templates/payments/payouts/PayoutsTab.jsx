import React, { useState } from "react";
import { Tab, TabWrapper } from "ui/tab";
import UpComingPaymentsTab from "./upcomingPaymentsTab";
import CompletedPayments from "./completedPayments";
import CancelledPayments from "./cancelledPayments";
import PayoutDialog from "./payoutDialog";

const PayoutsTab = () => {
  const [tab, setTab] = React.useState("Upcoming");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const tabList = [
    {
      key: "Upcoming",
      value: "Upcoming",
    },
    {
      key: "Completed",
      value: "Completed",
    },
    {
      key: "Cancelled",
      value: "Cancelled",
    },
  ];

  const tabPanels = [
    {
      value: "Upcoming",
      component: <UpComingPaymentsTab />,
    },
    {
      value: "Completed",
      component: <CompletedPayments />,
    },
    {
      value: "Cancelled",
      component: <CancelledPayments />,
    },
  ];

  return (
    <div>
      <PayoutDialog open={open} onClose={handleClose} />
      <Tab
        items={tabList}
        defaultTab="Upcoming"
        sticky
        value={tab}
        onChange={(value) => setTab(value)}
      />
      <TabWrapper tabs={tabPanels} value={tab} defaultTab="Upcoming" />
      <button
        className="mt-[20px] bg-black text-white rounded-full px-3 py-2"
        // onClick={() => setOpen(true)}
      >
        Add Payout Method
      </button>
    </div>
  );
};

export default PayoutsTab;
