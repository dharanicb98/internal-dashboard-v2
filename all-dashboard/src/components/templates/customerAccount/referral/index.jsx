import Image from "next/image";
import BannerImg from "assets/images/referral-banner.png";
import ReferralCardImg from "assets/images/referral-card-img.png";
import BannerImgMob from "assets/images/referral-banner-mob.png";
import BackgroundCardImage from "assets/images/referral-mob-background.png";
import CloseWhite from "assets/icons/close-rounded-white.svg";
import Withdraw from "assets/icons/withdraw-white.svg";
import { FilledButton } from "ui/buttons";
import Divider from "ui/divider";
import Avatar from "ui/avatar";
import { useState } from "react";

const referral = [];

const tableHeaders = ["Name", "Email", "Date", "Details"];

const TableComponent = () => {
  return (
    <>
      {/* {referral.length > 0 && ( */}
         <table className="table-auto w-full">
         <thead>
           <tr>
             {tableHeaders.map((header, index) => (
               <th
                 className="bg-[#F2F2F2] text-lg font-medium text-left p-4"
                 key={index}
               >
                 {header}
               </th>
             ))}
           </tr>
         </thead>
         <tbody>
           {referral.map((data, index) => (
             <tr key={index}>
               <td className="border-b-[1px] border-grey text-base font-normal p-4">
                 {data.Name}
               </td>
               <td className="border-b-[1px] border-grey text-base font-normal p-4">
                 {data.Email}
               </td>
               <td className="border-b-[1px] border-grey text-base font-normal p-4">
                 {data.Date}
               </td>
               <td className="border-b-[1px] border-grey text-base font-normal p-4">
                 <FilledButton
                   text={data.Details}
                   onClick={() => {}}
                   buttonClass="px-6 px-2.5 text-xs font-light max-w-[160px]"
                 />
               </td>
             </tr>
           ))}
         </tbody>
       </table>
      {/* )} */}
    </>
   
  );
};

const CardComponentMobile = ({ data, index }) => {
  return (
    <div
      className="flex justify-between w-full px-6 py-2.5 rounded-lg shadow-base"
      key={index}
    >
      <div className="flex gap-4">
        <Avatar />
        <div className="flex flex-col">
          <span className="text-base font-normal">{data.Name}</span>
          <span className="text-sm font-normal text-[#6B6B6B]">
            {data.Date}
          </span>
        </div>
      </div>
      <FilledButton
        text={data.Details}
        onClick={() => {}}
        buttonClass="px-6 px-2.5 text-base font-normal max-w-[160px]"
      />
    </div>
  );
};

const Referral = () => {
  const [showMobCards, setShowMobCards] = useState(false);
  return (
    <>
      {/* referralfor desktop*/}
      <div
        className="hidden md-m:flex gap-3 w-full border border-[#D9D9D9] rounded-2xl min-h-[225px]"
        style={{ boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="flex-1">
          <Image
            src={BannerImg}
            alt="tab"
            className="rounded-l-2xl w-full h-full object-fill"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3 px-6 py-8 items-center text-center">
          <span className="text-base leading-5 font-normal">
            "Experience the future of data management with our intuitive
            dashboard. Unlock insights, track progress, and collaborate
            seamlessly. Join now through our exclusive invitation referral!"
          </span>

          <FilledButton
            text="Invite referral"
            onClick={() => {}}
            buttonClass="px-6 px-2.5 text-base font-normal max-w-[160px]"
          />
        </div>
      </div>

      <div className="hidden md-m:flex gap-8 mt-8 ">
        <div
          className="flex w-1/2 border border-[#D9D9D9] rounded-2xl min-h-[228px]"
          style={{ boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="w-1/2">
            <Image
              src={ReferralCardImg}
              alt="tab"
              className="rounded-l-2xl w-full h-full object-fill"
            />
          </div>
          <div className="w-1/2 px-5 flex flex-col justify-center">
            <p className="text-xl">Referral Link</p>
            <span className="text-base text-grey-light break-all">
              https://www.figma.com/file/QAvmzv0Gd27hpuZx
            </span>
            <div className="flex justify-end w-full mt-6">
              <FilledButton
                text="Copy"
                onClick={() => {}}
                buttonClass="px-6 px-2.5 text-base font-normal max-w-[160px]"
              />
            </div>
          </div>
        </div>
        <div
          className="flex gap-14 w-1/2 border border-[#D9D9D9] rounded-2xl min-h-[228px] px-8 py-10"
          style={{ boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="w-1/2 flex flex-col gap-2.5 justify-center">
            <span className="text-xl">Total Earnings</span>
            <span className="text-6xl font-medium leading-10">$0</span>
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-3xl font-medium leading-10">0</p>
              <p>Total referral</p>
            </div>
            <div>
              <p className="text-3xl font-medium leading-10">$0</p>
              <p>Your current month earings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-m:flex mt-8">
        <TableComponent />
      </div>

      {/* referral  for mobile*/}
      <div
        className="flex md-m:hidden gap-3 w-full h-[220px] border border-[#D9D9D9] rounded-2xl mt-16 p-6 "
        style={{ boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="flex flex-col justify-between w-1/2">
          <Image src={CloseWhite} alt="tab" />
          <div>
            <p className="text-lg">Introducing</p>
            <p className="text-2xl font-bold">Referral</p>
          </div>
          <p className="text-base font-light text-[#CD264F] cursor-pointer">
            Explore
          </p>
        </div>
        <div className="w-1/2">
          <Image
            src={BannerImgMob}
            alt="banner"
            className="w-full h-full object-fill"
          />
        </div>
      </div>

      {/*Card 1*/}
      <div
        className="flex flex-col md-m:hidden w-full rounded-2xl mt-8 px-6 py-4 text-white bg-cover bg-no-repeat"
        style={{
          background: `url(${BackgroundCardImage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Image src={CloseWhite} alt="banner" />
        <p className="mt-4 text-base font-medium ">
          Unlock amazing benefits by referring others
        </p>
        <div className="mt-2 flex justify-end">
          <span className="text-base font-bold ">Refer Now</span>
        </div>
      </div>

      {/*Card 2*/}
      <div
        className="flex flex-col md-m:hidden w-full rounded-2xl mt-8 px-6 py-4 text-white bg-cover bg-no-repeat"
        style={{
          background: `url(${BackgroundCardImage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="font-medium lext-lg">Referral Earning</p>
        <div className="mt-6">
          <p className="text-base font-bold">$0</p>
          <p className="text-base font-medium">Show the referral earnings in</p>
        </div>
        <Divider className="my-6" />
        <div className="mt-2 flex justify-between ">
          <div className="flex flex-col justify-center items-center">
            <p className="text-base forn-medium">Total Reffered</p>
            <p className="text-xl font-bold ">0</p>
          </div>
          <button
            className="flex gap-1.5 rounded-lg px-2.5 py-3 text-white text-base items-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)",
            }}
          >
            <Image src={Withdraw} alt="withdraw" height={20} width={24} />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      <div className="mt-20 pb-10">
         {referral.length > 0 && (
           <>
           <p className="text-lg font-medium mb-5">Reffered Users</p>
        <div className="flex flex-col gap-4">
          {referral
            .slice(0, showMobCards ? referral.length : 3)
            .map((data, index) => (
              <CardComponentMobile data={data} index={index} />
            ))}
        </div>
           </>
         )}
        {referral.length > 0 && (
          <div className="mt-10">
          {showMobCards ? (
            <span
              className="text-[#CD264F] text-base underline font-medium"
              onClick={() => setShowMobCards(false)}
            >
              Show Less
            </span>
          ) : (
            <span
              className="text-[#CD264F] text-base underline font-medium"
              onClick={() => setShowMobCards(true)}
            >
              Show More
            </span>
          )}
        </div>
        )}
      </div>
    </>
  );
};

export default Referral;
