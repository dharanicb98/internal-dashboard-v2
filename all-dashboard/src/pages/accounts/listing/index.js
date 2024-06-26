import PropertyList from "components/templates/listing/list";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import FilterGroup from "ui/filterGroup";
import SearchInput from "ui/search";
import { Tab, TabWrapper } from "ui/tab";
import { TabProp } from "ui/tab/tab";
import React, { useState, useEffect } from "react";
import MobileAppBarBottom from "ui/appbar/mobileAppbarBottom";
import MobileTab from "ui/tab/mobileTab";
import { useRouter } from "next/router";
import getAllListings from "services/listing/getAllListing";
import Image from "next/image";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import SortIcon from "assets/icons/sort.svg";
import Axios from "utils/axios";
import Link from "next/link";
import MessageIcon from "assets/icons/message.svg";
import Select from "ui/input/select";
import Avatar from "ui/avatar";
import Divider from "ui/divider";
import CommonLayout from "../../../components/layouts";

// export const getServerSideProps = async () => {
//   const data = await getAllListings();
//   return {
//     props: {
//       data: data?.data,
//       count: data?.pageDetails?.totalcount
//     },
//   };
// };

const FilterGroupWrapper = ({onChange}) => {
  return (
    <div className="flex items center gap-5">
      <div>
        <SearchInput onChange={onChange} />
      </div>
      {/* <div className="flex items-center gap-2">
        <FilterGroup />
      </div> */}
    </div>
  );
};

export default function Listing(props) {
  const [tab, setTab] = React.useState("listed");
  const [listedProperties, setListingData] = useState([]);
  const [unlistedProperties, setUnListedProperties] = useState([]);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const [allData, setData] = useState();

  const [listedCount, setListedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0)
  

  const tabList = [
    {
      key: `Listed (${listedCount})`,
      value: "listed",
    },
    {
      key: `Unlisted (${draftCount})`,
      value: "unlisted",
    },
    {
      key: `Pending (${pendingCount})`,
      value: "pending",
    },
    {
      key: <FilterGroupWrapper onChange={handleOnChange} />,
      value: "filter-group",
      isElement: true,
      listProps: {
        className: "mr-2 p-4 ml-auto",
      },
    },
  ];
  // const listedProperties = listingData?.filter((item) => item.state === "publish");

  // const unlistedProperties = listingData?.filter( (item) => item.state === "draft");

  // const pendingProperties = listingData?.filter( (item) => item.state === "pending");

  // const listedProperties = listingData

  const pendingProperties = [];

  const tabPanels = [
    {
      value: `listed`,
      component: <PropertyList data={listedProperties} />,
    },
    {
      value: "unlisted",
      component: <PropertyList data={unlistedProperties} />,
    },
    {
      value: "pending",
      component: <PropertyList data={pendingProperties} />,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const userData = localStorage.getItem("token");
        const parseData = JSON.parse(userData);
        const response = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/listing/host/${parseData?.user_id}`,{ withCredentials: true });

        //response
        let data = response.data.result;
        setData( data )
        setCount(response?.data?.result?.length);

        //publish
        let publish = data?.filter((item) => item.status === "publish")
        setListedCount(publish?.length)
        setListingData(publish);

        //draft filter
        let draft = data?.filter((item) => item.status === "draft")
        setDraftCount(draft?.length)
        setUnListedProperties(draft);
      } 
      catch (e) {
        console.log(e);
      }
    })();
  }, []);

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


   function handleOnChange( value )  {
      let searchValue = value.toLowerCase();
      
      if ( tab === 'listed' ) {
        const search = allData?.filter((item ) =>   item.title.toLowerCase().includes(searchValue) && item.status === 'publish');
        setListingData(search)
      }
      else if ( tab === 'unlisted' ) {
        const search = allData?.filter((item ) =>   item.title.toLowerCase().includes(searchValue) && item.status === 'draft');
        setUnListedProperties(search)
      }
   }


  return (
    <div className="dark-scrollbar mb-[80px] md:mx-0 md:px-6 md:min-h-screen md:ml-5 md:mr-5 md-m:ml-10 md-m:mr-10">
      <div className="sticky top-0 pt-10 bg-white flex-col gap-3 appBar__index md:bg-transparent md:static">
        <DesktopAppBar
          title={
            <div className="w-full">
              <div className="hidden md:block">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-5 items-center">
                    <Image
                      src={ChevronLeftIcon}
                      alt="back"
                      width={8}
                      height={14}
                    />
                    <p className="text-xl">Listings</p>
                  </div>
                  <button
                    onClick={() => {
                      router.push(
                        `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/create-listing`
                      );
                    }}
                    className="rounded-full border border-grey bg-white px-[21px] py-[12px] text-sm"
                  >
                    New Listing +
                  </button>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p className="text-[28px] break-all whitespace-break-spaces">
                    You Have Total Of <b>{count} Listings</b>
                  </p>
                  <Image src={SortIcon} alt="back" width={24} height={24} />
                </div>
              </div>
              <p className="md:hidden truncate">
                You Have Total Of <b>{count} Listings</b>
              </p>
            </div>
          }
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
              <Link href="/dashboard/chat">
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
          containerClass="md:mb-6 w-full md:!static"
        />

        <Tab
          items={tabList}
          defaultTab="listed"
          sticky
          value={tab}
          onChange={(value) => setTab(value)}
          containerClass="md:hidden"
          flexProps={{ className: "flex gap-8 items-center" }}
        />

        <MobileTab
          items={tabList.slice(0, 3)}
          defaultTab="listed"
          sticky
          value={tab}
          onChange={(value) => setTab(value)}
          containerClass=""
        />
      </div>
      <TabWrapper
        tabs={tabPanels}
        value={tab}
        defaultTab="listed"
        itemClass="my-8"
      />
      <MobileAppBarBottom />
    </div>
  );
}

Listing.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
