import React, { useState, useEffect } from "react";
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
import Divider from "ui/divider";
import axios from "axios";
import Link from "next/link";

const HostAppBar = () => {

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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedNotificationOption, setSelectedNotificationOption]= useState(null);
  const [userDetails, setUserDetails] = useState()

  const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

const localStorageLoader = ({src, width,quality}) => {
  return `${localStoragePath}${src}?q=${quality || 100}`;
 }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userDetail = JSON.parse(token)
    setUserDetails(userDetail)
  }, [])

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
    switch (option) {
      case 'Switch to Customer':
        handleSwitch()
        break

      case 'Sign Out':
        localStorage.removeItem('token')
        localStorage.removeItem('accessToken')
        try {
          document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
          window.location.href = `/signin`;
        } catch (error) {}
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/signin`)
        break

      default:
        break
    }
    // setSelectedAvatarOption(option);
    // setIsAvatarOpen(false);
  };

  const handleNotificationOptionSelect = (option) => {
    setSelectedNotificationOption(option);
    setIsNotificationOpen(false);
  };

  async function handleSwitch() {
    try {
      //we will store id some where in token or localstorge when we will get id then change the role
      let response = await axios.put('https://rentmyhotel.com/api/v2/user/'+ userDetails.user_id, {user_role:1})
      if (response.status === 200) {
          router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/`)
      }
      else {
         alert('switch failed')
      }
      
    }
    catch ( e ) {
      console.log(e)
    }
  }

  return (
    <div>
      <DesktopAppBar
        path="customer-dashboard"
        containerClass="overflow-visible"
        title={<h6>Welcome back {userDetails?.fname} {userDetails?.lname}</h6>}
        action={
          <div className="flex items-center gap-7">
            <button><Image loader={localStorageLoader}  className="w-[34px] h-[34px]" width="38" height="30" src={'/assets/images/currency.png'} alt="currency-icon"/></button>
            <Link href="/accounts/chat"><Image loader={localStorageLoader} src={'/assets/icons/message.svg'} width="30" height="30" alt="message-icon" /></Link>
            {/* notifications */}
            <Select buttonContent={<Image loader={localStorageLoader} src={'/assets/images/notificationicondashboard.png'} width="26" height="25" alt="notification-icon" />}
              options={[
                {
                  key: (
                    <div className="flex items-center gap-2">
                      <Image loader={localStorageLoader} width="20" height='20' src={'/assets/images/notification-msg-property.png'} alt="notification"/>
                      <div>Booking Request with Emile...</div>
                      <div className="text-primary mr-2">&#x2022;</div>
                    </div>
                  ),
                  value: "msg",
                },
                {
                  key: (
                    <div className="flex items-center p-2.5 gap-2">
                      <Image loader={localStorageLoader} width="20" height='20' src={'/assets/images/language.png'} alt="language"/>
                      <div className="text-base font-normal">Language</div>
                    </div>
                  ),
                  value: "Language",
                },
                {
                  key: (
                    <div className="flex items-center p-2.5 gap-2">
                      <Image loader={localStorageLoader} width="20" height='20' src={'/assets/images/questionhelp.png'} alt="refer" />
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
              buttonContent={<Avatar url=""/>}
              containerClass="static"
              optionsClass='mx-2 rounded my-2'
              listPaperClass=" min-w-[250px] rounded-[16px] bg-white shadow-2xl right-0 whitespace-nowrap"
              options={[
                {
                  key: (
                    <div className="flex items-center gap-2">
                      <Image className="w-5 h-5" src={AccountSettingsIcon} alt="account"/>
                      <div>Account Settings</div>
                    </div>
                  ),
                  value: "Account Settings",
                },
                {
                  key: (
                    <div className="flex items-center gap-2">
                      <Image className="w-5 h-5" src={CustomerIcon} alt="customer-switch"/>
                      <p>Switch to Host</p>
                    </div>
                  ),
                  value: "Switch to Customer",
                },
                {
                  key: (
                    <div className="flex items-center  gap-2">
                      <Image className="w-5 h-5" src={LanguageIcon} alt="language"/>
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
                          className="w-5 h-5"
                          src={ReferIcon}
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
                      <Image className="w-5 h-5" src={SignOutIcon} alt="sign-out"/>
                      <div>Sign Out</div>
                    </div>
                  ),
                  value: "Sign Out",
                },
              ]}
            />

            <button onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/create-listing`)} className="min-w-[145px] min-h-[46px] px-3 py-2.5 rounded-full border border-solid border-[#CD264F]">
              Host your place
            </button>
          </div>
        }
      />
    </div>
  );
};

export default HostAppBar;
