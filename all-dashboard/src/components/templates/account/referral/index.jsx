import Image from "next/image";
import BannerImg from "assets/images/referral-banner.png";
import ReferralCardImg from "assets/images/referral-card-img.png";
import { FilledButton } from "ui/buttons";

const TableComponent = () => {
  const referral = [];

  const tableHeaders = ["Name", "Email", "Date", "Details"];

  return (
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
            {/* {tableHeaders.map((header, i) => ( */}
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
              {data.Details}
            </td>
            {/* ))} */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Referral = () => {
  return (
    <>
      <div
        className="flex gap-3 w-full border border-[#D9D9D9] rounded-2xl min-h-[225px]"
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
      <div className="flex gap-8 mt-8">
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
      <div className="mt-8">
        <TableComponent />
      </div>
    </>
  );
};

export default Referral;
