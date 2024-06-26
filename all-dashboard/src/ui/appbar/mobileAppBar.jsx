import React from "react";
import Avatar from "ui/avatar";
import HkImage from "assets/images/hkimage.png";
import Image from "next/image";
import SwitchImage from "assets/images/mobilehosticon.png";
import { useRouter } from "next/router";

const MobileAppBar = () => {
  const router = useRouter();
  
  const handleSwitch  = () => {
    //  router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}customer-dashboard`)
    console.log('called')
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <button onClick={() => router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/profile`)}>
          <Avatar url="" />
        </button>
      </div>
      <div>
        <Image src={HkImage} alt="hkimage" />
      </div>
      <div>
        <button onClick={handleSwitch}>
          <Image src={SwitchImage} alt="mobile-host-icon" />
        </button>
      </div>
    </div>
  );
};

export default MobileAppBar;
