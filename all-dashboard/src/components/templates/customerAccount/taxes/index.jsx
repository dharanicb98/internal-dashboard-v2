import React from "react";
import { Tab, TabWrapper } from "ui/tab";
import TaxPayer from "./taxpayer";
import TaxDocument from "./taxdocument";
import TaxDetails from "./taxdetails";
import VatDetails from "./vatdetails";

function Taxes() {
  const [tab, setTab] = React.useState("taxpayer");
  const [taxPage, setTaxPage] = React.useState("taxpayer");
  const tabList = [
    {
      key: "Tax Payer",
      value: "taxpayer",
    },
    {
      key: "Tax Document",
      value: "taxdocument",
    },
  ];

  const tabPanels = [
    {
      value: "taxpayer",
      component: <TaxPayer taxPage={taxPage} setTaxPage={setTaxPage} />,
    },
    {
      value: "taxdocument",
      component: <TaxDocument />,
    },
  ];

  return (
    <>
      <div className={`${taxPage != "taxpayer" ? "hidden" : "block"} `}>
        <Tab
          items={tabList}
          defaultTab="taxpayer"
          sticky
          onChange={(value) => setTab(value)}
          value={tab}
          flexProps={{
            className: "flex gap-8",
          }}
        />

        <TabWrapper
          tabs={tabPanels}
          value={tab}
          defaultTab={"taxpayer"}
          itemClass="my-6 overflow-y-auto dark-scrollbar md:mb-[76px]"
        />
      </div>
      <TaxDetails taxPage={taxPage} setTaxPage={setTaxPage} />
      <VatDetails taxPage={taxPage} setTaxPage={setTaxPage} />
    </>
  );
}

export default Taxes;
