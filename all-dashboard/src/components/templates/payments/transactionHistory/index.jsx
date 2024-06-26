import React from "react";
import { Tab, TabWrapper } from "ui/tab";
import CancelledTransactions from "./cancelledTransactions";
import CompletedTranactions from "./completedTransactions";

const TransactionHistory = () => {
  const [tab, setTab] = React.useState("Completed");

  const tabList = [
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
      value: "Completed",
      component: <CompletedTranactions />,
    },
    {
      value: "Cancelled",
      component: <CancelledTransactions />,
    },
  ];

  return (
    <>
      <Tab
        items={tabList}
        defaultTab="Completed"
        sticky
        value={tab}
        onChange={(value) => setTab(value)}
      />
      <TabWrapper tabs={tabPanels} value={tab} defaultTab="Completed" />
    </>
  );
};

export default TransactionHistory;
