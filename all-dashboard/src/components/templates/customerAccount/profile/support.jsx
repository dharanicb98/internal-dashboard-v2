import Image from "next/image";
import ProfileTabLayout from "./profileTabLayout";
import ArrowUpFilled from "assets/icons/arrow-up-filled.svg";
// import { updateTab } from "store/slices/tabs/customerSupport";
// import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function SupportTab() {
  // const dispatch = useDispatch();
  const router = useRouter();

  const contentList = [
    {
      handler: () => {
        // dispatch(updateTab("chat"));
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support?tab=chat`);
      },
      name: "Chat with us",
    },
    {
      handler: () => {
        // dispatch(updateTab("emailus"));
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support?tab=emailus`);
      },
      name: "Email Us",
    },
    {
      handler: () => {
        // dispatch(updateTab("callnow"));
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support?tab=callnow`);
      },
      name: "Call Now",
    },
    {
      handler: () => {
        // dispatch(updateTab("bugreport"));
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support?tab=bugreport`);
      },
      name: "Feedbacks & Bug Report",
    },
    {
      handler: () => {
        //  dispatch(updateTab("tickets"));
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support?tab=tickets`);
      },
      name: "Tickets",
    },
    {
      handler: () => {
        //  dispatch(updateTab("terms"));
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support?tab=terms`);
      },
      name: "Terms & Conditions",
    },
    {
      handler: () => {
        //  dispatch(updateTab("faq"));
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support?tab=faq`);
      },
      name: "Faq",
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
