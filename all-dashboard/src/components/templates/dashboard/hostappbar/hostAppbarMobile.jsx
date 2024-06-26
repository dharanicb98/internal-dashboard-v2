import React, {useState, useEffect} from "react";
import Avatar from "ui/avatar";
import HkImage from "assets/images/hkimage.png";
import Image from "next/image";
import SwitchImage from "assets/images/mobilehosticon.png";
import { useRouter } from "next/router";
import axios from "axios";

const HostAppBarMobile = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userDetail = JSON.parse(token)
    setUserDetails(userDetail)
  }, [])

  async function handleSwitch() {
    try {
      //we will store id some where in token or localstorge when we will get id then change the role
      let response = await axios.put('https://rentmyhotel.com/api/v2/user/'+ userDetails?.user_id, {user_role:10})
      
      if ( response.status === 200 ) {
          router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/`)
      }
      else {
         alert('switch failed')
      }
    }
    catch ( e ) {
      console.log(e)
    }
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

export default HostAppBarMobile;
