import HKlogo from "../../public/assets/icons/HKlogo";
import Link from "next/link";
import Image from "next/image";
import Typography from "../../ui/typography/typography";
import { useEffect } from "react";
const stepThankYou = () => {
  useEffect(() => {
  }, []);
  const myLoader = ({ src, width, quality }) => {
    return `https://cdn.holidaykeepers.com/wp-content/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <div className="flex flex-col gap-5 mt-16 md:mt-5">
      <div className="md:hidden flex justify-center">
        <div className="flex justify-center rounded-xl border relative w-[350px] h-[300px] overflow-hidden ">
          <Image
            src={"2023/05/onboarding-mobile2.jpg"}
            loading="lazy"
            alt={"Loading..."}
            fill
            loader={myLoader}
          />
        </div>
      </div>
      {/* logo only for desktop */}
      <div className="hidden md:flex justify-center">
        {/* <HKlogo colorFill="black" width={400} height={150} /> */}
        <div className="flex justify-center rounded-xl border relative w-[600px] h-[350px] overflow-hidden">
          <Image
            src={"2023/05/onboarding-2.jpg"}
            loading="lazy"
            alt={"Loading..."}
            fill
            loader={myLoader}
          />
        </div>
      </div>
      <Typography
        variant={"h4"}
        sd={{
          size: "text-xl text-center md:text-4xl",
        }}
      >
        Thank you for onboarding with us!
      </Typography>

      <Link
        className="text-center border p-4 rounded-lg lg:w-[50%] mx-auto bg-black text-white mb-[20px]"
        href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}dashboard`}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default stepThankYou;