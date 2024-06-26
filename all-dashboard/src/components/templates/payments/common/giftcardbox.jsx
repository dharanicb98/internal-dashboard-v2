import hklogoblack from "assets/images/hk-icon-text-black.svg";
import GiftImg from "assets/images/gift-card-img.svg";
import Image from "next/image";
function GiftCardBox() {
  return (
    <>
      <div
        className="w-[372px] h-[230px] rounded-[16px] border-[1px] border-[#D9D9D9] py-8 px-4 gap-2.5"
        style={{
          boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.10)",
        }}
      >
        <div className="flex gap-5">
          <div className="w-[65%]">
            <Image src={hklogoblack} />
            <h3 className="text-lg font-medium mt-4">$1000 Gift Certificate</h3>
            <div className="text-xs font-normal text-[#606161]">
              Valid on a minimum 2 nights booking at HolidayKeepers Poconos.{" "}
            </div>
            <span className="text-xs font-normal text-[#606161]">6OJFQ</span>
          </div>
          <div className="w-[30%] flex justify-center items-center">
            <Image src={GiftImg} />
          </div>
        </div>
        <div className="my-[10px]  h-[1px] bg-[#D9D9D9]"></div>
        <div className="flex justify-between">
          <h3 className="text-base font-normal">Valid till 12/31/23</h3>
          <h3 className="text-lg font-semibold text-[#CD2650]">$1000</h3>
        </div>
      </div>
    </>
  );
}

export default GiftCardBox;
