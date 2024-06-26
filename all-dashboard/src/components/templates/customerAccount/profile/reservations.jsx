import ProfileTabLayout from "./profileTabLayout";
import { useRouter } from "next/router";

function ReservationsTab() {
  const router = useRouter();
  const contentList = [
    {
      handler: () => {
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=All`);
      },
      name: "All Reservations",
    },
    {
      handler: () => {
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=Upcoming`);
      },
      name: "Upcoming Reservations",
    },
    {
      handler: () => {
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=Cancelled`);
      },
      name: "Cancelled Reservations",
    },
    {
      handler: () => {
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=Completed`);
      },
      name: "Completed Reservations",
    },
    {
      handler: () => {
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=Unsucessfull`);
      },
      name: "Unsucessfull Reservations",
    },
  ];
  return (
    <div>
      <ProfileTabLayout list={contentList} />
    </div>
  );
}

export default ReservationsTab;
