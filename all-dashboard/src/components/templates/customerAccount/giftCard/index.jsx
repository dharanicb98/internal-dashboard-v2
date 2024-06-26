import BannerImg from "assets/images/giftcard-banner.png";
import hklogo from "assets/images/hk-icon-text.svg";
import Image from "next/image";
import GiftCardBox from "../common/giftcardbox";
import { FilledButton } from "ui/buttons";
import OutlinedInput from "src/ui/input/outlinedInput";
import LeftButtonIcon from "assets/icons/leftButton.svg";
import RightButtonIcon from "assets/icons/rightButton.svg";
import ProgressBar from "ui/progressbar";
import React, { useRef, useState } from "react";

function GiftCard() {
  const containerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const calculatedScroll = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollPercentage(calculatedScroll);
    }
  };

  const scrollToCard = (offset) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
      handleScroll();
    }
  };

  const ScrollPrev = () => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = container.clientWidth; // Adjust this based on your card width
      const scrollOffset = container.scrollLeft - cardWidth;
      scrollToCard(scrollOffset >= 0 ? scrollOffset : 0);
    }
  };

  const ScrollNext = () => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = container.clientWidth; // Adjust this based on your card width
      const scrollOffset = container.scrollLeft + cardWidth;
      scrollToCard(scrollOffset);
    }
  };

  return (
    <>
      <div
        className="hidden md-m:flex gap-3 w-full border border-[#D9D9D9] rounded-2xl min-h-[289px] bg-no-repeat bg-cover bg-black"
        style={{
          backgroundImage: `linear-gradient(90deg, #000 32.8%, rgba(0, 0, 0, 0.00) 94.63%),url(${BannerImg.src})`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-2/3 flex flex-col gap-6 justify-center px-14">
          <div>
            <Image src={hklogo} alt="logo" />
          </div>
          <span className="text-3xl text-white">
            Experience the magic of vacation with our gift cards exclusive to
            hosts and customers
          </span>
        </div>
      </div>
      <div className="mt-16">
        <p className="text-xl font-medium ">Redeem your gift card</p>
        {/* giftCard Desktop */}
        <div className="relative h-[250px] overflow-x-auto mt-6 md:hidden">
          <div className="flex gap-8 absolute">
            <GiftCardBox />
            <GiftCardBox />
            <GiftCardBox />
            <GiftCardBox />
          </div>
        </div>

        {/* giftCard Mobile */}
        <div
          className="hidden md:flex gap-8 overflow-x-scroll w-full md-m:w-[85vw] max-w-full py-8 md-m:py-16"
          ref={containerRef}
          onScroll={handleScroll}
        >
          <GiftCardBox />
          <GiftCardBox />
          <GiftCardBox />
          <GiftCardBox />
        </div>

        <div className="flex md-m:hidden gap-8 pb-8 items-center">
          <div className="flex gap-6">
            <Image
              src={LeftButtonIcon}
              alt="back"
              width={14}
              height={12}
              onClick={ScrollPrev}
            />
            <Image
              src={RightButtonIcon}
              alt="back"
              width={14}
              height={1}
              onClick={ScrollNext}
            />
          </div>
          <div className="flex-1">
            <ProgressBar progressPercent={scrollPercentage} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-medium mb-4 md-m:mb-8">Enter Code</p>
        <OutlinedInput
          onChange={(e) => console.log(e.target.value)}
          value={""}
          className={
            "rounded-xl py-4 px-6 !border-grey border border-[#D9D9D9] text-lg max-w-[372px] mb-8"
          }
        />

        <div className="flex justify-start ">
          <FilledButton
            text="Redeem"
            onClick={() => {}}
            buttonClass="px-6 px-2.5 text-base font-normal"
          />
        </div>
      </div>
    </>
  );
}

export default GiftCard;
