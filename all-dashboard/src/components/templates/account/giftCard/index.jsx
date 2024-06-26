import BannerImg from "assets/images/giftcard-banner.png";
import hklogo from "assets/images/hk-icon-text.svg";
import Image from "next/image";
import GiftCardBox from "../common/giftcardbox";
import { FilledButton } from "ui/buttons";
import OutlinedInput from "src/ui/input/outlinedInput";

function GiftCard() {
  return (
    <>
      <div
        className="flex gap-3 w-full border border-[#D9D9D9] rounded-2xl min-h-[289px] bg-no-repeat bg-cover bg-black"
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
        <p className="text-xl font-medium mb-8">Redeem your gift card</p>
        <div className="flex gap-8 overflow-x-scroll">
          {/* <GiftCardBox />
          <GiftCardBox /> */}
        </div>
      </div>
      <div className="mt-16 flex flex-col">
        <p className="text-xl font-medium mb-8">Enter Code</p>
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
