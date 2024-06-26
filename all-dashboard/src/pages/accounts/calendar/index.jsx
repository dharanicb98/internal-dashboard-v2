import DesktopAppBar from "ui/appbar/desktopAppbar";
import { wrapper } from "store/index";
import useMediaQuery from "utils/hooks/useMediaQuery";
import {
  fetchPropertyList,
  fetchUpcomingBookings,
  getPropertyImage,
} from "services/calendar/apis";
import { updatePropertyList } from "store/slices/calendar/propertyList";
import { updateUpcomingBooking } from "store/slices/calendar/upcomingBookings";
import UpcomingBooking from "components/templates/calendar/bookings";
import dynamic from "next/dynamic";
const CustomCalendar = dynamic(
  () => import("components/templates/calendar/calendar"),
  { ssr: false }
);
// import CustomCalendar from "components/templates/calendar/calendar";
import PropertyList from "components/templates/calendar/propertyList";
import PropertyDropdown from "components/templates/calendar/propertydropdown";
import { getRandomColor } from "utils/common";
import MobileAppBarBottom from "ui/appbar/mobileAppbarBottom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateServerAccessToken } from "utils/common";
import CommonLayout from "../../../components/layouts";

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await validateServerAccessToken(store, ctx);
    const [propertyList, UpcomingBooking] = await Promise.all([
      fetchPropertyList(ctx),
      fetchUpcomingBookings(ctx),
    ]);

    const result = propertyList;
    const listingObj = result?.data;
    const listObjKeyArr = Object.keys(listingObj || {});
    const listingObjArr = [];
    listObjKeyArr?.forEach((key) => {
      const tempObj = listingObj[key];
      tempObj.customId = key;
      tempObj.property_color = getRandomColor();
      listingObjArr.push(tempObj);
    });

    store.dispatch(updatePropertyList(listingObjArr || {}));

    if (UpcomingBooking && UpcomingBooking.length) {
      // const data = UpcomingBooking;
      const dataWithColor = UpcomingBooking.map((booking) => {
        booking.booking_color =
          listingObjArr.find((v) => v.listing_id == booking?.listing_id)
            ?.property_color || getRandomColor();
        return booking;
      });
      store.dispatch(updateUpcomingBooking(dataWithColor));
    }

    return {
      props: {},
    };
  });

export default function Calendar() {
  const propertyListAPI =
    useSelector((state) => state.propertylist.propertyList) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const filterImageIds = [];
      propertyListAPI.forEach((e) => {
        if (e?.media?.[0]?.id) filterImageIds.push(e?.media?.[0]?.id);
      });
      const images = await getPropertyImage({
        filters: [{ col: "id", val: filterImageIds, type: "array" }],
      });

      const listingObjArr = [];
      propertyListAPI?.forEach((key) => {
        const tempObj = { ...key };
        if (filterImageIds.includes(key?.media?.[0]?.id)) {
          tempObj.image_path =
            images.find((v) => v.id == key?.media?.[0]?.id)?.file_path || "";
        }
        listingObjArr.push(tempObj);
      });
      dispatch(updatePropertyList(listingObjArr || {}));
    })();
  }, []);

  const mediaQuery = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className="mx-0 md-m:mx-10">
        {/*App bar for desktop*/}
        <div className="hidden md-m:flex sticky top-0 pt-10 bg-white flex-col gap-3 appBar__index">
          <DesktopAppBar title={<p>Calendar</p>} />
        </div>
        {/*Calendar propertylist and Upcoming Booking for web*/}
        <div className="hidden md-m:block">
          <div className="w-full flex border-b-[1px] border-b-[#D9D9D9]">
            <div className="w-[70%] py-[20px]">
              {!mediaQuery ? <CustomCalendar device={"desktop"} /> : ""}
            </div>
            <div className=" py-[20px] pl-[20px] w-[30%]">
              <PropertyList />
            </div>
          </div>
          {/*Upcoming Bookings for web*/}
          <div className="w-full">
            <UpcomingBooking />
          </div>
        </div>
        {/*Calendar propertylist and Upcoming Booking for mobile*/}
        <div
          className="flex flex-col md-m:hidden py-5 px-6"
          // style={{
          //   background:
          //     "radial-gradient(50% 50% at 50% 50%, #FFE3813D 0%, #FFE38100 100%)",
          // }}
        >
          <div className="relative">
            <PropertyDropdown />
          </div>
          <div
            className="h-[80vh] rounded-2xl  p-4 mt-7"
            style={{ boxShadow: " 0px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
          >
            {mediaQuery ? <CustomCalendar device={"mobile"} /> : ""}
          </div>
          <div
            className="h-[80vh] rounded-2xl  p-4 mt-7 overflow-y-scroll"
            style={{ boxShadow: " 0px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
          >
            <UpcomingBooking />
          </div>
        </div>
        <div className="tb-m:hidden">
          <MobileAppBarBottom />
        </div>
      </div>
    </>
  );
}

Calendar.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
