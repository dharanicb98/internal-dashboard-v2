// import { useState } from "react";
import OfferCard from "./offerCard";
// import { FilledButton } from "ui/buttons";
// import CreateOfferDialog from "./createOfferDialog";

function Offers() {
  const samples = [
    "https://booking-engine-sandbox.s3.ap-south-1.amazonaws.com/1698398795131_image_property-1.png",
    "https://booking-engine-sandbox.s3.ap-south-1.amazonaws.com/1698398828806_image_property-2.jpeg",
    "https://booking-engine-sandbox.s3.ap-south-1.amazonaws.com/1698398851847_image_property-3.jpeg",
    "https://booking-engine-sandbox.s3.ap-south-1.amazonaws.com/1698398896055_image_property-4.png",
    "https://booking-engine-sandbox.s3.ap-south-1.amazonaws.com/1698398920411_image_property-5.jpeg",
  ];
  // const [offerOpen, setOfferOpen] = useState(false);
  return (
    <>
      {/* <CreateOfferDialog offerOpen={offerOpen} setOfferOpen={setOfferOpen} /> */}
      {/* <div className="flex justify-end mb-6">
        <FilledButton
          text="Create Offer"
          onClick={() => setOfferOpen(true)}
          buttonClass="px-6 px-2.5 text-base font-normal"
        />
      </div> */}
      <div className="grid grid-cols-3 gap-4 md-1:gap-1 xl:gap-2 md-1:grid-cols-1 xl:grid-cols-2 h-full justify-center items-center m-auto ">
        {[1, 2, 3, 4, 5, 6].map((item, idx) => (
          <OfferCard
            imgUrl={samples[idx] || samples[0]}
            rating={4.5}
            title="Mesmerising Villa for Rent with Indoor Pool in PoconosPA (252)"
            no_of_guests_max={idx}
            no_of_bedrooms_max={6}
            no_of_bathrooms_max={6}
            listing_date=""
            id={String(idx)}
            key={idx}
          />
        ))}
      </div>
    </>
  );
}

export default Offers;
