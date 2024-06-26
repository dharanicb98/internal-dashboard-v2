import PropertyCard from "./propertyCard";

export default function PropertyList(props: any) {
  const { data } = props;

  return (
    <div className="grid grid-cols-3 gap-4 md-1:gap-2 xl:gap-2 md-1:grid-cols-1 xl:grid-cols-2 h-full justify-center items-center m-auto overflow-auto">
      {data?.length ? (
        data?.map((item:any, idx:any) => (
          <div key={idx}>
            <PropertyCard
              imgUrl={item.media[0]?.path}
              rating={4.5}
              title={item?.title}
              no_of_guests_max={item?.no_of_guests_max}
              no_of_bedrooms_max={item?.no_of_bedrooms_max}
              no_of_bathrooms_max={item?.no_of_washroom_max}
              listing_date={item?.createdAt}
              id={item?.listing_id}
            />
          </div>
        ))
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
}
