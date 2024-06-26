import React from "react";
import { Tab, TabWrapper } from "ui/tab";
import Offers from "components/templates/customerAccount/offers";
import GiftCard from "components/templates/customerAccount/giftCard";
import Profile from "components/templates/customerAccount/profile";
import Referral from "components/templates/customerAccount/referral";
import Social from "components/templates/customerAccount/social";
import Taxes from "components/templates/customerAccount/taxes";
import Tools from "components/templates/customerAccount/tools";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import Image from "next/image";
import Filter from "ui/filterGroup/filter";
import Sort from "ui/filterGroup/sort";
import { useAccountsTabSelector } from "store/selectors/accounts";
import { updateTab } from "store/slices/accounts";

import CommonLayout from "../../../layouts";
import { useDispatch } from "react-redux";


function Account() {
  const tab = useAccountsTabSelector();
  const dispatch = useDispatch()

  const tabList = [
    {
      key: "Account",
      value: "profile",
      mobileKey: "Edit profile",
    },
    {
      key: "Social Media Login",
      value: "social",
    },
    {
      key: "Taxes",
      value: "taxes",
    },

    {
      key: "Offers",
      value: "offers",
    },
    {
      key: "Referral",
      value: "referral",
    },
    {
      key: "Gift Card",
      value: "gift-card",
    },
    {
      key: "Tools",
      value: "tools",
    },
  ];

  const tabPanels = [
    {
      value: "profile",
      component: <Profile />,
    },
    {
      value: "social",
      component: <Social />,
    },
    {
      value: "taxes",
      component: <Taxes />,
    },

    {
      value: "offers",
      component: <Offers />,
    },
    {
      value: "referral",
      component: <Referral />,
    },
    {
      value: "gift-card",
      component: <GiftCard />,
    },
    {
      value: "tools",
      component: <Tools />,
    },
  ];

  return (
    <>
      <div className="mx-10 mb-[80px] md:hidden">
        <div className="sticky md:static top-0 pt-10 md:pt-0 bg-white flex flex-col gap-6 appBar__index shadow-[10px_0_0_0_white,-12px_0_0_0_white] md:bg-transparent md:shadow-none">
          <div className="mt-[30px]">
            <DesktopAppBar path="customer-dashboard" containerClass="md:overflow-auto" />
          </div>
          <div className="relative h-[50px] overflow-auto">
            <div className="absolute w-[100%]">
              <Tab
                items={tabList}
                defaultTab="profile"
                sticky
                onChange={(value) => dispatch(updateTab(value))}
                value={tab}
                flexProps={{
                  className: "flex justify-between gap-8 overflow-auto",
                }}
                containerClass="overflow-auto md:hidden"
                buttonClass="whitespace-nowrap"
              />
            </div>
          </div>
        </div>

        <TabWrapper
          tabs={tabPanels}
          value={tab}
          defaultTab={"account"}
          itemClass="my-6 dark-scrollbar md:mb-[76px] md:min-h-screen"
        />
      </div>

      <div className="hidden md:block md:mx-6 bg-no-repeat bg-cover h-screen overflow-auto">
        <TabWrapper
          tabs={tabPanels}
          value={tab}
          defaultTab="profile"
          itemClass="dark-scrollbar md:mb-[76px] md:min-h-screen"
        />
      </div>
    </>
  );
}

Account.getLayout = (page) => (
  <CommonLayout>{page}</CommonLayout>
);


export default Account;
