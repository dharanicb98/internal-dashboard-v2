import React from "react";
import Vendors from "components/templates/channel-manager/vendors";
import VendorConfiguration from "components/templates/channel-manager/vendorConfiguration";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import Link from "next/link";
import MessageIcon from "assets/icons/message.svg";
import Select from "ui/input/select";
import Avatar from "ui/avatar";
import Divider from "ui/divider";
import Image from "next/image";
import CommonLayout from "../../../components/layouts";


export default function ChannelManager() {
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

  return (
    <div className="mx-10 h-full flex flex-col max-h-screen overflow-hidden md:mx-0">
      <div className="sticky top-0 pt-10 bg-white flex-col gap-3 appBar__index md:bg-transparent md:static">
        <DesktopAppBar
          containerClass="overflow-visible"
          title={"Channel Manager"}
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
      </div>

      <div className="flex mb-10 overflow-hidden h-full md:mb-0 md:w-full">
        <Vendors />
        <VendorConfiguration />
      </div>
    </div>
  );
}

ChannelManager.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
