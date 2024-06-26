import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReservationTab from "components/templates/reservations";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import { Tab, TabWrapper } from "ui/tab";
import getReservations from "services/reservations/getReservations";
import Image from "next/image";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import MobileAppBarBottom from "ui/appbar/mobileAppbarBottom";
import SortDialogMobile from "components/templates/customerReservation/sortDialogMobile";
import SortIcon from "assets/icons/sort.svg";
import { BOOKING_STATUS_COMPLETED, BOOOKING_STATUS_PENDING, BOOKING_STATUS_CANCELLED, BOOKING_STATUS_ONGOING, BOOKING_STATUS_UPCOMING, BOOKING_STATUS_REQUESTED} from "src/constants/payment";
import { useUserDetailsSelector } from "store/selectors/user";
import CommonLayout from "../../../layouts";



export default function Reservation({ hostReservationsData, listingHashMap, regionHashmap }) {
  const router = useRouter();
  const [tab, setTab] = React.useState("all");
  const [initialRender, setInitialRender] = React.useState(true)
  const [filters, setFilters] = React.useState({sortBy: "", col:''});
  const [hostReservations, setHostReservations] = React.useState(hostReservationsData);
  const [openSortDialog, setOpenSortDialog] = React.useState(false)
  const [userId, setUserId] = React.useState( null )

  const userDetails = useUserDetailsSelector();

  useEffect(() => {
    if ( initialRender ) {
      let id = userDetails?.user_id //get user data from global state
      setUserId(id)
      setInitialRender(false)
      return
    }
    const payload = generatePayload();
    filterData(payload)

  }, [filters])

  const generatePayload = () => {
    let payload = {}
  
    if ( userId ) {
      const userFilter = { col : "host_id", type: "number", val: userId} //get reservations by host id 
      payload.filters = [userFilter]

      if ( filters.sortBy ) {  // Add sorting filters if sortBy is provided
        payload.sort = {  orderby: filters.sortBy,  col: filters.col};
      }
    }
    return payload;
  };

  const filterData = async (payload) => {
    if ( userId ) {
      const response = await getReservations(payload);
      setHostReservations(response);
    }
    else {
      console.log('user id not founnd', userId)
    }
   
  };


  const tabList = [
    {
      key: "All",
      value: "all",
    },
    {
      key: "Upcoming",
      value: "upcoming",
    },
    {
      key: "Ongoing",
      value: "ongoing",
    },
    {
      key: "Cancelled",
      value: "cancelled",
    },
    {
      key: "Pending",
      value: "pending",
    },
    {
      key: "Completed",
      value: "completed",
    },
  ];

  const tabPanels = [
    {
      value: "all",
      component: <ReservationTab listingHashMap={listingHashMap} regionHashmap={regionHashmap} filter="all" data={hostReservations} />,
    },
    {
      value: "upcoming",
      component: (
        <ReservationTab
         listingHashMap={listingHashMap}
         regionHashmap={regionHashmap}
          filter="upcoming"
          data={hostReservations?.filter(
            (item) => item.booking_status === BOOKING_STATUS_UPCOMING
          )}
        />
      ),
    },
    {
      value: "requested",
      component: (
        <ReservationTab
        listingHashMap={listingHashMap}
        regionHashmap={regionHashmap}
          filter="requested"
          data={hostReservations?.filter(
            (item) => item.booking_status === BOOKING_STATUS_REQUESTED
          )}
        />
      ),
    },
    {
      value: "ongoing",
      component: (
        <ReservationTab
        listingHashMap={listingHashMap}
        regionHashmap={regionHashmap}
          filter="ongoing"
          data={hostReservations?.filter(
            (item) => item.booking_status === BOOKING_STATUS_ONGOING
          )}
        />
      ),
    },
    {
      value: "cancelled",
      component: (
        <ReservationTab
        listingHashMap={listingHashMap}
        regionHashmap={regionHashmap}
          filter="cancelled"
          data={hostReservations?.filter(
            (item) => item.booking_status === BOOKING_STATUS_CANCELLED
          )}
        />
      ),
    },
    {
      value: "pending",
      component: (
        <ReservationTab
        listingHashMap={listingHashMap}
        regionHashmap={regionHashmap}
          filter="pending"
          data={hostReservations?.filter(
            (item) => item.booking_status === BOOOKING_STATUS_PENDING
          )}
        />
      ),
    },
    {
      value: "completed",
      component: (
        <ReservationTab
        listingHashMap={listingHashMap}
        regionHashmap={regionHashmap}
          filter="completed"
          data={hostReservations?.filter(
            (item) => item.booking_status === BOOKING_STATUS_COMPLETED
          )}
        />
      ),
    },
  ];

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





  return (
    <div className="mx-10 md:mx-6 mb-[80px]">
      <div className="sticky top-0 pt-10 bg-white flex flex-col gap-3 appBar__index md:bg-transparent md:static">
        <DesktopAppBar
          title={
            <div className="">
              <p className="md:hidden">Your Reservations</p>
              <div className="hidden md:flex justify-between ">
                <div className="flex items-center gap-5">
                  <Image
                    src={ChevronLeftIcon}
                    alt="back"
                    width={8}
                    height={14}
                  />
                  <p className="text-xl">Your Reservations</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* <Filter /> */}
                  <button onClick={() => setOpenSortDialog((prev) => !prev)}>
                    <Image src={SortIcon} alt="filter" />
                  </button>
                </div>
              </div>
            </div>
          }
          containerClass="md:mb-8"
        />
        
        <Tab
          items={tabList}
          defaultTab="all"
          sticky
          onChange={(value) => setTab(value)}
          value={tab}
          flexProps={{
            className: "flex justify-between gap-8",
          }}
          containerClass="md:border md:border-primary md:px-2 md:py-2.5 md:rounded-full md:px-4"
          selectedTabClass="md:border-none md:bg-white md:rounded-full md:px-2.5 md:font-normal"
          buttonClass="md:pb-0"
        />
      </div>

      <TabWrapper
        tabs={tabPanels}
        value={tab}
        defaultTab="all"
        itemClass="py-8 md:min-h-screen"
      />

      <div className="flex md-m:hidden sticky top-0 pt-10 pb-12 bg-white flex-col gap-3 appBar__index">
        <MobileAppBarBottom />
      </div>

      <SortDialogMobile
        open={openSortDialog}
        setOpen={setOpenSortDialog}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

Reservation.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;


