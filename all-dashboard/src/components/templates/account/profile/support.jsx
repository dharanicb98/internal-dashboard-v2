import Image from "next/image";
import ProfileTabLayout from "./profileTabLayout";
import { OutlinedInput } from "src/ui/input/outlinedInput";
import ArrowUpFilled from "assets/icons/arrow-up-filled.svg";

function SupportTab() {
  const contentList = [
    {
      handler: () => {},
      name: "Chat with us",
    },
    {
      handler: () => {},
      name: "Email Us",
    },
    {
      handler: () => {},
      name: "Call now",
    },
    {
      handler: () => {},
      name: "Feedbacks & Bug Report",
    },
    {
      handler: () => {},
      name: "Tickets",
    },
    {
      handler: () => {},
      name: "Terms,Policies and License",
    },
    {
      handler: () => {},
      name: "Refunds",
    },
    {
      handler: () => {},
      name: "Refunds",
    },
  ];
  return (
    <div>
      <ProfileTabLayout list={contentList} />
      <p className="text-grey-light mt-10">
        Do not post any sensitive data in this chat. We respect your privacy.
      </p>
      <div className="flex px-4 py-2 border-[#D9D9D9] border rounded-full gap bg-white mt-[38px]">
        <input
          id="default-search"
          className="block w-full ml-3 rounded-lg placeholder-black !outline-none placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] text-base"
          placeholder="Enter Text to begin chat"
          required
        />
        <Image src={ArrowUpFilled} width={26} height={26} alt="upward" />
      </div>
    </div>
  );
}

export default SupportTab;
