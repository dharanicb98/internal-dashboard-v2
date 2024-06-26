import React, { useState, useEffect } from "react";
import TableComponent from "components/templates/dashboard/table/index";
import ReservationCard from "components/templates/reservations/reservationCard";
import Graph from "components/templates/dashboard/graph/graph";
import MessageCard from "components/templates/dashboard/cards/messagesCard";
import InsightsCard from "components/templates/dashboard/cards/insightsCard";
import BackgroundCard from "components/templates/dashboard/cards/backgroundCard";
import PriceCard from "components/templates/dashboard/cards/priceCard";
import Divider from "ui/divider";
import { wrapper } from "store/index";
import { TabWrapper } from "ui/tab";
import { Tab } from "ui/tab";
import HostAppBar from "components/templates/dashboard/hostappbar/hostAppbar";
import { useRouter } from "next/router";
import HostAppBarMobile from "components/templates/dashboard/hostappbar/hostAppbarMobile";
import BackgroundCardMobile from "components/templates/dashboard/cards/backgroundCardMobile";
import PerformanceCardMobile from "components/templates/dashboard/cards/performanceCardMobile";
import BookingCardMobile from "components/templates/dashboard/cards/bookingCardMobile";
import GraphMobile from "components/templates/dashboard/graph/graphMobile";
import InfoCard from "components/templates/dashboard/cards/infoCard";
import Image from "next/image";
import MobileAppbarIcon from "assets/images/down-arrow-mobie-appbar.png";
import MobileAppBarBottom from "ui/appbar/mobileAppbarBottom";
import ReservationMobileCard from "../reservations/reservationCardMobile";
import { useUserDetailsSelector } from "store/selectors/user";
import getConversationList from "src/services/chat/getConversationList";
import CommonLayout from '../../layouts'




export default function Host( props ){
    const { dashboardData, hostReservationsData, listingHashMap,  regionHashmap} = props;
    const router = useRouter();
    // const [showAll, setShowAll] = useState(false);
    const [tab, setTab] = React.useState("highEarnings");
    const banner = dashboardData?.banner;
    const earningsData = dashboardData?.earnings || {};
    const earningsArray = Object.entries(earningsData)?.map(([key, value]) => ({
      period: key,
      price: value.price,
      percentage: value.percentage,
      total: value.total,
      text: value.text,
    }));
    const tdHigh = dashboardData?.listing?.high;
    const tdLow = dashboardData?.listing?.low;
    const graphData = dashboardData?.chart;
    const totalBookings = dashboardData?.earnings?.total_booking;
    const upcomingBookings = dashboardData?.earnings?.upcoming_booking;
    const reservations = dashboardData?.reservation?.recent;
    const insights = dashboardData?.insights;
    const messages = dashboardData?.message;
    const listing = dashboardData?.listing;
    const [userDetails, setUserDetails] = useState();
    const [recentMessages, setRecentMessages] = useState([])
  
    const userData = useUserDetailsSelector();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const userDetail = JSON.parse(token);
      setUserDetails(userDetail);
    }, []);
  
    useEffect(() => {
      if (userData?.user_id) {
        getRecentMessages()
      }
    }, [userData])
  
    const getRecentMessages = async () => {
       try {
        const conversationList =  await getConversationList({role:"host", id: userData.user_id, page: 1});
        setRecentMessages( conversationList?.list );
       }
       catch (err) {
         console.log('error in get recent messages')
       }
    }
  
    const TableList = [
      {
        key: "High Earnings Listings",
        value: "highEarnings",
      },
      {
        key: "Low Earnings Listings",
        value: "lowEarnings",
      },
    ];
  
    const tabPanels = [
      {
        value: "High Earnings Listings",
        component: <TableComponent data={tdHigh} />,
      },
      {
        value: "Low Earnings Listings",
        component: <TableComponent data={tdLow} />,
      },
    ];
  
    const moreDetailsCLick = () => {
      router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/chat`);
    };
  
    const tempList = [{ value: "t1" }, { value: "t2" }];
  
    const tempPanel = [
      { value: "temp-1", component: <TableComponent data={tdHigh} /> },
      { value: "temp-2", component: <TableComponent data={tdLow} /> },
    ];
  
    const handleViewAll = () => {
      router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation`)
    }
  
    // console.log('dashboard 1')
  
    return (
      <div className="md:ml-5 md:mr-5 md-m:ml-10 md-m:mr-10">
        <div className="md:hidden mt-[75px] relative">
          <HostAppBar />
        </div>
  
        {/* {console.log('dashboard 2')} */}
        <div className="md-m:hidden py-[20px] mb-[50px]">
          <HostAppBarMobile />
        </div>
  
        {/* {console.log('dashboard 3')} */}
        <div className="md-m:hidden">
          <div className="text-2xl font-medium mb-4">
            Welcome Back, {" "}
            <div>
              {userDetails?.fname} {userDetails?.lname}!
            </div>
          </div>
          <div className="flex justify-start gap-2 mb-10">
            <div className="text-grey-light">Complete your Profile Now</div>
            <div className="mt-auto">
              <Image src={MobileAppbarIcon} alt="mobile-appbar-complete-icon" />
            </div>
          </div>
        </div>
        {/* {console.log('dashboard 4')} */}
  
        <div className="md:hidden">
          <BackgroundCard banner={banner} />
        </div>
        {/* {console.log('dashboard 5')} */}
  
        <div className="md-m:hidden mx-auto mb-[60px]">
          <BackgroundCardMobile banner={banner} />
        </div>
  
        {/* {console.log('dashboard 6')} */}
  {/* 
        <div className="md:hidden md-m:overflow-auto">
          <div className="bg-[#F9FBFC] py-3 px-4 my-8">Earnings</div>
          <div className="flex gap-[88px] items-center justify-between lg:flex-wrap lg:justify-center">
            <div className="flex  gap-[80px]">
              <PriceCard
                title={earningsArray[0]?.period}
                // price={earningsArray[0].price}
                percentage={earningsArray[0]?.percentage}
                total={earningsArray[0]?.total}
                text={earningsArray[0]?.text}
              />
  
              <PriceCard
                title={earningsArray[1]?.period}
                // price={earningsArray[1].price}
                percentage={earningsArray[1]?.percentage}
                total={earningsArray[1]?.total}
                text={earningsArray[1]?.text}
              />
              <PriceCard
                title={earningsArray[2]?.period}
                // price={earningsArray[2].price}
                percentage={earningsArray[2]?.percentage}
                total={earningsArray[2]?.total}
                text={earningsArray[2]?.text}
              />
            </div>
            <div className="flex gap-8">
              <button
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_DASHBOARD_URL}dashboard/insights`
                  )
                }
              >
                <div className="flex flex-col">
                  <div className="text-[28px] font-semibold">
                    {totalBookings || 0}
                  </div>
                  <div className="text-grey-dark">Total Bookings</div>
                </div>
              </button>
              <Divider orientation="vertical" />
              <button
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_DASHBOARD_URL}dashboard/insights`
                  )
                }
              >
                <div className="flex flex-col">
                  <div className="text-[28px] font-semibold">
                    {upcomingBookings || 0}
                  </div>
                  <div className="text-grey-dark">Upcoming Bookings </div>
                </div>
              </button>
            </div>
          </div>
        </div> */}
  
        {/* {console.log('dashboard 7')} */}
  {/* 
        <div className="md-m:hidden">
          <div className="text-lg font-medium mb-5">Performance</div>
          <div>
            {earningsArray && (
              <PerformanceCardMobile
                earnings={earningsArray}
                high={tdHigh}
                low={tdLow}
              />
            )}
          </div>
        </div> */}
  
        {/* {console.log('dashboard 8')} */}
        {/* <div className="md-m:hidden mb-[35px]">
          <div className="font-medium text-xl mt-[50px] mb-[24px]">Insights</div>
          <div className="flex gap-6 overflow-auto">
            {insights?.map((insight, index) => (
              <InsightsCard
                key={index}
                isAchieved={insight.status}
                percentage={insight.percentage}
                title={insight.title}
                description={insight.description}
                text={insight.text}
              />
            ))}
  
            <InsightsCard />
            <InsightsCard isAchieved={true} />
            <InsightsCard />
            <InsightsCard isAchieved={true} />
            <InsightsCard isAchieved={true} />
          </div>
        </div> */}
  
        {/* {console.log('dashboard 9')} */}
        {/* <div className="md:hidden mb-[80px] mt-[60px]">
          <Graph data={graphData} />
        </div> */}
  
        {/* {console.log('dashboard 10')} */}
        {/* <div className="md-m:hidden mb-[35px]">
          <GraphMobile data={graphData} />
        </div> */}
  
        {/* {console.log('dashboard 11')} */}
        <div className="md-m:hidden mb-[60px]">
          <div className="flex items-center justify-between mb-5">
            <div>Recent Reservations</div>
            <button className="text-primary" onClick={handleViewAll}>
              View All
            </button>
          </div>
          <div className="flex overflow-auto gap-3">
            {hostReservationsData &&
              hostReservationsData?.map((reservation, index) => (
                <ReservationMobileCard key={index} data={reservation} listingHashMap={listingHashMap} regionHashmap={regionHashmap}  />
              ))}
          </div>
        </div>
  
        {/* {console.log('dashboard 12')} */}
        {/* <div className="md:hidden">
          <Tab
            items={TableList}
            defaultTab="High Earnings Listings"
            value={tab}
            onChange={(value) => setTab(value)}
            scrollIntoView={false}
          />
          <TabWrapper
            tabs={tabPanels}
            value={tab}
            defaultTab="High Earnings Listings"
            itemClass="mt-6"
          />
         
        </div> */}
  
        {/* {console.log('dashboard 14')} */}
        <div className="md:hidden md-m:overflow-auto">
          <div className="font-medium text-xl mt-[80px] mb-[24px]">
            Recent Reservations
          </div>
          <div>
            {hostReservationsData &&
              hostReservationsData?.map((reservation, index) => (
                <ReservationCard key={index} data={reservation} listingHashMap={listingHashMap} regionHashmap={regionHashmap} />
              ))}
          </div>
          <div className="mt-8">
            <button className="text-primary" onClick={handleViewAll}>
              View All
            </button>
          </div>
        </div>
  
        {/* {console.log('dashboard 15')} */}
        {/* <div className="md:hidden">
          <div className="font-medium text-xl mt-[80px] mb-[24px]">Insights</div>
  
          <div className="overflow-auto relative h-[17rem]">
            <div className="flex gap-8 absolute">
              {insights?.map((insight, index) => (
                <InsightsCard
                  key={index}
                  isAchieved={insight.status}
                  percentage={insight.percentage}
                  title={insight.title}
                  description={insight.description}
                  text={insight.text}
                />
              ))}
              <InsightsCard isAchieved={true} />
              <InsightsCard />
              <InsightsCard />
              <InsightsCard isAchieved={true} />
              <InsightsCard isAchieved={true} />
              <InsightsCard isAchieved={true} />
              <InsightsCard />
              <InsightsCard />
              <InsightsCard isAchieved={true} />
              <InsightsCard isAchieved={true} />
            </div>
          </div>
        </div> */}
  
       
        {/* {console.log('dashboard 16')} */}
        <div className="md:hidden md-m:overflow-auto">
          <div className="font-medium text-xl mt-[80px] mb-[24px]">
            Recent Messages
          </div>
  
          {recentMessages && recentMessages?.map((message, idx) => (
            <div className="mb-8" key={idx}>
              <MessageCard onDetailsClick={moreDetailsCLick} message={message}/>
            </div>
          ))}
          
          <div className="mt-8">
            <button className="text-primary">View All</button>
          </div>
        </div>
  
        {/* {console.log('dashboard 17')} */}
        {/* <div className="md-m:hidden">
          <div className="mb-[24px] text-lg font-medium">
            Ways to Improve your Business
          </div>
          <div className="flex flex-col gap-6 mb-[80px]">
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </div>
        </div> */}
  
        {/* {console.log('dashboard 18')} */}
        <div className="flex md-m:hidden sticky top-0 pt-10 pb-12 bg-white flex-col gap-3 appBar__index">
          <MobileAppBarBottom />
        </div>
      </div>
    );
}


Host.getLayout = (page) =>  <CommonLayout>{page}</CommonLayout>;
