import Image from "next/image";
import Divider from "ui/divider";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import LeftButtonIcon from "assets/icons/leftButton.svg";
import RightButtonIcon from "assets/icons/rightButton.svg";
import GiftCardBox from "./common/giftcardbox";
import OutlinedInput from "src/ui/input/outlinedInput";
import { FilledButton } from "ui/buttons";
import { useState } from "react";

function GiftCardMobile() {
  const [current, setCurrent] = useState(0);
  const slides = [1, 2, 3, 4, 5];
  const prev = () => {
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    console.log("prev", current);
  };

  const next = () => {
    setCurrent((current) => (current === slides.length ? 0 : current + 1));
    console.log("next", current);
  };

  return (
    <>
      <div className="block md-m:hidden justify-between ">
        <div className="flex items-center gap-5 ">
          <Image src={ChevronLeftIcon} alt="back" width={8} height={14} />
          <p className="text-xl font-medium">Gift Card</p>
        </div>
      </div>
      <Divider className="my-8.5" />
      <h3 className="text-lg font-medium mb-6">Redeem your gift card</h3>
      <div className=" flex  overflow-hidden">
        {slides.map((slide, index) => {
          return (
            <div className=" mb-6" key={index}>
              <GiftCardBox />
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 pb-10">
        <Image
          src={LeftButtonIcon}
          alt="back"
          width={14}
          height={12}
          onClick={prev}
        />
        <Image
          src={RightButtonIcon}
          alt="back"
          width={14}
          height={1}
          onClick={next}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-6 ">Redeem Code</h3>
      </div>

      <OutlinedInput
        className={"rounded-lg p-2 !border-grey border w-full text-base mb-20"}
        label={"Enter code"}
      />
      <div>
        <FilledButton
          text="Redeem"
          onClick={() => {}}
          buttonClass="w-full  text-xl font-medium"
        />
      </div>
    </>
  );
}

export default GiftCardMobile;
