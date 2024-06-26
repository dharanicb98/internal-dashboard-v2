import React from "react";
import { Tab, TabWrapper } from "ui/tab";
import UnsolvedDisputes from "./unsolvedDisputes";
import CompletedDisputes from "./completedDisputes";
import OngoingDisputes from "./ongoingDisputes";

const Disputes = () => {
  const [tab, setTab] = React.useState("Ongoing");

  const tabList = [
    {
      key: "Ongoing",
      value: "Ongoing",
    },
    {
      key: "Unsolved",
      value: "Unsolved",
    },
    { key: "Completed", value: "Completed" },
  ];

  const tabPanels = [
    {
      value: "Ongoing",
      component: <OngoingDisputes />,
    },
    {
      value: "Unsolved",
      component: <UnsolvedDisputes />,
    },
    { value: "Completed", component: <CompletedDisputes /> },
  ];

  return (
    <>
      <Tab
        items={tabList}
        defaultTab="Ongoing"
        sticky
        value={tab}
        onChange={(value) => setTab(value)}
      />
      <TabWrapper tabs={tabPanels} value={tab} defaultTab="Ongoing" />
    </>
  );
};

export default Disputes;
