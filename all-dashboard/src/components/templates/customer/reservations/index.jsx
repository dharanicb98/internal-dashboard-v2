import DesktopAppBar from "ui/appbar/desktopAppbar";
import MobileAppBarBottom from "ui/appbar/mobileAppbarBottom";
import CustomerReservation from "../../customerReservation";
import SortIcon from "assets/icons/sort.svg";
import BackIcon from "assets/icons/back-icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CommonLayout from "../../../layouts";


export default function ReservationRoot({ customerReservationData, listingHashMap, regionHashmap }) {
  const router = useRouter();
  const [openSortDialog, setOpenSortDialog] = useState(false);
  
  return (
    <>
      <div className="mx-6 md-m:mx-10">
        <div className="hidden md-m:flex sticky top-0 pt-10 bg-white flex-col gap-3 appBar__index">
          <DesktopAppBar path="customer-dashboard" title={<h1>Your Reservations</h1>} />
        </div>
        <div className="flex justify-between md-m:hidden pt-10 pb-12 bg-white">
          <div className="flex gap-4">
            <Image
              src={BackIcon}
              alt="back"
              className="cursor-pointer"
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/`)}
            />
            <span className="text-xl">Your Reservations</span>
          </div>

          <Image
            src={SortIcon}
            alt="sort"
            onClick={() => setOpenSortDialog(true)}
          />
        </div>
        <CustomerReservation
          reservations={customerReservationData}
          listingHashMap={listingHashMap}
          regionHashmap={regionHashmap}
          openSortDialog={openSortDialog}
          setOpenSortDialog={setOpenSortDialog}
          isDefault={true}
        />
        <div className="flex md-m:hidden sticky top-0 pt-10 pb-12 bg-white flex-col gap-3 appBar__index">
          <MobileAppBarBottom />
        </div>
      </div>
    </>
  );
}

ReservationRoot.getLayout = (page) => (
  <CommonLayout>{page}</CommonLayout>
);
