import React from "react";
import Sidebar from "../../ui/sidebar";
import "material-icons/iconfont/material-icons.css";
import MobileBackgroundImage from "assets/images/mobilebackground.png";
import HomeIcon from "assets/icons/home.svg"
import AvatarIcon from "assets/icons/avatar-outline.svg";
import ListIcon from "assets/icons/list.svg";
import CardIcon from "assets/icons/card.svg";
import ReservationIcon from "assets/icons/reservation.png";
import CalendarIcon from "assets/icons/calendar.svg";
import InsightsIcon from "assets/icons/insights.svg";
import SupportIcon from "assets/icons/circle-help.svg";
import ChannelManagerIcon from "assets/icons/channel-manager.svg";
import ReservationIconCustomer from "assets/icons/customer-reservation.svg";
import WishlistIcon from "assets/icons/heart-outlined-black.svg";
import AffiliateIcon from "assets/icons/affiliate-refferal.svg";
import { useUserDetailsSelector } from "store/selectors/user";

const hostMenu = [
    {
      icon: HomeIcon,
      alt: "home",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/`,
    },
    {
      icon: AvatarIcon,
      alt: "profile",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/profile`,
    },
    {
      icon: ListIcon,
      alt: "listing",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing`,
    },
    {
      icon: CardIcon,
      alt: "payment",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment`,
    },
    {
      icon: ReservationIcon,
      alt: "reservation",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation`,
    },
    {
      icon: CalendarIcon,
      alt: "calendar",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/calendar`,
    },
    {
      icon: ChannelManagerIcon,
      alt: "channel manager",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/channel-manager`,
    },
    {
      icon: InsightsIcon,
      alt: "insights",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/insights`,
    },
    {
      icon: SupportIcon,
      alt: "help",
      link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support`,
    },
];

const customerMenu = [
  {
    icon: HomeIcon,
    alt: "home",
    link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}`,
  },
  {
    icon: AvatarIcon,
    alt: "profile",
    link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/profile`,
  },
  {
    icon: WishlistIcon,
    alt: "wishlist",
    link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/wishlist`,
  },
  {
    icon: ReservationIconCustomer,
    alt: "reservation",
    link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation`,
  },
  {
    icon: AffiliateIcon,
    alt: "affiliate",
    link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/affiliate-referral`,
  },
  {
    icon: CardIcon,
    alt: "payment",
    link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/payment`,
  },

  {
    icon: SupportIcon,
    alt: "help",
    link: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/support`,
  },
];

function CommonLayout({children}) {
  const userDetails = useUserDetailsSelector();
  const Host = userDetails?.isHost

  return (
    <div className="flex md:block">
      <Sidebar menu={Host ? hostMenu  : customerMenu}  />
      <div className="flex-1 max-w-[90rem] mx-auto md-m:!bg-none bg-white">
        {children}
      </div>
    </div>
  )
}

export default CommonLayout