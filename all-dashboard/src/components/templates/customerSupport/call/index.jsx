import BannerImg from "assets/images/coupon-bg-image.png";
import hklogo from "assets/images/hk-icon-text.svg";
import Image from "next/image";
import Divider from "ui/divider";
import UsFlag from "assets/images/us-flag.png";
import DubaiFlag from "assets/images/dubai-flag.png";
import IndiaFlag from "assets/images/india-flag.png";

function CallNow() {
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
            Connect with us for prompt and reliable service We're just a call
            away.
          </span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="p-5 border border-black rounded-2xl">
          <div className="flex flex-col gap-2.5 ml-4">
            <div className="flex gap-2 items-center">
              <div className="w-[27px] h-[17px]">
                <Image src={UsFlag} alt="flag" />
              </div>
              <span className="text-2xl font-medium">United States</span>
            </div>
            <span className="text-lg">(+1) 222 555 0446</span>
          </div>
          <Divider className="mt-3.5" />
          <div className="flex justify-center">
            <span className="text-2xl cursor-pointer">Call Now</span>
          </div>
        </div>
        <div className="p-5 border border-black rounded-2xl">
          <div className="flex flex-col gap-2.5 ml-4">
            <div className="flex gap-2 items-center">
              <div className="w-[27px] h-[17px]">
                <Image src={DubaiFlag} alt="flag" />
              </div>
              <span className="text-2xl font-medium">United Arab Emirates</span>
            </div>
            <span className="text-lg">(+1) 222 555 0446</span>
          </div>
          <Divider className="mt-3.5" />
          <div className="flex justify-center">
            <span className="text-2xl cursor-pointer">Call Now</span>
          </div>
        </div>
        <div className="p-5 border border-black rounded-2xl">
          <div className="flex flex-col gap-2.5 ml-4">
            <div className="flex gap-2 items-center">
              <div className="w-[27px] h-[17px]">
                <Image src={IndiaFlag} alt="flag" />
              </div>
              <span className="text-2xl font-medium">India</span>
            </div>
            <span className="text-lg">(+91) 879 1254 789</span>
          </div>
          <Divider className="mt-3.5" />
          <div className="flex justify-center">
            <span className="text-2xl cursor-pointer">Call Now</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallNow;
