import React from "react";
import { Tab, TabWrapper } from "ui/tab";
import AddCoHost from "components/templates/account/addCohost";
import Offers from "components/templates/account/offers";
import GiftCard from "components/templates/account/giftCard";
import Profile from "components/templates/account/profile";
import Referral from "components/templates/account/referral";
import Social from "components/templates/account/social";
import Taxes from "components/templates/account/taxes";
import Tools from "components/templates/account/tools";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import Image from "next/image";
import Filter from "ui/filterGroup/filter";
import Sort from "ui/filterGroup/sort";
import { useAccountsTabSelector } from "store/selectors/accounts";
import { updateTab } from "store/slices/accounts";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import { updateRegions } from "store/slices/listing/regions";
// import { updateCountry } from "store/slices/listing/countries";
// import getCountries from "services/listing/getCountries";
// import getRegions from "services/listing/getRegions";
// import { wrapper } from "store/index";
import Link from "next/link";
import MessageIcon from "assets/icons/message.svg";
import Select from "ui/input/select";
import Avatar from "ui/avatar";
import Divider from "ui/divider";
import CommonLayout from '../../../layouts'

// import { validateServerAccessToken } from "utils/common";

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     await validateServerAccessToken(store, ctx);
//     const [regions, countries] = await Promise.all([
//       getRegions(ctx),
//       getCountries(ctx),
//     ]);
//     store.dispatch(updateRegions(regions));
//     store.dispatch(updateCountry(countries));
//     return { props: {} };
//   }
// );

function Account() {
  const dispatch = useDispatch();
  const tab = useAccountsTabSelector();
  const router = useRouter();

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
      key: "Add co-host",
      value: "co-host",
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
      value: "co-host",
      component: <AddCoHost />,
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

  const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

  const localStorageLoader = ({ src, width, quality }) => {
    return `${localStoragePath}${src}?q=${quality || 100}`;
  };

  
  const handleAvatarOptionSelect = (option) => {
    switch (option) {
      case "Switch to Customer":
        handleSwitch();
        break;

      case "Sign Out":
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        try {
          document.cookie.split(";").forEach(function (c) {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/"
              );
          });
          window.location.href = `/signin`;
        } catch (error) {}
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/signin`);
        break;

      default:
        break;
    }
    // setSelectedAvatarOption(option);
    // setIsAvatarOpen(false);
  };

  React.useEffect(() => {
    if (router.query.tab) {
      const isValidTab = tabList.find(
        (item) => item.value === router.query.tab
      );
      if (isValidTab) {
        dispatch(updateTab(isValidTab.value));
      }
    }
  }, [router.query.tab]);

  return (
    <>
      <div className="mx-10 md:mx-6 mb-[80px] md:hidden">
        <div className="sticky md:static top-0 pt-10 md:pt-0 bg-white flex flex-col gap-3 appBar__index shadow-[10px_0_0_0_white,-12px_0_0_0_white] md:bg-transparent md:shadow-none ">
          <DesktopAppBar
            containerClass="overflow-visible"
            title={""}
            action={
              <div className="flex items-center gap-7 lg:gap-5">
                <button>
                  <Image
                    loader={localStorageLoader}
                    width="10"
                    height="10"
                    className="w-[34px] h-[34px] lg:w-[24px] lg:h-[24px] "
                    src={"/assets/images/currency.png"}
                    alt="currency-icon"
                  />
                </button>
                <Link href="/accounts/chat">
                  <Image
                    src={MessageIcon}
                    alt="message-icon"
                    className="w-[34px] h-[34px] lg:w-[24px] lg:h-[24px] "
                  />
                </Link>

                {/* notifications */}
                <Select
                  buttonContent={
                    <Image
                      loader={localStorageLoader}
                      width="30"
                      height="30"
                      src={"/assets/images/notificationicondashboard.png"}
                      alt="notification-icon"
                      className="w-[34px] h-[34px] lg:w-[24px] lg:h-[24px] "
                    />
                  }
                  options={[
                    {
                      key: (
                        <div className="flex items-center gap-2">
                          <Image
                            className="w-5 h-5"
                            loader={localStorageLoader}
                            width="30"
                            height="30"
                            src={"/assets/images/notification-msg-property.png"}
                            alt="notification"
                          />
                          <div>Booking Request with Emile...</div>
                          <div className="text-primary mr-2">&#x2022;</div>
                        </div>
                      ),
                      value: "msg",
                    },
                    {
                      key: (
                        <div className="flex items-center p-2.5 gap-2">
                          <Image
                            className="w-5 h-5"
                            loader={localStorageLoader}
                            width="30"
                            height="30"
                            src={"/assets/images/language.png"}
                            alt="language"
                          />
                          <div className="text-base font-normal">Language</div>
                        </div>
                      ),
                      value: "Language",
                    },
                    {
                      key: (
                        <div className="flex items-center p-2.5 gap-2">
                          <Image
                            className="w-5 h-5"
                            loader={localStorageLoader}
                            width="30"
                            height="30"
                            src={"/assets/images/questionhelp.png"}
                            alt="refer"
                          />
                          <div>Refer a Host</div>
                        </div>
                      ),
                      value: "Refer a Host",
                    },
                  ]}
                  listPaperClass="min-w-[310px] rounded-2xl overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
                  containerClass="static"
                />

                {/* profile */}
                <Select
                  onChange={handleAvatarOptionSelect}
                  buttonContent={<Avatar url="" containerClass="lg:w-[26px]" />}
                  optionsClass="mx-2 rounded my-2"
                  listPaperClass=" min-w-[250px] rounded-[16px] bg-white shadow-2xl right-0 whitespace-nowrap"
                  containerClass="static"
                  options={[
                    {
                      key: (
                        <div className="flex items-center gap-2">
                          <Image
                            className="w-5 h-5"
                            loader={localStorageLoader}
                            width="30"
                            height="30"
                            src={"/assets/images/Accountsettings.png"}
                            alt="account"
                          />
                          <div>Account Settings</div>
                        </div>
                      ),
                      value: "Account Settings",
                    },
                    {
                      key: (
                        <div className="flex items-center gap-2">
                          <Image
                            className="w-5 h-5"
                            loader={localStorageLoader}
                            width="30"
                            height="30"
                            src={"/assets/images/customermode.png"}
                            alt="customer-switch"
                          />
                          <p>Switch to Customer</p>
                        </div>
                      ),
                      value: "Switch to Customer",
                    },
                    {
                      key: (
                        <div className="flex items-center  gap-2">
                          <Image
                            className="w-5 h-5"
                            loader={localStorageLoader}
                            width="30"
                            height="30"
                            src={"/assets/images/language.png"}
                            alt="language"
                          />
                          <div className="text-base font-normal">Language</div>
                        </div>
                      ),
                      value: "Language",
                    },
                    {
                      key: (
                        <div>
                          <div className="flex items-center gap-2">
                            <Image
                              loader={localStorageLoader}
                              width="30"
                              height="30"
                              className="w-5 h-5"
                              src={"/assets/images/questionhelp.png"}
                              alt="refer"
                            />
                            <div>Refer a Host</div>
                          </div>
                          <div>
                            <Divider />{" "}
                          </div>
                        </div>
                      ),
                      value: "Refer a Host",
                    },
                    {
                      key: (
                        <div className="flex items-center gap-2">
                          <Image
                            className="w-5 h-5"
                            loader={localStorageLoader}
                            width="30"
                            height="30"
                            src={"/assets/images/sign out.png"}
                            alt="sign-out"
                          />
                          <div>Sign Out</div>
                        </div>
                      ),
                      value: "Sign Out",
                    },
                  ]}
                />

                <button
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/create-listing`
                    )
                  }
                  className="min-w-[145px] min-h-[46px] px-3 py-2.5 rounded-full border border-solid border-[#CD264F]"
                >
                  Host your place
                </button>
              </div>
            }
          />

          {/* </div> */}
          <div className="relative overflow-auto w-[100%]  h-[50px]">
            <div className="absolute w-[100%]">
              <Tab
                items={tabList}
                defaultTab="profile"
                sticky
                onChange={(value) => dispatch(updateTab(value))}
                value={tab}
                flexProps={{
                  className: "flex justify-between gap-8",
                }}
                containerClass=" md:hidden"
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
      <div className="hidden md:block bg-no-repeat bg-cover h-screen overflow-auto">
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
Account.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;

export default Account;
