import Image from "next/image";
import Avatar from "ui/avatar";
import MessageIcon from "assets/icons/message.svg";
import AccountSettingsIcon from "assets/images/Accountsettings.png";
import CustomerIcon from "assets/images/customermode.png";
import LanguageIcon from "assets/images/language.png";
import ReferIcon from "assets/images/questionhelp.png";
import SignOutIcon from "assets/images/sign out.png";
import Select from "ui/input/select";
import Divider from "ui/divider";
import { OutlinedButton } from "ui/buttons";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import CurrencyImage from "assets/images/currency.png";
import NotificationIcon from "assets/images/notificationicondashboard.png";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import NotificationPropertyImage from "assets/images/notification-msg-property.png";
import { useSelector } from "react-redux";

export default function DefaultAction({ path }) {
  const router = useRouter();
  const isUserHost = useSelector((s) => s.user?.details?.isHost);

  const avtarOptions = [
    {
      name: "Account Settings",
      icon: AccountSettingsIcon,
      value: "account-setting",
    },
    { name: "Switch to customer", icon: CustomerIcon, value: "switch-to-host" },
    { name: "Language", icon: LanguageIcon, value: "language" },
    { name: "Refer to host", icon: ReferIcon, value: "refer-to-host" },
    { name: "Sign Out", icon: SignOutIcon, value: "sign-out" },
  ];

  function handleSwitch(option) {
    console.log("called",option);
    //make call to update current_role and navigate
    if (option === "Switch to Customer") {
      router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}`);
    } 
    else {
      router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}`);
    }
  }

  const handleAvatarOptionSelect = (option) => {
    switch (option) {
      case "Switch to Customer":
        handleSwitch(option);
        break;
      case "Switch to Host":
        handleSwitch(option);

      default:
        break;
    }
    // setSelectedAvatarOption(option);
    // setIsAvatarOpen(false);
  };

  const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

  const localStorageLoader = ({ src, width, quality }) => {
    return `${localStoragePath}${src}?q=${quality || 100}`;
  };
  const dashboardOrCustomerDash = !!path
    ? {
        key: (
          <div className="flex items-center gap-2">
            <Image
              className="w-5 h-5"
              loader={localStorageLoader}
              width="30"
              height="30"
              src={"/assets/images/customermode.png"}
              alt="host-switch"
            />
            <p>Switch to Host</p>
          </div>
        ),
        value: "Switch to Host",
      }
    : {
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
      };

  return (
    <>
      {/* <div className={`text-black text-[32px] ellipsis w-full`}>{title}</div> */}
      <div className="md:hidden flex-shrink-0">
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
          {!!path ? (
            <Link href="/accounts/chat">
              <Image
                src={MessageIcon}
                alt="message-icon"
                className="w-[38px] h-[38px] lg:w-[26px] lg:h-[26px]"
              />
            </Link>
          ) : (
            <Link href="/accounts/chat">
              <Image
                src={MessageIcon}
                alt="message-icon"
                className="w-[38px] h-[38px] lg:w-[26px] lg:h-[26px]"
              />
            </Link>
          )}

          {/* notifications */}
          <Select
            buttonContent={
              <Image
                loader={localStorageLoader}
                width="30"
                height="30"
                src={"/assets/images/notificationicondashboard.png"}
                alt="notification-icon"
                className="w-[34px] h-[34px] lg:w-[24px] lg:h-[24px]"
              />
            }
            options={[
              {
                key: (
                  <div className="flex items-center gap-2 py-2">
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
            listPaperClass="min-w-[310px] rounded-2xl overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap border-2"
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
              // {
              //   key: (
              //     <div className="flex items-center gap-2">
              //       <Image
              //         className="w-5 h-5"
              //         loader={localStorageLoader}
              //         width="30"
              //         height="30"
              //         src={"/assets/images/customermode.png"}
              //         alt="customer-switch"
              //       />
              //       <p>Switch to Customer</p>
              //     </div>
              //   ),
              //   value: "Switch to Customer",
              // },
              dashboardOrCustomerDash,
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
                      <Divider />
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
      </div>
    </>
  );

  //   return (
  //     <div className="flex-center gap-8 ">
  //       <Link href={isUserHost ? "/dashboard/chat" : "/customer-dashboard/chat"}>
  //         <Image src={MessageIcon} alt="message" />
  //       </Link>
  //       <Select
  //         onChange={handleAvatarOptionSelect}
  //         buttonContent={<Avatar url="" />}
  //         options={[
  //           {
  //             key: (
  //               <div className="flex items-center gap-2">
  //                 <Image
  //                   className="w-5 h-5"
  //                   src={AccountSettingsIcon}
  //                   // src={"/assets/images/Accountsettings.png"}
  //                   alt="account"
  //                   width="30"
  //                   height="30"
  //                 />

  //                 <div>Account Settings</div>
  //               </div>
  //             ),
  //             value: "Account Settings",
  //           },
  //           {
  //             key: (
  //               <div className="flex items-center gap-2">
  //                 <Image
  //                   className="w-5 h-5"
  //                   src={CustomerIcon}
  //                   alt="customer-switch"
  //                 />
  //                 <p>Switch to Customer</p>
  //               </div>
  //             ),
  //             value: "Switch to Customer",
  //           },
  //           {
  //             key: (
  //               <div className="flex items-center  gap-2">
  //                 <Image className="w-5 h-5" src={LanguageIcon} alt="language" />

  //                 <div className="text-base font-normal">Language</div>
  //               </div>
  //             ),
  //             value: "Language",
  //           },
  //           {
  //             key: (
  //               <div>
  //                 <div className="flex items-center gap-2">
  //                   <Image className="w-5 h-5" src={ReferIcon} alt="refer" />
  //                   <div>Refer a Host</div>
  //                 </div>
  //                 <div>
  //                   <Divider />{" "}
  //                 </div>
  //               </div>
  //             ),
  //             value: "Refer a Host",
  //           },
  //           {
  //             key: (
  //               <div className="flex items-center gap-2">
  //                 <Image className="w-5 h-5" src={SignOutIcon} alt="sign-out" />
  //                 <div>Sign Out</div>
  //               </div>
  //             ),
  //             value: "Sign Out",
  //           },
  //         ]}
  //         // options={[
  //         //   {
  //         //     key: (
  //         //       <div className="flex items-center gap-2">
  //         //         <Image
  //         //           className="w-5 h-5"
  //         //           loader={localStorageLoader}
  //         //           width="30"
  //         //           height="30"
  //         //           src={"/assets/images/Accountsettings.png"}
  //         //           alt="account"
  //         //         />
  //         //         <div>Account Settings</div>
  //         //       </div>
  //         //     ),
  //         //     value: "Account Settings",
  //         //   },
  //         //   {
  //         //     key: (
  //         //       <div className="flex items-center gap-2">
  //         //         <Image
  //         //           className="w-5 h-5"
  //         //           loader={localStorageLoader}
  //         //           width="30"
  //         //           height="30"
  //         //           src={"/assets/images/customermode.png"}
  //         //           alt="customer-switch"
  //         //         />
  //         //         <p>Switch to Customer</p>
  //         //       </div>
  //         //     ),
  //         //     value: "Switch to Customer",
  //         //   },
  //         //   {
  //         //     key: (
  //         //       <div className="flex items-center  gap-2">
  //         //         <Image
  //         //           className="w-5 h-5"
  //         //           loader={localStorageLoader}
  //         //           width="30"
  //         //           height="30"
  //         //           src={"/assets/images/language.png"}
  //         //           alt="language"
  //         //         />
  //         //         <div className="text-base font-normal">Language</div>
  //         //       </div>
  //         //     ),
  //         //     value: "Language",
  //         //   },
  //         //   {
  //         //     key: (
  //         //       <div>
  //         //         <div className="flex items-center gap-2">
  //         //           <Image
  //         //             loader={localStorageLoader}
  //         //             width="30"
  //         //             height="30"
  //         //             className="w-5 h-5"
  //         //             src={"/assets/images/questionhelp.png"}
  //         //             alt="refer"
  //         //           />
  //         //           <div>Refer a Host</div>
  //         //         </div>
  //         //         <div>
  //         //           <Divider />{" "}
  //         //         </div>
  //         //       </div>
  //         //     ),
  //         //     value: "Refer a Host",
  //         //   },
  //         //   {
  //         //     key: (
  //         //       <div className="flex items-center gap-2">
  //         //         <Image
  //         //           className="w-5 h-5"
  //         //           loader={localStorageLoader}
  //         //           width="30"
  //         //           height="30"
  //         //           src={"/assets/images/sign out.png"}
  //         //           alt="sign-out"
  //         //         />
  //         //         <div>Sign Out</div>
  //         //       </div>
  //         //     ),
  //         //     value: "Sign Out",
  //         //   },
  //         // ]}
  //         listPaperClass=" min-w-[250px] rounded-2xl overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
  //         containerClass="static"
  //       />
  //       {/* <Avatar url="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" /> */}
  //       <OutlinedButton
  //         text="Host your place"
  //         onClick={() =>
  //           router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}create-listing`)
  //         }
  //       />
  //     </div>
  //   );
}
