import React, { useState } from "react";
import BgImageMobile from "assets/images/mobilebgimage.png";
import ProgressCardMobile from "src/components/templates/dashboard/cards/progressCardMobile";

const BackgroundCardMobile = ({ banner }) => {
  const [cards, setCards] = useState(banner?.notification);
  const removeCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };
  return (
    <>
      <div
        className="w-full rounded-2xl bg-center bg-cover bg-no-repeat overflow-hidden min-h-[250px]"
        style={{
          // backgroundImage: `url(${banner?.image})`,
          backgroundImage: `url(${BgImageMobile.src})`,
          backgroundRepeat: `no-repeat`,
          // width: "100%",
          // minWidth: "380px",
          // height: "300px",
          // margin: "auto",
          // objectFit: "cover",
          // borderRadius: "10px",
        }}
      >
        <div className="flex flex-col gap-[9px] justify-between h-full">
          <div className="px-6">
            <div className="font-medium text-lg text-white">
              {banner?.title}
            </div>
            <div className="text-sm font-normal text-white leading-7">
              {banner?.description}
            </div>
          </div>
          <div className="">
            {cards?.map((card) => (
              <ProgressCardMobile
                key={card.id}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundCardMobile;
