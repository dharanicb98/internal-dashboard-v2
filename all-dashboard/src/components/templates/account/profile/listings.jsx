import { useRouter } from "next/router";
import ProfileTabLayout from "./profileTabLayout";

function ListingsTab() {
  const router = useRouter();
  const contentList = [
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/create-listing`),
      name: "Create New Listing",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing?tab=all`),
      name: "All listings",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing?tab=listed`),
      name: "Listed listings",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}//listing?tab=unlisted`),
      name: "Unlisted listings",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing?tab=pending`),
      name: "Pending Listings",
    },
  ];
  return (
    <div>
      <ProfileTabLayout list={contentList} />
    </div>
  );
}

export default ListingsTab;
