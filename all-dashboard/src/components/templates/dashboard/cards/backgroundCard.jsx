import React, { useState } from "react";
import BgImage from "assets/images/hostdashboardbgimage.png";
import ProgressCard from "components/templates/dashboard/cards/progressCard";

const BackgroundCard = ({ banner }) => {
  const [cards, setCards] = useState(
    banner?.notification || [
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
    ]
  );

  const removeCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <div
      className="w-[100%] min-h-[247px] rounded-2xl"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        // backgroundImage: `url(${banner?.image})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "lightgrey 50%",
      }}
    >
      <div className="grid grid-cols-2 px-[35px] py-[45px] h-[100%]">
        <div className="flex-col w-[70%]" style={{}}>
          <div className="text-white text-[28px] font-medium">
            {banner?.title}
          </div>
          <div className="text-white text-base font-normal text-justify">
            {banner?.description}
          </div>
        </div>
        <div className="flex overflow-x-scroll mt-auto gap-3">
          {cards?.map((card) => (
            <ProgressCard
              key={card.id}
              description={card.description}
              onRemove={() => removeCard(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundCard;
