import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tab, TabWrapper } from "ui/tab";
import ChatWithUs from "components/templates/customerSupport/chat";
import EmailUs from "components/templates/customerSupport/email";
import CallNow from "components/templates/customerSupport/call";
import BugReport from "components/templates/customerSupport/report";
import Tickets from "components/templates/customerSupport/tickets";
import Terms from "components/templates/customerSupport/terms";
import Faq from "components/templates/customerSupport/faq";
//import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import DesktopAppBar from "ui/appbar/desktopAppbar";
// import Image from "next/image";
// import Filter from "ui/filterGroup/filter";
// import Sort from "ui/filterGroup/sort";
import { useCustomerSupportTabSelector } from "store/selectors/tabs";
import { updateTab } from "store/slices/tabs/customerSupport";
import { useDispatch } from "react-redux";
import { wrapper } from "store/index";
import CommonLayout from '../../../layouts'

const tabList = [
  {
    key: "Chat With Us",
    value: "chat",
    mobileKey: "Chat With Us",
  },
  {
    key: "Email Us",
    value: "emailus",
  },
  {
    key: "Call Now",
    value: "callnow",
  },

  {
    key: "Feedbacks and bug report",
    value: "bugreport",
  },
  {
    key: "Tickets",
    value: "tickets",
  },
  {
    key: "Terms & Conditions",
    value: "terms",
  },
  {
    key: "Faq",
    value: "faq",
  },
];

const tabPanels = [
  {
    value: "chat",
    component: <ChatWithUs />,
  },
  {
    value: "emailus",
    component: <EmailUs />,
  },
  {
    value: "callnow",
    component: <CallNow />,
  },

  {
    value: "bugreport",
    component: <BugReport />,
  },
  {
    value: "tickets",
    component: <Tickets />,
  },
  {
    value: "terms",
    component: <Terms />,
  },
  {
    value: "faq",
    component: <Faq />,
  },
];


import { validateServerAccessToken } from "utils/common";

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await validateServerAccessToken(store, ctx);
    const current = store.getState();
    console.log(current);

    return {
      props: {
        current: current,
      },
    };
  }
);

function Support({ current }) {
  const dispatch = useDispatch();
  const tab = useCustomerSupportTabSelector();
  const router = useRouter();

  useEffect(() => {
    if (router.query.tab) {
      const isValidTab = tabList.find(
        (item) => item.value === router.query.tab
      );
      if (isValidTab) {
        dispatch(updateTab(isValidTab.value));
      }
    }
  }, [router.query.tab]);

  const handleEmailButtonClick = () => {
    const emailAddress = "recipient@example.com";
    const subject = "Hello";
    const body = "This is the body of the email.";

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the default email client
    window.open(mailtoLink);
  };

  return (
    <>
      <div className="mx-10 mb-[80px] md:hidden">
        <div className="sticky md:static top-0 pt-10 md:pt-0 bg-white flex flex-col gap-6 appBar__index shadow-[10px_0_0_0_white,-12px_0_0_0_white] md:bg-transparent md:shadow-none">
          <div className="mt-[40px]">
            <DesktopAppBar
              path="customer-dashboard"
              title="Support"
              containerClass="md:overflow-auto"
            />
          </div>
          <div className="relative overflow-x-auto h-[50px]">
            <div className="absolute w-[100%]">
              <Tab
                items={tabList}
                defaultTab={"chat"}
                sticky
                onChange={(value) => {
                  if (value === "emailus") {
                    const emailAddress = "recipient@example.com";
                    const subject = "Hello";
                    const body = "This is the body of the email.";
                    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`;
                    window.open(mailtoLink);
                    dispatch(updateTab(value));
                  } else {
                    dispatch(updateTab(value));
                  }
                }}
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
          defaultTab={"chat"}
          itemClass="my-6 dark-scrollbar md:mb-[76px] md:min-h-screen"
        />
      </div>
      <div className="hidden md:block md:mx-6 bg-no-repeat bg-cover h-screen overflow-auto">
        <TabWrapper
          tabs={tabPanels}
          value={tab}
          defaultTab="chat"
          itemClass="dark-scrollbar md:mb-[76px] md:min-h-screen"
        />
      </div>
    </>
  );
}

Support.getLayout = (page) => (
  <CommonLayout>{page}</CommonLayout>
);
export default Support;
