import React from "react";
import { useRouter } from "next/router";
import AmenitiesContent from "components/templates/listing/amenities";
import PhotosContent from "components/templates/listing/photos";
import PropertyContent from "components/templates/listing/propertyDetails";
import RulesContent from "components/templates/listing/rules";
import IcalConnections from "components/templates/listing/connections";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import { FilledButton } from "ui/buttons";
import { Tab, TabWrapper } from "ui/tab";
import PricingContent from "components/templates/listing/pricing";
import AddOnsContent from "components/templates/listing/addons";
import ReservationContent from "components/templates/listing/reservation";
import { wrapper } from "store/index";
import getListingDetails from "services/listing/getListingDetails";
import { updateListingDetails } from "store/slices/listing";
import { getGeoLocation, getServerIP } from "services/getUserIP";
import { updateCoordinates } from "store/slices/location";
import getAmenities from "services/listing/getAmenities";
import getAddons from "services/listing/getAddons";
import getAmenitiesGroup from "services/listing/getAmenitiesGroup";
import {
  updateAmenities,
  updateAmenitiesGroup,
} from "store/slices/listing/amenities";
import getRules from "services/listing/getRules";
import { updateRules } from "store/slices/listing/rules";
import getPets from "services/listing/getPets";
import { updatePets } from "store/slices/listing/pets";
import { updateAddons } from "store/slices/listing/addons";
import getCatagories from "services/listing/getCatagories";
import { updateCatagories } from "store/slices/listing/catagories";
import { useListingDetailsSelector } from "store/selectors/listing";
import { getUpdatedValues } from "utils/common";
import { ListingDataType } from "types/listing";
import updateListing from "services/listing/updateListing";
import MobileAppbarBottomListing from "ui/appbar/mobileAppbarBottomListing";
import Loading from "ui/loading";
import Image from "next/image";
import { validateServerAccessToken } from "utils/common";
import RoomArrangementContent from "components/templates/listing/room_arrangement";
import FAQContent from "components/templates/listing/faq";
import NearByContent from "components/templates/listing/nearby";
import { updateRegions } from "store/slices/listing/regions";
import { updateDestinations } from "store/slices/listing/destinations";
import { updateCountry } from "store/slices/listing/countries";
import getRegions from "services/listing/getRegions";
import getDestinations from "services/listing/getDestinations";
import getCountries from "services/listing/getCountries";
import ChevronLeft from "assets/icons/chevron-left.svg";
import CommonLayout from "../../../../components/layouts";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await validateServerAccessToken(store, ctx);
    const listingId = ctx.params?.id as string;
    const ip = getServerIP(ctx.req);
    const [
      location,
      listingDetail,
      amenities,
      rules,
      pets,
      categories,
      amenitiesCategory,
      addons,
      regions,
      destinations,
      countries,
    ] = await Promise.all([
      getGeoLocation(ip),
      getListingDetails(listingId, ctx),
      getAmenities(ctx),
      getRules(ctx),
      getPets(ctx),
      getCatagories(ctx),
      getAmenitiesGroup(ctx),
      getAddons(ctx),
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
    store.dispatch(updateListingDetails(listingDetail || {}));
    store.dispatch(updateAmenities({ amenities, amenitiesCategory }));
    // store.dispatch(updateAmenities(amenities ));
    // store.dispatch(updateAmenitiesGroup(amenitiesGroup))
    store.dispatch(updateRules(rules));
    store.dispatch(updatePets(pets));
    store.dispatch(updateAddons(addons));
    store.dispatch(updateCatagories(categories));
    store.dispatch(updateRegions(regions));
    store.dispatch(updateDestinations(destinations));
    store.dispatch(updateCountry(countries));

    return {
      props: {
        listingId,
        defaultListing: listingDetail,
      },
    };
  }
);

export default function ListingDetail(props: ListingDetailProps) {
  const { defaultListing, listingId } = props;
  const router = useRouter();
  const listingDetails = useListingDetailsSelector();
  const [tab, setTab] = React.useState("details");
  const [isLoading, setIsLoading] = React.useState(false);

  const tabList = [
    {
      key: "Property Details",
      value: "details",
    },
    {
      key: "Photos/Videos",
      value: "media",
    },
    {
      key: "Amenities",
      value: "amenities",
    },
    {
      key: "House rules",
      value: "rules",
    },
    {
      key: "Pricing",
      value: "pricing",
    },
    {
      key: "Reservations",
      value: "reservations",
    },
    {
      key: "Add-Ons",
      value: "addons",
    },
    {
      key: "Room Arrangement",
      value: "room_arrangement",
    },
    {
      key: "FAQs",
      value: "faq",
    },
    {
      key: "Near By",
      value: "nearby",
    },
    {
      key: "Connections",
      value: "connections",
    },
  ];

  const tabPanels = [
    {
      value: "details",
      component: <PropertyContent />,
    },
    {
      value: "media",
      component: <PhotosContent />,
    },
    {
      value: "amenities",
      component: <AmenitiesContent />,
    },
    {
      value: "rules",
      component: <RulesContent />,
    },
    {
      value: "pricing",
      component: <PricingContent />,
    },
    {
      value: "addons",
      component: <AddOnsContent />,
    },
    {
      value: "room_arrangement",
      component: <RoomArrangementContent />,
    },
    {
      value: "faq",
      component: <FAQContent />,
    },
    {
      value: "nearby",
      component: <NearByContent />,
    },
    {
      value: "reservations",
      component: <ReservationContent />,
    },
    {
      value: "connections",
      component: <IcalConnections />,
    },
  ];

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const updatedValues = getUpdatedValues(listingDetails, defaultListing);
      await updateListing(listingId, updatedValues);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

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

  console.log("main file listing index.js");
  return (
    <>
      <div className="mx-10 md:mx-6 mb-[80px]">
        <div className="sticky top-0 pt-10 bg-white flex flex-col gap-3 appBar__index">
          {/* <DesktopAppBar
            title={
              <>
                <span className="md:hidden font-medium text-3xl leading-9">
                  {listingDetails.title}
                </span>
                <span className="md:hidden font-medium text-3xl leading-9">{listingDetails?.title}</span>
                <span className="md-m:hidden text-xl block">
                  Manage listing
                </span>
              </>
            }
            backAction={() => {
              router.push(
                `${process.env.NEXT_PUBLIC_DASHBOARD_URL}dashboard/listing`
              );
            }}

            action={[
              <div className="flex items-center" key={1}>
                {isLoading && <Loading containerClass="fill-black w-7 h-7" />}
                <FilledButton
                  text="Update"
                  onClick={handleUpdate}
                  buttonClass="px-4 text-xl md:hidden ml-3"
                />
              </div>,
              <div className="flex items-center" key={2}>
                <button
                  className="underline hidden md:block"
                  onClick={() => {}}
                >
                  Preview
                </button>
              </div>,
            ]}
          /> */}

          <DesktopAppBar
            title={
              <>
                <span className="md:hidden">{listingDetails.title}</span>
                <div className="flex items-center gap-x-2 md-m:hidden">
                  <button
                    onClick={() =>
                      router.push(
                        `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing`
                      )
                    }
                  >
                    <Image src={ChevronLeft} alt="back" />
                  </button>
                  <span className="text-xl block"> Manage listing</span>
                </div>
              </>
            }
            backAction={() => {
              router.push(
                `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing`
              );
            }}
            action={[
              <div className="flex items-center" key={1}>
                {isLoading && <Loading containerClass="fill-black w-7 h-7" />}
                <FilledButton
                  text="Update"
                  onClick={handleUpdate}
                  buttonClass="px-4 text-xl md:hidden ml-3"
                />
              </div>,
              <div className="flex items-center" key={2}>
                <button
                  className="underline hidden md:block"
                  onClick={() => {}}
                >
                  Preview
                </button>
              </div>,
            ]}
          />

          <Tab
            items={tabList}
            defaultTab="details"
            sticky
            onChange={(value) => setTab(value)}
            value={tab}
            flexProps={{
              className:
                "flex justify-between gap-8 overflow-hidden md-m:!gap-10",
            }}
            containerClass="md-m:!pb-6"
            buttonClass="text-xl leading-6 md:leading-3 md:text-lg md:pt-3"
          />
        </div>
        <TabWrapper
          tabs={tabPanels}
          value={tab}
          defaultTab="details"
          itemClass="py-8"
        />
      </div>
      <div className="md-m:hidden">
        {isLoading && <Loading containerClass="fill-black w-7 h-7" />}
        <MobileAppbarBottomListing
          title={listingDetails.title}
          buttonclick={handleUpdate}
        />
      </div>
    </>
  );
}

ListingDetail.getLayout = (page: any) => (
  <CommonLayout>{page}</CommonLayout>
);

interface ListingDetailProps {
  defaultListing: ListingDataType;
  listingId: string;
}
