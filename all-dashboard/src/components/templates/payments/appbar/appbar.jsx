import React, { useState } from "react";
import Image from "next/image";
import CurrencyImage from "assets/images/currency.png";
import MessageIcon from "assets/icons/message.svg";
import NotificationIcon from "assets/images/notificationicondashboard.png";
import Avatar from "ui/avatar";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import AccountSettingsIcon from "assets/images/Accountsettings.png";
import CustomerIcon from "assets/images/customermode.png";
import LanguageIcon from "assets/images/language.png";
import ReferIcon from "assets/images/questionhelp.png";
import SignOutIcon from "assets/images/sign out.png";
import { useRouter } from "next/router";
import Select from "ui/input/select";
import NotificationPropertyImage from "assets/images/notification-msg-property.png";
import Link from "next/link";
import Divider from "ui/divider";

const PaymentAppBar = () => {
  const detailsHandler = (type) => {
    switch (type) {
      case "call":
        console.log("call");
        break;
      case "message":
        console.log("message");
        break;
      case "cancel":
        console.log("cancel");
        break;
      default:
        console.log("details");
        setShowDetailsDialog(true);
        break;
    }
  };

  const router = useRouter();

  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [selectedAvatarOption, setSelectedAvatarOption] = useState(null);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedNotificationOption, setSelectedNotificationOption] =
    useState(null);

  const Notificationsoptions = [
    {
      label: "Booking Request from Emile....",
    },
    {
      label: "Language",
      icon: LanguageIcon,
    },
    {
      label: "Refer a Host",
      icon: ReferIcon,
    },
  ];

  const Avataroptions = [
    {
      label: "Account Settings",
      icon: AccountSettingsIcon,
    },
    {
      label: "Switch to Customer",
      icon: CustomerIcon,
    },
    {
      label: "Language",
      icon: LanguageIcon,
    },
    {
      label: "Refer a Host",
      icon: ReferIcon,
    },
    {
      label: "Sign Out",
      icon: SignOutIcon,
    },
  ];

  const handleAvatarOptionSelect = (option) => {
    setSelectedAvatarOption(option);
    setIsAvatarOpen(false);
  };

  const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

  const localStorageLoader = ({ src, width, quality }) => {
    return `${localStoragePath}${src}?q=${quality || 100}`;
  };

  const handleNotificationOptionSelect = (option) => {
    setSelectedNotificationOption(option);
    setIsNotificationOpen(false);
  };

  return (
    <div className="mt-12">
      <DesktopAppBar
        containerClass="overflow-visible"
        title={"Payments and Payouts"}
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
  );
};

export default PaymentAppBar;


 <DesktopAppBar
   containerClass="overflow-visible"
   // containerClass='overflow-initial'
   title={
     <div className="text-[32px] lg:text-[26px] font-normal">
       Payments and Payouts
     </div>
   }
   action={
     <div className="flex items-center gap-6">
       <button>
         <Image
           className="w-[34px] h-[34px] lg:w-[24px] lg:h-[24px]"
           src={CurrencyImage}
           alt="currency-icon"
         />
       </button>
       <button className="w-[34px] h-[34px] lg:w-[24px] lg:h-[24px]">
         <Image src={MessageIcon} alt="message-icon" />
       </button>
       {/* <button className="relative" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                <Image src={NotificationIcon} alt="notification-icon" />
              </button> */}
       <Select
         buttonContent={
           <Image
             src={NotificationIcon}
             alt="notification-icon"
             className="w-[34px] h-[34px] lg:w-[24px] lg:h-[24px]"
           />
         }
         options={[
           {
             key: (
               <div className="flex items-center gap-2">
                 <Image
                   className="w-[20px] h-[20px] ]"
                   src={NotificationPropertyImage}
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
                 <Image className="w-[20px] h-[20px]" src={LanguageIcon} />

                 <div className="text-base font-normal">Language</div>
               </div>
             ),
             value: "Language",
           },
           {
             key: (
               <div className="flex items-center p-2.5 gap-2">
                 <Image className="w-[20px] h-[20px]" src={ReferIcon} />

                 <div>Refer a Host</div>
               </div>
             ),
             value: "Refer a Host",
           },
         ]}
         listPaperClass="overflow-y-auto bg-white shadow-2xl right-0 whitespace-nowrap"
         containerClass="static"
       />

       {/* {isNotificationOpen && (
              <ul
                className="dropdown-options"
                style={{ backgroundColor: "white", position: "absolute" }}
              >
                {Notificationsoptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleNotificationOptionSelect(option.label)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src={option.icon}
                      alt={option.label}
                      className="w-[24px] h-[24px]"
                    />
                    <span style={{ marginLeft: "10px" }}>{option.label}</span>
                  </li>
                ))}
              </ul>
            )} */}

       <Select
         buttonContent={<Avatar url="" containerClass="lg:w-[26px]" />}
         options={[
           {
             key: (
               <div className="flex items-center gap-2">
                 <Image
                   className="w-[20px] h-[20px]"
                   src={AccountSettingsIcon}
                 />

                 <div>Account Settings</div>
               </div>
             ),
             value: "Account Settings",
           },
           {
             key: (
               <div className="flex items-center gap-2">
                 <Image className="w-[20px] h-[20px]" src={CustomerIcon} />
                 <p>Switch to Customer</p>
               </div>
             ),
             value: "Switch to Customer",
           },
           {
             key: (
               <div className="flex items-center p-2.5 gap-2">
                 <Image className="w-[20px] h-[20px]" src={LanguageIcon} />

                 <div className="text-base font-normal">Language</div>
               </div>
             ),
             value: "Language",
           },
           {
             key: (
               <div>
                 <div className="flex items-center p-2.5 gap-2">
                   <Image className="w-[20px] h-[20px]" src={ReferIcon} />
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
                 <Image className="w-[20px] h-[20px]" src={SignOutIcon} />
                 <div>Sign Out</div>
               </div>
             ),
             value: "Sign Out",
           },
         ]}
         listPaperClass="bg-white shadow-2xl right-0 whitespace-nowrap"
         containerClass="static"
       />
       {/* <button
                className="relative"
                onClick={() => setIsAvatarOpen(!isAvatarOpen)}
              >
                <Avatar url="" />
              </button> */}

       {/* {isAvatarOpen && (
              <ul
                className="dropdown-options"
                style={{ backgroundColor: "white", position: "absolute" }}
              >
                {Avataroptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleAvatarOptionSelect(option.label)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src={option.icon}
                      alt={option.label}
                      className="w-[24px] h-[24px]"
                    />
                    <span style={{ marginLeft: "10px" }}>{option.label}</span>
                  </li>
                ))}
              </ul>
            )} */}
       {/* <div> */}
       <button
         onClick={() =>
           router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/create-listing`)
         }
         className="min-w-[145px] min-h-[46px] px-3 py-2.5 rounded-full border border-solid border-[#CD264F]"
       >
         Host your place
       </button>
       {/* </div> */}
     </div>
   }
 />; 