import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ChannelsIcon,
  GeoTagIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  GiftCardIcon,
} from "../../icons/";
import { useLocation } from "react-router-dom";

const Leftbar = (props) => {
  const location = useLocation();
  const { displaySideText, setDisplaySideText } = props;
  const [menuList, setMenuList] = useState([
    {
      name: "Dashboard",
      imageType: "svg",
      link: "/",
      svg: HomeIcon,
    },
    {
      name: "Checkout",
      imageType: "svg",
      link: "/checkout",
      svg: HomeIcon,
    },
    {
      name: "Testing",
      imageType: "svg",
      link: "/testing",
      svg: HomeIcon,
    },
    {
      name: "Users",
      imageType: "svg",
      link: "/users",
      svg: HomeIcon,
    },
    {
      name: "Listings",
      imageType: "svg",
      link: "/listings",
      svg: HomeIcon,
    },
    {
      name: "Listing Attributes",
      imageType: "svg",
      link: "/listing-attributes",
      isActive: false,
      children: [
        {
          childName: "Amenities-Group",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/amenities-group",
        },
        {
          childName: "Facilities",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/facilities",
        },
        {
          childName: "Categories",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/categories",
        },
        {
          childName: "Regions",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/regions",
        },
        {
          childName: "Continent",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/continent",
        },
        {
          childName: "House Rules",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/houserules",
        },
        {
          childName: "Country",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/country",
        },
        {
          childName: "Activities & Attractions",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/activities-attractions",
        },
        {
          childName: "Offers",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/offers",
        },
        {
          childName: "Addons",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/addons",
        },
        {
          childName: "Property types",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/property-type",
        },
        {
          childName: "Property facilities",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/property-facilities",
        },
        {
          childName: "Tax",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/tax",
        },
        {
          childName: "Destination",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/destination",
        },
        {
          childName: "ListingTypes",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/listing-type",
        },
        {
          childName: "GeoTags",
          imageType: "svg",
          icon: GeoTagIcon,
          to: "/listing-attributes/geotag",
        },
        {
          childName: "Coupons",
          imageType: "svg",
          icon: GeoTagIcon,
          to: "/listing-attributes/coupons",
        },
        {
          childName: "Pets",
          imageType: "svg",
          icon: GeoTagIcon,
          to: "/listing-attributes/pets",
        },
        {
          childName: "Processing Fee",
          imageType: "svg",
          icon: HomeIcon,
          to: "/listing-attributes/processing-fee",
        },
        {
          childName: "Gift Card",
          imageType: "svg",
          icon: GiftCardIcon,
          to: "/listing-attributes/gift-card",
        },
      ],
      svg: ChannelsIcon,
    },
    {
      name: "Reservations",
      imageType: "svg",
      link: "/reservations",
      svg: HomeIcon,
    },
    {
      name: "System Variables",
      imageType: "svg",
      link: "/system-variables",
      svg: HomeIcon,
    },
    {
      name: "Event Module",
      imageType: "svg",
      link: "/event-modules",
      svg: HomeIcon,
    },
    {
      name: "Affiliate Earnings",
      imageType: "svg",
      link: "/affiliate-earnings",
      svg: HomeIcon,
    },
    {
      name: "Payment GateWay",
      imageType: "svg",
      link: "/payment-gateway",
      svg: HomeIcon,
    },
    {
      name: "Affliate Referrals",
      imageType: "svg",
      link: "/affliate-referral",
      svg: HomeIcon,
    },
  ]);

  //   const onCloseSideText = () => {
  //     setDisplaySideText(false);
  //   };

  //   const onOpenSideText = () => {
  //     setDisplaySideText(true);
  //   };

  const onClickChevronButton = (data, index) => {
    menuList[index].isActive = !menuList[index].isActive;
    setMenuList([...menuList]);
  };

  return (
    <div className={`w-full h-[100%] overflow-y-auto shadow-xl scrollbar-hide`}>
      <div className={`flex flex-col justify-start w-full `}>
        <div className={`h-full `}>
          <div className="">
            <ul className="">
              {menuList.map((data, index) => {
                return (
                  <li
                    title={data.name}
                    className="py-1 w-full my-1 flex items-center"
                    key={data.name}
                  >
                    {/*===================================================================================
                    =====================================If Childrens are There=========================
                    ==================================================================================== */}

                    {data.children && (
                      <div className="flex flex-col w-full">
                        <div
                          onClick={(e) => onClickChevronButton(data, index)}
                          className={`w-full px-3 py-3 cursor-pointer`}
                        >
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center ">
                              {data.imageType === "svg" ? (
                                <div className="p-1">
                                  <data.svg />
                                </div>
                              ) : (
                                <div className="p-1">
                                  <img
                                    src={data.src}
                                    alt="rabbitmq"
                                    width="20px"
                                    height="10px"
                                  />
                                </div>
                              )}
                              <div className="text-[17px]">
                                {displaySideText ? data.name : ""}
                              </div>
                            </div>
                            <div>
                              {data.isActive ? (
                                <ChevronDownIcon />
                              ) : (
                                <ChevronRightIcon />
                              )}
                            </div>
                          </div>
                        </div>

                        <ul
                          className={`${
                            data.isActive ? "block pl-4" : "hidden"
                          }  `}
                        >
                          {data.children.map((child) => (
                            <NavLink to={child.to} key={child.childName}>
                              <li
                                className={`py-3 text-[13px] px-5  w-full ${
                                  location.pathname === child.to
                                    ? " text-[#CD264F] font-semibold"
                                    : ""
                                }`}
                              >
                                {displaySideText ? (
                                  <>
                                    <div className={`flex items-center `}>
                                      {child.imageType === "png" ? (
                                        <img
                                          className="w-5 h-5"
                                          src={child.icon}
                                          alt="icon"
                                        />
                                      ) : (
                                        <child.icon />
                                      )}
                                      <p className="ml-1 text-[13px]">
                                        {child.childName}
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    {child.imageType === "png" ? (
                                      <img
                                        className="w-5 h-5"
                                        src={child.icon}
                                        alt="icon"
                                      />
                                    ) : (
                                      <child.icon />
                                    )}
                                  </div>
                                )}
                              </li>
                            </NavLink>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ==================================================================================================
                       ========================================== if there are no childrens ==============================
                     =================================================================================================== */}

                    {!data.children && (
                      <NavLink
                        activeclassname="selected"
                        to={data.link}
                        className={`flex content-center items-center   w-full px-3 py-3  ${
                          location.pathname === data.link
                            ? " text-[#CD264F] font-semibold"
                            : ""
                        }`}
                      >
                        {data.imageType === "svg" ? (
                          <div className=" p-1">
                            <data.svg
                              className={`${
                                location.pathname === data.link
                                  ? "text-[#CD264F] font-semibold"
                                  : ""
                              }`}
                            />
                          </div>
                        ) : (
                          <div className="p-1">
                            <img
                              src={data.src}
                              alt="rabbitmq"
                              width="20px"
                              height="10px"
                            />
                          </div>
                        )}
                        {displaySideText ? (
                          <div className="text-[17px] w-40">{data.name}</div>
                        ) : (
                          ""
                        )}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Leftbar);

// import React, {  useEffect, useState } from "react";
// import {
//   HomeIcon,
//   ChannelsIcon,
// } from "../../icons/";
// // import { IoHome } from "react-icons/io5";
// import { Link, useLocation } from "react-router-dom";

// const sectionList = [
//     {
//       name: "Dashboard",
//       imageType: "svg",
//       link: "/",
//       svg: HomeIcon,
//     },
//     {
//       name: "Listings",
//       imageType: "svg",
//       link: "/listings",
//       svg: HomeIcon,
//     },
//     {
//       name: "Listing Attributes",
//       imageType: "svg",
//       link: "/listing-attributes",
//       isActive: false,
//       children: [
//         {
//           childName: "Facilities",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/facilities",
//         },
//         {
//           childName: "Categories",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/categories",
//         },
//         {
//           childName: "Regions",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/regions",
//         },
//         {
//           childName: "Continent",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/continent",
//         },
//         {
//           childName: "House Rules",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/houserules",
//         },
//         {
//           childName: "Country",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/country",
//         },
//         {
//           childName: "Activities & Attractions",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/activities-attractions",
//         },
//         {
//           childName: "Offers",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/offers",
//         },
//         {
//           childName: "Addons",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/addons",
//         },
//         {
//           childName: "Property types",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/property-type",
//         },
//         {
//           childName: "Property facilities",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/property-facilities",
//         },
//         {
//           childName: "Tax",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/tax",
//         },
//         {
//           childName: "Destination",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/destination",
//         },
//         {
//           childName: "ListingTypes",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/listing-type",
//         },
//         {
//           childName: "GeoTags",
//           imageType: "svg",
//           icon: HomeIcon,
//           to: "/listing-attributes/geotag",
//         },
//       ],
//       svg: ChannelsIcon,
//     },
//     {
//       name: "Affiliate Earnings",
//       imageType: "svg",
//       link: "/affiliate-earnings",
//       svg: HomeIcon,
//     }
//   ]

// console.log('isActive===>',!sectionList[1].isActive)

// function LeftBar() {
//     const [isSideBarOpened, setIsSideBarOpened] = useState(false);
//     const [isOpenListingAttribute,setIsOpenListingAttribute] = useState(false)
//     const [menuList, setMenuList] = useState(sectionList);
//     const {pathname} = useLocation();

//     //   useEffect(()=>{
//     //     menuList[0].isActive = ! menuList[0].isActive;
//     //     setMenuList(menuList)
//     //   },[]);

//     //   const makeAciveLink = (index) => {
//     //     menuList[index].isActive = ! menuList[0].isActive;
//     //     setMenuList(menuList)
//     //   };

//       const handleOpenCloseSideBar = () => {
//         setIsSideBarOpened(prev => !prev);
//       };

//       const handleOpenSubSections = ()=>{
//         setIsOpenListingAttribute(prev=> !prev);
//       }

//     //   const parentList = ;
//     //   const parentIcon = ;
//     //   const parentText = ;

//       const renderEachSection = (
//         section,
//         browserLink,
//         liClassName="w-[100%] h-[50px] my-[20px] flex items-center duration-[400ms]",
//         liIconClassName="text-[20px] mx-[15px]",
//         liTextClassName="text-[17px] font-[600]",
//         activeLink = "bg-[#ffffff] translate-x-[20px] text-[#CD264F] rounded-tl-xl rounded-bl-xl before:absolute before:top-[-20px] before:right-0 before:w-[20px] before:h-[20px] before:bg-[#ffffff] after:absolute after:top-[50px] after:right-0 after:w-[20px] after:h-[20px] after:bg-[#ffffff]",
//         block1ClassName="absolute top-[-20px] right-0 w-[20px] h-[20px] bg-slate-400 rounded-br-[100%] z-50 duration-400 origin-bottom-right",
//         block2ClassName="absolute top-[50px] right-0 w-[20px] h-[20px] bg-slate-400 rounded-tr-[100%] z-50 duration-400 origin-bottom-right",
//         )=>{
//         // console.log(section);
//         const name = section.hasOwnProperty("name")? section.name : section.childName;
//         // const icon = section.hasOwnProperty("svg")? section.svg : section.icon;
//         console.log(name);

//         return (
//           <>
//             <Link to={browserLink} key={section.name}>
//                 <li className={`${liClassName} ${pathname === browserLink && activeLink}`} >
//                     {
//                       section.hasOwnProperty("svg") ? <section.svg className={`${liIconClassName}`}/> : <section.icon className={`${liIconClassName}`}/>
//                     }

//                     {isSideBarOpened && <p className={`${liTextClassName}`}>{name}</p>}
//                     {
//                       pathname === browserLink && (
//                         <>
//                           <b className={`${block1ClassName}`}></b>
//                           <b className={`${block2ClassName}`}></b>
//                         </>
//                       )
//                     }
//                     <b className="absolute top-[15px] left-[-50px] bg-slate-400 h-[20px] w-[20px] rounded-full border-4 border-[#ffffff] duration-100"></b>
//                 </li>
//             </Link>
//           </>
//         );
//       }

//       const mappingArray = (list,type='parent')=>{
//         return(
//           <ul>
//           {
//             list?.map((eachSection)=>{
//               if (eachSection.hasOwnProperty("children")) {
//                   return(
//                     <>
//                       {/* {renderEachSection(eachSection)} */}
//                       <li className="w-[100%] h-[50px] flex items-center cursor-pointer" onClick={handleOpenSubSections} key={eachSection.name}>
//                         <div className={`text-[20px] ${isSideBarOpened ? "mx-[15px]" : "ml-[15px]"}`}><eachSection.svg /></div>
//                         {isSideBarOpened && <p className="text-[17px]">{eachSection.name}</p>}
//                         <button className={`text-[15px] ${isSideBarOpened ? "mx-[10px]" : "ml-[5px]"} ${isOpenListingAttribute && "-rotate-90"}`}>
//                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                           </svg>
//                         </button>
//                       </li>
//                       {
//                         isOpenListingAttribute && mappingArray(eachSection.children,'childElements')
//                       }
//                     </>
//                   )
//                   {/* return mappingArray(eachSection.children) */}
//               }else{
//                   return type === 'parent' ? renderEachSection(eachSection,eachSection.link) : renderEachSection(eachSection,eachSection.to,"w-[100%] h-[50px] my-[20px] flex items-center ml-[10px] duration-[400ms]","text-[17px] mx-[15px]","text-[15px] font-[600]",
//                   "bg-[#ffffff] translate-x-[10px] text-[#CD264F] rounded-tl-xl rounded-bl-xl before:absolute before:top-[-20px] before:right-0  before:w-[20px] before:h-[20px] before:bg-[#ffffff] after:absolute after:top-[50px] after:right-0 after:w-[20px] after:h-[20px] after:bg-[#ffffff]")
//               }
//             })
//           }
//         </ul>
//         )
//       }
//     return (
//       <div className="overflow-y-scroll scrollbar-hide h-full pb-[40px]">
//         <div className={`min-h-full bg-slate-400  py-[30px] m-3 rounded-md flex flex-col justify-between text-[#ffffff] duration-[600ms] ${!isSideBarOpened ? "w-[90px] px-[20px]" : "w-[280px] px-[20px]"}`}>
//             <ul>
//                 {mappingArray(menuList)}
//             </ul>
//             <button className='self-end mt-10' onClick={handleOpenCloseSideBar}>
//               {!isSideBarOpened ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
//                   />
//                 </svg>)
//               }
//             </button>
//         </div>
//       </div>
//     )
// }

// export default LeftBar;
