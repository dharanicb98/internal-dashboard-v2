import Typography from "../../ui/typography/typography";
import Image from "next/image";
// import HKlogo from "../../../public/assets/icons/HKlogo";
import HKlogo from "../../public/assets/icons/HKlogo";
import { PageHeading } from "./step1";
import { useDispatch } from "react-redux";
import { nextStep } from "../../store/slices/hostSlice";
import { useEffect } from "react";

const stepStart = () => {
  const dispatch = useDispatch();
  const myLoader = ({ src, width, quality }) => {
    return `https://cdn.holidaykeepers.com/wp-content/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  useEffect(() => {
  }, []);
  return (
    <div className=" flex flex-col items-center gap-6 mt-7 md:mt-[60px] mx-5">
      {/* logo for mobile */}
      <div className="md:hidden mx-5">
        {/* <HKlogo colorFill="black" width={200} height={70} /> */}
        <div className="flex justify-center rounded-xl border relative w-[350px] h-[300px] overflow-hidden">
          <Image
            src={"2023/05/onboarding-mobile1.jpg"}
            alt={"Loading..."}
            fill
            loader={myLoader}
            loading="lazy"
          />
        </div>
      </div>
      {/* logo only for desktop */}
      <div className="md:block hidden">
        {/* <HKlogo colorFill="black" width={400} height={150} /> */}
        <div className="w-full">
          <div className="flex justify-center rounded-xl border relative w-[600px] h-[350px] overflow-hidden">
            <Image
              src={"2023/05/onboarding-1.jpg"}
              alt={"Loading..."}
              fill
              loader={myLoader}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <PageHeading className={"text-xl  md:text-3xl text-center w-[100%] md:w-full"}>
        Welcome to HolidayKeepers Host Onboarding
      </PageHeading>
      <button
        className="border py-3 px-5 mx-auto rounded-xl w-[60%] bg-black text-white"
        onClick={() => {
          dispatch(nextStep());
        }}
      >
        Start
      </button>
    </div>
  );
};

export default stepStart;
