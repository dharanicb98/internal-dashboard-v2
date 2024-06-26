import Image from "next/image";
import { OutlinedButton } from "ui/buttons";
function BookingInfoCard({ icon, title, count, onClick }) {
  return (
    <div className="border border-[#D9D9D9] p-6 rounded-2xl min-h-[215px] flex flex-col gap-5 justify-between">
      <div className="flex justify-start">
        <div className=" w-[60px] h-[60px] border border-[#D9D9D9] rounded-lg grid place-items-center">
          <Image src={icon} />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[#5C5C5C] text-xl">{title}</p>
        <div className="flex justify-between items-end mt-2.5">
          <span className="text-[2.625rem] leading-[1]">{count}</span>
          <OutlinedButton
            onClick={onClick}
            text={"View"}
            primary={false}
            buttonClass={
              "px-6 text-base font-normal border border-[#5C5C5C] min-w-[100px] h-[40px]"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BookingInfoCard;
