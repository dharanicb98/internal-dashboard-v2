import Image from "next/image";
import ProfileTabLayout from "./profileTabLayout";
import Divider from "ui/divider";
import WalletIcon from "assets/icons/wallet.png";
import { useRouter } from "next/router";

function PaymentsTab() {
  const router = useRouter();

  const contentList = [
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment?tab=yourPayments`),
      name: "Your Payment methods",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment?tab=coupons`),
      name: "Coupons",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment?tab=transactionHistory`),
      name: "Transaction history",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment?tab=disputes`),
      name: "Disputes",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment?tab=payouts`),
      name: "Payouts",
    },
    {
      handler: () => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment?tab=taxes`),
      name: "Taxes",
    },
  ];

  return (
    <div>
      <ProfileTabLayout list={contentList} />
      <div className="px-8 py-4 rounded-2xl border border-grey mt-16">
        <p className="text-xl font-medium">Popular Help Topics</p>
        <div className="flex justify-between mt-8">
          <div>
            <p className="text-lg">How will you get Paid</p>
            <p className="text-[#000000b3] mt-4 mb-7">
              Guidelines to safeguard your account and money
            </p>
            <a className="underline">Learn More</a>
          </div>
          <Image
            src={WalletIcon}
            alt="wallet"
            height={29}
            width={32}
            className="mb-auto"
          />
        </div>
        <Divider />
        <div className="flex justify-between mt-8">
          <div>
            <p className="text-lg">Need help with recent Payment</p>
            <p className="text-[#000000b3] mt-4 mb-7">
              Need not to worry read here to find out why this happened
            </p>
            <a className="underline">Learn More</a>
          </div>
          <Image
            src={WalletIcon}
            alt="wallet"
            height={29}
            width={32}
            className="mb-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentsTab;
