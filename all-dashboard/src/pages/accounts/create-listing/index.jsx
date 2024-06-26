import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FilledButton } from "ui/buttons";
import { useCreateListingTabSelector } from "selectors/createListing";
import { Tab, TabWrapper } from "ui/tab";
import { useDispatch, useSelector } from "react-redux";
import { updateTab } from "slices/createListing";
import PropertyDetails from "components/templates/createListing/propertyDetails";
import PropertyType from "components/templates/createListing/propertyType";
import GuestAccommodation from "components/templates/createListing/guestAccommodation";
import Amenities from "components/templates/createListing/amenities";
import Location from "components/templates/createListing/location";
import Rules from "components/templates/createListing/rules";
import SetPrice from "components/templates/createListing/setPrice";
import Photos from "components/templates/createListing/photos";
import getAmenities from "services/listing/getAmenities";
import getRegions from "services/listing/getRegions";
import getDestinations from "services/listing/getDestinations";
import getRules from "services/listing/getRules";
import getCatagories from "services/listing/getCatagories";
import getAmenitiesGroup from "services/listing/getAmenitiesGroup";
import getCountries from "services/listing/getCountries";
import { wrapper } from "store/index";
import { getGeoLocation, getServerIP } from "services/getUserIP";
import { updateCoordinates } from "store/slices/location";
import { updateAmenities } from "store/slices/listing/amenities";
import { updateRules } from "store/slices/listing/rules";
import { updateCatagories } from "store/slices/listing/catagories";
import { updateRegions } from "store/slices/listing/regions";
import { updateDestinations } from "store/slices/listing/destinations";
import { updateCountry } from "store/slices/listing/countries";

import createListing from "services/listing/createListing";
import { useCreateListingDataSelector } from "selectors/createListing";
import { updateData } from "slices/createListing";
import Dialog from "ui/dialog";

import Tab0Image from "assets/images/tab-0.png";
import Tab1Image from "assets/images/tab-1.png";
import Tab2Image from "assets/images/tab-2.png";
import Tab3Image from "assets/images/tab-3.png";
import ChevronLeft from "assets/icons/chevron-left.svg";
import ArrowRight from "assets/icons/arrow-right.png";
import Axios from "utils/axios";
import { validateServerAccessToken } from "utils/common";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await validateServerAccessToken(store, ctx);
    const ip = getServerIP(ctx.req);
    const [
      location,
      amenities,
      rules,
      categories,
      amenitiesCategory,
      regions,
      destinations,
      countries,
    ] = await Promise.all([
      getGeoLocation(ip),
      getAmenities(ctx),
      getRules(ctx),
      getCatagories(ctx),
      getAmenitiesGroup(ctx),
      getRegions(ctx),
      getDestinations(ctx),
      getCountries(ctx),
    ]);
    store.dispatch(
      updateCoordinates({
        lat: +(location?.latitude || 0),
        lng: +(location?.longitude || 0),
      })
    );
    store.dispatch(updateAmenities({ amenities, amenitiesCategory }));
    store.dispatch(updateRules(rules));
    store.dispatch(updateCatagories(categories));
    store.dispatch(updateRegions(regions));
    store.dispatch(updateDestinations(destinations));
    store.dispatch(updateCountry(countries));
    return { props: {} };
  }
);

export default function CreateListing() {
  const router = useRouter();
  const listingData = useCreateListingDataSelector();
  const currentTab = useCreateListingTabSelector();
  const dispatch = useDispatch();
  const [showErrorPopup, setShowErrorPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // console.log("111111111111111111111111111111111", listingData, currentTab);
  // useEffect(() => {
  //   (async () => {
  //     const data =  await getCatagories()
  //     dispatch(updateCatagories(data));
  //   } )()
  // }, [])

  const createNewListing = async () => {
    try {
      if (listingData?.basic_pricing?.base_price <= 0) {
        setErrorMsg("base price should be greater than 0");
        setShowErrorPopUp((prev) => !prev);
        return;
      } else if (!listingData?.basic_pricing?.weekend_price) {
        setErrorMsg("Please enter weekend price");
        setShowErrorPopUp((prev) => !prev);
      } else if (!listingData?.basic_pricing?.security_deposit) {
        setErrorMsg("Please deposit greater than 0");
        setShowErrorPopUp((prev) => !prev);
      }

      const data = await Axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/listing/new`,
        listingData
      );
      if (data?.data?.statusCode === 200) {
        router.push(
          `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing?tab=unlisted`
        );
      }
    } catch (e) {
      console.log(e);
      setErrorMsg(e?.response?.data?.error?.message);
      setShowErrorPopUp((prev) => !prev);
    }
  };

  const saveHandler = async () => {
    try {
      const stringifyValues = JSON.stringify(listingData);
      window.localStorage.setItem("create-listing", stringifyValues);

      if (!listingData?.address?.country_id) {
        setErrorMsg("Please select Country");
        setShowErrorPopUp((prev) => !prev);
        dispatch(updateTab(1));
        return;
      } else if (!listingData?.address?.region) {
        setErrorMsg("Please select Region");
        setShowErrorPopUp((prev) => !prev);
        dispatch(updateTab(1));
        return;
      } else if (!listingData?.address?.destination) {
        setErrorMsg("Please select Region");
        setShowErrorPopUp((prev) => !prev);
        dispatch(updateTab(1));
        return;
      } else if (!listingData?.address?.house) {
        setErrorMsg("Please Mention House,Flat, bldg, etc.");
        setShowErrorPopUp((prev) => !prev);
        dispatch(updateTab(1));
        return;
      } else if (!listingData?.address?.street) {
        setErrorMsg("Please Mention Street address");
        setShowErrorPopUp((prev) => !prev);
        dispatch(updateTab(1));
        return;
      } else if (!listingData?.title) {
        setErrorMsg("Please enter Title");
        setShowErrorPopUp((prev) => !prev);
        dispatch(updateTab(2));
        return;
      } else if (!listingData?.description) {
        setErrorMsg("Please enter description");
        setShowErrorPopUp((prev) => !prev);
        dispatch(updateTab(2));
        return;
      }

      const data = await Axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/listing/new`,
        listingData
      );
      if (data?.data?.statusCode === 200) {
        router.push(
          `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing`
        );
      }
    } catch (e) {
      console.log(e);
      setErrorMsg(e?.response?.data?.error?.message);
      setShowErrorPopUp((prev) => !prev);
    } finally {
      // router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}dashboard`);
    }
  };

  const handleNextValidations = () => {
    switch (currentTab) {
      case 0:
        //categories
        if (listingData?.categories?.length === 0) {
          setErrorMsg("Please select category");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else {
          dispatch(updateTab(currentTab + 1));
          return;
        }
      case 1:
        if (!listingData?.address?.country_id) {
          setErrorMsg("Please select Country");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else if (!listingData?.address?.region) {
          setErrorMsg("Please select Region");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else if (!listingData?.address?.destination) {
          setErrorMsg("Please select Destination");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else if (!listingData?.address?.house) {
          setErrorMsg("Please Mention House,Flat, bldg, etc.");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else if (!listingData?.address?.street) {
          setErrorMsg("Please Mention Street address");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else {
          dispatch(updateTab(currentTab + 1));
          return;
        }
      case 2:
        if (!listingData?.title) {
          setErrorMsg("Please enter Title");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else if (!listingData?.description) {
          setErrorMsg("Please enter description");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else {
          dispatch(updateTab(currentTab + 1));
          return;
        }

      case 3:
        if (!listingData.is_instant_book) {
          setErrorMsg("Please Select the instant booking option");
          setShowErrorPopUp((prev) => !prev);
          return;
        } else if (listingData?.no_of_guests_max < 1) {
          setErrorMsg(
            `The maximum number of guests should be greater than  1. `
          );
          setShowErrorPopUp((prev) => !prev);
          return;
        }
        // else if (
        //   listingData?.extra_guests?.max_free > listingData?.max_free_guests
        // ) {
        //   setErrorMsg(
        //     `Max free guests should be less than ${listingData?.max_free_guests}`
        //   );
        //   setShowErrorPopUp((prev) => !prev);
        //   return;
        // }
        else if (listingData?.max_bookings_days < 1) {
          setErrorMsg("Booking days should be greater than 1");
          setShowErrorPopUp((prev) => !prev);
          return;
        }
        //  else if (listingData?.no_of_pets_allowed > 10) {
        //   setErrorMsg("Max pets should be less than 10");
        //   setShowErrorPopUp((prev) => !prev);
        //   return;
        // }
        else {
          dispatch(updateTab(currentTab + 1));
          return;
        }

      // case 5:
      //   if (!listingData?.custom_rule) {
      //     setErrorMsg("Please add the custom rules");
      //     setShowErrorPopUp((prev) => !prev);
      //     return;
      //   } else {
      //     return dispatch(updateTab(currentTab + 1));
      //   }

      case 6:
        if (listingData?.media.length > 0) {
          return dispatch(updateTab(currentTab + 1));
        } else {
          setErrorMsg("Please upload at least one image");
          setShowErrorPopUp((prev) => !prev);
          return;
        }

      default:
        dispatch(updateTab(currentTab + 1));
        break;
    }
  };

  const tabList = [
    {
      key: "Property Type",
      value: 0,
    },
    {
      key: "Location",
      value: 1,
    },
    {
      key: "Property Details",
      value: 2,
    },
    {
      key: "Guest Accommodation",
      value: 3,
    },
    {
      key: "Amenities",
      value: 4,
    },
    {
      key: "House Rules",
      value: 5,
    },
    {
      key: "Photos",
      value: 6,
    },
    {
      key: "Set price",
      value: 7,
    },
  ];

  const tabPanels = [
    {
      value: 0,
      component: <PropertyType />,
    },
    {
      value: 1,
      component: <Location />,
    },
    {
      value: 2,
      component: <PropertyDetails />,
    },
    {
      value: 3,
      component: <GuestAccommodation />,
    },
    {
      value: 4,
      component: <Amenities />,
    },
    {
      value: 5,
      component: <Rules />,
    },
    {
      value: 6,
      component: <Photos />,
    },
    {
      value: 7,
      component: <SetPrice />,
    },
  ];

  const images = [
    "images/tab-0.png",
    "images/tab-1.png",
    "images/tab-1.png",
    "images/tab-2.png",
    "images/tab-3.png",
    "images/tab-1.png",
    "images/tab-1.png",
    "images/tab-1.png",
  ];

  const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

  const localStorageLoader = ({ src, width, quality }) => {
    return `${localStoragePath}${src}?q=${quality || 100}`;
  };

  // React.useEffect(() => {
  //   try {
  //     const localContents = localStorage.getItem("create-listing");
  //     const parseContents = JSON.parse(localContents);
  //     if (parseContents) {
  //       dispatch(updateData(parseContents));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  // console.log('images-------------', ChevronLeft,ArrowRight, images,tabPanels,tabList )

  return (
    <div className="px-16 pt-12 md:pt-7  md-m:pb-3 h-screen overflow-auto md:px-6 max-w-[1535px]  ">
      <div className="flex items-center justify-between ">
        <div className="flex gap-6">
          <button
            className=""
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}`)
            }
          >
            <Image src={ChevronLeft} alt="back" />
          </button>
          <div className="text-black text-[32px] leading-9 md:leading-6 md:text-[20px] ellipsis w-full">
            Create Listing
          </div>
        </div>
        <FilledButton
          onClick={saveHandler}
          text="Save & exit"
          buttonClass="px-3 md:bg-white md:text-grey-dark md:border-grey-dark md:border w-[133px] h-[39px] text-[16px]"
        />
      </div>
      <div className="flex gap-3 justify-between mt-8 lg:justify-center ">
        <div className="max-w-[68%] lg:h-[634px] overflow-hidden lg:w-full lg:max-w-full ">
          <Tab
            items={tabList}
            defaultTab={0}
            sticky
            value={currentTab}
            onChange={() => {}}
            flexProps={{
              className: "flex gap-4 overflow-x-auto no-scrollbar",
            }}
            separator={
              <Image
                src={ArrowRight}
                alt="arrow"
                className="h-fit m-auto pb-3.5 last:hidden"
              />
            }
            selectedTabClass="border-primary"
            liClass="whitespace-nowrap text-lg md:text-[16px] leading-5"
            containerClass="top-0 bg-white"
          />
          <div className="flex w-full flex-col max-h-screen relative">
            <TabWrapper
              tabs={tabPanels}
              value={currentTab}
              defaultTab={0}
              itemClass="my-6 px-[18px] sm:px-[8px] sm:h-[500px]  overflow-y-auto dark-scrollbar md-m:min-h-[58vh] md-m:max-h-[58vh] md:mb-[76px]"
            />

            {/* <div className=" flex justify-between items-center mt-8 sticky bottom-0 bg-white p-6 md:fixed md:w-full">
            <button
              className={`border rounded-full border-grey-dark px-6 py-2.5 text-grey-600 font-medium ${
                currentTab < 1 ? "hidden" : ""
              }`}
              onClick={() => dispatch(updateTab(currentTab - 1))}
            >
              Back
            </button>
            <FilledButton
              text={currentTab > 6 ? "Publish" : "Next"}
              buttonClass={`px-6 py-2.5 md:ml-auto md:mr-5`}
              onClick={() => {
                if (currentTab <= 6) {
                  handleNextValidations();
                  // dispatch(updateTab(currentTab + 1));
                } else {
                  createNewListing();
                }
              }}
            />
          </div> */}

            <div className="flex justify-between items-center md-m:mt-4  sm:pt-3 pb-3 sticky bottom-0  bg-white">
              <div className="">
                <button
                  onClick={() => dispatch(updateTab(currentTab - 1))}
                  className={`border-[1px] rounded-[50px] w-[86px] h-[39px] border-grey-dark  text-grey-600 font-medium ${
                    currentTab < 1 ? "hidden" : ""
                  }`}
                >
                  Back
                </button>
              </div>
              <button
                className="border-[1px] rounded-[50px] w-[86px] h-[39px] border-grey-dark  text-white font-medium bg-black"
                onClick={() => {
                  if (currentTab <= 6) {
                    handleNextValidations();
                    // dispatch(updateTab(currentTab + 1));
                  } else {
                    createNewListing();
                  }
                }}
              >
                {currentTab > 6 ? "Publish" : "Next"}
              </button>
            </div>
          </div>
        </div>

        <div className="!rounded-2xl h-[68vh] w-[24vw] max-h-[635px] 2xl:max-w-[32%] lg:hidden relative">
          <Image
            loader={localStorageLoader}
            src={`/assets/${images[currentTab]}`}
            alt="tab"
            fill
            className="rounded-2xl"
          />
        </div>
      </div>

      <Dialog
        contentClass="bg-white w-[300px] h-[150px] rounded-md"
        open={showErrorPopup}
        onClose={() => setShowErrorPopUp((prev) => !prev)}
      >
        <div className="flex flex-col justify-between items-start h-[150px] py-3 px-3">
          <div className="">
            <p className="text-red-500 font-bold text-xl leading-8">Error</p>
            <span className="text-grey-600 font-normal text-base leading-5">
              {errorMsg}
            </span>
          </div>
          <button
            className="bg-black text-white p-2 rounded-md"
            onClick={() => setShowErrorPopUp((prev) => !prev)}
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
}
 