import ProfileTabLayout from "./profileTabLayout";

function ListingsTab() {
  const contentList = [
    {
      handler: () => {},
      name: "Create New Listing",
    },
    {
      handler: () => {},
      name: "All listings",
    },
    {
      handler: () => {},
      name: "Listed listings",
    },
    {
      handler: () => {},
      name: "Unlisted listings",
    },
    {
      handler: () => {},
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
