import React, { useState } from "react";
import BgImage from "assets/images/hostdashboardbgimage.png";
import BgImageMobile from "assets/images/mobilebgimage.png";
import ProgressCard from "./progressCard";
import ProgressCardMobile from "./progressCardMobile";

const Banner = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      description: "Lets fix 20 more work and complete your profile.  ",
    },
    {
      id: 2,
      description: "Lets fix 20 more work and complete your profile.  ",
    },
    {
      id: 3,
      description: "Lets fix 20 more work and complete your profile.  ",
    },
  ]);

  const removeCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <>
      {/*Desktop banner*/}
      <div className="hidden md-m:block">
        <div
          className="w-full rounded-2xl bg-center bg-cover bg-no-repeat overflow-hidden min-h-[250px]"
          style={{
            backgroundImage: `url(${BgImage.src})`,
          }}
        >
          <div className="grid grid-cols-2 h-full rounded-2xl min-h-[250px]">
            <div
              className="flex-col px-8 py-11"
              style={{
                background:
                  "linear-gradient(90deg, #000 29.55%, rgba(0, 0, 0, 0.00) 100%)",
              }}
            >
              <div className="text-white text-[28px] font-medium leading-8">
                The Ultimate Vacation Rental Dashboard
              </div>
              <div className="text-white text-base font-normal text-justify mt-2">
                Manage your vacation rentals effortlessly with our host
                dashboard. elevate your hosting experience and boost your
                vacation rental business with ease
              </div>
            </div>
            <div className="flex overflow-x-scroll mt-auto gap-3 py-11 mr-8 relative">
              {cards.map((card) => (
                <ProgressCard
                  key={card.id}
                  description={card.description}
                  onRemove={() => removeCard(card.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*Mobile banner*/}
      <div className="block md-m:hidden rounded-xl overflow-hidden">
        <div
          className="pt-6"
          style={{
            backgroundImage: `url(${BgImageMobile.src})`,
            height: "300px",
            margin: "auto",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col gap-[9px] justify-between h-full">
            <div className="px-6">
              <div className="font-medium text-lg text-white">
                Almost there!
              </div>
              <div className="text-sm font-normal text-white leading-7">
                Finish filling out your profile to unlock all the features and
                benefits we have to offer
              </div>
            </div>
            <div>
              <ProgressCardMobile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
