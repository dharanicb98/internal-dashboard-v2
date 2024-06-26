import Image from "next/image";
import HKLogo from "assets/images/hk-icon-text-black.svg";
import SearchIcon from "assets/icons/search-1.svg";
import FilterIcon from "assets/icons/filter-2.svg";
import EditPencilIcon from "assets/icons/edit-pencil.svg";
import ProfileBanner from "assets/images/profile-banner.svg";
import AccountsTab from "./account";
import ListingsTab from "./listings";
import PaymentsTab from "./payments";
import ReservationsTab from "./reservations";
import SupportTab from "./support";
import { Tab, TabWrapper } from "ui/tab";
import React from "react";
import EditProfileTab from "./editProfile";

function MobileProfile({userData, showLoader, handleFileChange, handleSave, handleOnChangeInput}) {
  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const [tab, setTab] = React.useState("accounts");

  const tabList = [
    {
      key: "Account",
      value: "accounts",
    },
    {
      key: "Listings",
      value: "listings",
    },
    {
      key: "Payments & Payouts",
      value: "payments",
    },
    {
      key: "Reservations",
      value: "reservations",
    },
    {
      key: "Support",
      value: "support",
    },
  ];

  const tabPanels = [
    {
      value: "accounts",
      component: <AccountsTab />,
    },
    {
      value: "listings",
      component: <ListingsTab />,
    },
    {
      value: "payments",
      component: <PaymentsTab />,
    },
    {
      value: "reservations",
      component: <ReservationsTab />,
    },
    {
      value: "support",
      component: <SupportTab />,
    },
  ];

  return showEditProfile ? (
    <EditProfileTab showEditProfile={setShowEditProfile} handleOnChangeInput={handleOnChangeInput} handleSave={handleSave}  userData={userData} showLoader={showLoader} handleFileChange={handleFileChange} />
  ) : (
    <>
      <div className="flex items-center justify-between">
        <Image src={HKLogo} alt="logo" width={121} height={32} />
        <div className="flex gap-4 ">
          <Image src={SearchIcon} alt="search" />
          <Image src={FilterIcon} alt="filter" />
        </div>
      </div>
      <p className="text-1xl font-medium mt-10 w-1/2">
        Welcome Back {userData?.fname} {userData?.lname}..
      </p>
      <div className="flex gap-2 mt-2 items-center">
        <p className="text-grey-dark font-light">{userData?.email}</p>
        <div
          className="flex gap-1.5 items-center"
          onClick={() => setShowEditProfile(true)}
        >
          <p className="text-primary text-xs ">Edit profile</p>
          <Image src={EditPencilIcon} alt="edit" />
        </div>
      </div>
      <Image
        src={ProfileBanner}
        alt="profile-banner"
        className="cursor-pointer mt-9 w-full"
      />
      <Tab
        items={tabList}
        defaultTab="profile"
        sticky
        onChange={(value) => setTab(value)}
        value={tab}
        flexProps={{
          className: "flex justify-between gap-8 overflow-auto",
        }}
        containerClass="overflow-auto mt-8"
        buttonClass="whitespace-nowrap "
      />
      <TabWrapper
        tabs={tabPanels}
        value={tab}
        defaultTab={"account"}
        itemClass="my-6 dark-scrollbar md:mb-[76px]"
      />
    </>
  );
}

export default MobileProfile;
