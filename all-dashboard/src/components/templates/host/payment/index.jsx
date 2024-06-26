import React from "react";
import PaymentAppBar from "components/templates/payments/appbar/appbar";
import { Tab, TabWrapper } from "ui/tab";
import PayoutsTab from "components/templates/payments/payouts/PayoutsTab.jsx";
import YourPayments from "components/templates/payments/yourpayments";
import TransactionHistory from "components/templates/payments/transactionHistory";
import Disputes from "components/templates/payments/disputes";
import CouponsTab from "components/templates/payments/coupons";
import Taxes from "components/templates/payments/taxes";
import MobileappbarPayments from "components/templates/payments/appbar/mobileappbar";
import HelpCard from "components/templates/payments/cards/helpCard";
import MobileTabPayments from "components/templates/payments/cards/mobiletab";
import { useRouter } from "next/router";
import CommonLayout from "../../../layouts";

export default function DashboardRoot(props) {
  const router = useRouter();
  const [tab, setTab] = React.useState("payouts");

  const tabList = [
    {
      key: "Payouts",
      value: "payouts",
    },
    {
      key: "Your payments",
      value: "yourPayments",
    },
    {
      key: "Transaction History",
      value: "transactionHistory",
    },
    {
      key: "Disputes",
      value: "disputes",
    },
    {
      key: "Coupons",
      value: "coupons",
    },
    {
      key: "Taxes",
      value: "taxes",
    },
  ];

  const tabPanels = [
    {
      value: "payouts",
      component: <PayoutsTab />,
    },
    {
      value: "yourPayments",
      component: <YourPayments />,
    },
    {
      value: "transactionHistory",
      component: <TransactionHistory />,
    },
    {
      value: "disputes",
      component: <Disputes />,
    },
    {
      value: "coupons",
      component: <CouponsTab />,
    },
    {
      value: "taxes",
      component: <Taxes />,
    },
  ];

  React.useEffect(() => {
    if (router.query.tab) {
      const isValidTab = tabList.find(
        (item) => item.value === router.query.tab
      );
      if (isValidTab) {
        setTab(isValidTab.value);
      }
    }
  }, [router.query.tab]);

  return (
    <>
      <div className="hidden md:block mt-[0px]">
        <MobileappbarPayments />
      </div>
      <div className="hidden md:block">
        <MobileTabPayments />
      </div>
      <div className="hidden md:block">
        <HelpCard />
      </div>
      <div className="md:hidden mx-10 relative">
        <PaymentAppBar />
        <div className="relative overflow-x-auto w-[100%] h-[70px]">
          <div className="absolute w-[100%]">
            <Tab
              items={tabList}
              defaultTab="payouts"
              sticky
              value={tab}
              onChange={(value) => setTab(value)}
            />
          </div>
        </div>

        <TabWrapper
          tabs={tabPanels}
          value={tab}
          defaultTab="payouts"
          wrapperClass={"mx-1 mt-4"}
        />
      </div>
    </>
  );
}

DashboardRoot.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
