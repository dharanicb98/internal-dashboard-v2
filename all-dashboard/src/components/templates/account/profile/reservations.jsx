import { useRouter } from "next/router";
import ProfileTabLayout from "./profileTabLayout";

function ReservationsTab() {
  const router = useRouter();
  const contentList = [
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=all`),
      name: "All Reservations",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=pending`),
      name: "Pending ",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=upcoming`),
      name: "Upcoming",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=ongoing`),
      name: "On Going",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=cancelled`),
      name: "Cancelled",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation?tab=completed`),
      name: "Connections",
    },
  ];
  
  return (
    <div>
      <ProfileTabLayout list={contentList} />
    </div>
  );
}

export default ReservationsTab;
