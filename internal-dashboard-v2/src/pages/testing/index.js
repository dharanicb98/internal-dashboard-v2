import React, { useId, useState } from "react";
import {
  ActivitesAttractionsIcon,
  AddonsIcon,
  AffiliateEarningsIcon,
  AmenitiesGroupsIcon,
  CategoriesIcon,
  ChannelsIcon,
  CheckoutIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ContinentIcon,
  CountryIcon,
  CoupanIcon,
  DestinationIcon,
  EventModuleIcon,
  ExtraServicesIcon,
  FacilitiesIcons,
  FaqsIcon,
  GeoTagIcon,
  GiftCardIcon,
  HomeIcon,
  HouseRulesIcon,
  ListingTypesIcon,
  ListingsIcon,
  OffersIcon,
  PaymentGetwayIcon,
  PaymentTableIcon,
  PaymentTransactionIcon,
  PetsIcons,
  ProcessingFeeIcon,
  PropertyTypeIcon,
  ReaservationIcon,
  ReferralsIcon,
  RegionsIcon,
  SystemVariableIcon,
  UsersIcon,
  pageConfig,
  taxIcon,
} from "../../icons";
import { NavLink, useLocation } from "react-router-dom";

const Testing = () => {
  let location = useLocation();
  const [menuList, setMenuList] = useState([
    {
      id: useId(),
      name: "Dashboard",
      imageType: "svg",
      link: "/",
      svg: HomeIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Checkout",
      imageType: "svg",
      link: "/checkout",
      svg: CheckoutIcon,
      fontSize: "text-[17px]",
    },
    // {
    //   id: useId(),
    //   name: "Testing",
    //   imageType: "svg",
    //   link: "/testing",
    //   svg: HomeIcon,
    //   fontSize: "text-[17px]",
    // },
    {
      id: useId(),
      name: "Users",
      imageType: "svg",
      link: "/users",
      svg: UsersIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Listings",
      imageType: "svg",
      link: "/listings",
      svg: ListingsIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Listing Attributes",
      imageType: "svg",
      to: "/listing-attributes",
      isActive: false,
      fontSize: "text-[17px]",
      children: [
        // {
        //   id: useId(),
        //   name: "Parent-Group",
        //   imageType: "svg",
        //   svg: HomeIcon,
        //   // to: "/listing-attributes/amenities-group",
        //   isActive: false,
        //   fontSize: "text-[13px]",
        //   children: [
        //     {
        //       id: useId(),
        //       name: "child-Group",
        //       imageType: "svg",
        //       svg: HomeIcon,
        //       // link: "/listing-attributes/amenities-group",
        //       children: [
        //         {
        //           id: useId(),
        //           name: "SubChild-Group",
        //           imageType: "svg",
        //           svg: HomeIcon,
        //           // link: "/listing-attributes/amenities-group",
        //           isActive: false,
        //           fontSize: "text-[15px]",
        //           children: [
        //             {
        //               id: useId(),
        //               name: "Amenities-Group",
        //               imageType: "svg",
        //               svg: HomeIcon,
        //               link: "/listing-attributes/amenities-group",
        //               fontSize: "text-[10px]",
        //             },
        //             {
        //               id: useId(),
        //               name: "Facilities",
        //               imageType: "svg",
        //               svg: HomeIcon,
        //               link: "/listing-attributes/facilities",
        //               fontSize: "text-[10px]",
        //             },
        //             {
        //               id: useId(),
        //               name: "Categories",
        //               imageType: "svg",
        //               svg: HomeIcon,
        //               link: "/listing-attributes/categories",
        //               fontSize: "text-[10px]",
        //             },
        //             {
        //               id: useId(),
        //               name: "Regions",
        //               imageType: "svg",
        //               svg: HomeIcon,
        //               link: "/listing-attributes/regions",
        //               fontSize: "text-[10px]",
        //             },

        //             {
        //               id: useId(),
        //               name: "Gift Card",
        //               imageType: "svg",
        //               svg: GiftCardIcon,
        //               link: "/listing-attributes/gift-card",
        //               fontSize: "text-[10px]",
        //             },
        //           ],
        //         },
        //         {
        //           id: useId(),
        //           name: "Facilities",
        //           imageType: "svg",
        //           svg: HomeIcon,
        //           link: "/listing-attributes/facilities",
        //           fontSize: "text-[15px]",
        //         },
        //         {
        //           id: useId(),
        //           name: "Categories",
        //           imageType: "svg",
        //           svg: HomeIcon,
        //           link: "/listing-attributes/categories",
        //           fontSize: "text-[15px]",
        //         },
        //         {
        //           id: useId(),
        //           name: "Regions",
        //           imageType: "svg",
        //           svg: HomeIcon,
        //           link: "/listing-attributes/regions",
        //           fontSize: "text-[15px]",
        //         },

        //         {
        //           id: useId(),
        //           name: "Gift Card",
        //           imageType: "svg",
        //           svg: GiftCardIcon,
        //           link: "/listing-attributes/gift-card",
        //           fontSize: "text-[15px]",
        //         },
        //       ],
        //     },
        //     {
        //       id: useId(),
        //       name: "Facilities",
        //       imageType: "svg",
        //       svg: HomeIcon,
        //       link: "/listing-attributes/facilities",
        //       fontSize: "text-[15px]",
        //     },
        //     {
        //       id: useId(),
        //       name: "Categories",
        //       imageType: "svg",
        //       svg: HomeIcon,
        //       link: "/listing-attributes/categories",
        //       fontSize: "text-[15px]",
        //     },
        //     {
        //       id: useId(),
        //       name: "Regions",
        //       imageType: "svg",
        //       svg: HomeIcon,
        //       link: "/listing-attributes/regions",
        //       fontSize: "text-[15px]",
        //     },

        //     {
        //       id: useId(),
        //       name: "Gift Card",
        //       imageType: "svg",
        //       svg: GiftCardIcon,
        //       link: "/listing-attributes/gift-card",
        //       fontSize: "text-[15px]",
        //     },
        //   ],
        // },
        {
          id: useId(),
          name: "Amenities-Group",
          imageType: "svg",
          svg: AmenitiesGroupsIcon,
          link: "/listing-attributes/amenities-group",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Facilities",
          imageType: "svg",
          svg: FacilitiesIcons,
          link: "/listing-attributes/facilities",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Categories",
          imageType: "svg",
          svg: CategoriesIcon,
          link: "/listing-attributes/categories",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Regions",
          imageType: "svg",
          svg: RegionsIcon,
          link: "/listing-attributes/regions",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Continent",
          imageType: "svg",
          svg: ContinentIcon,
          link: "/listing-attributes/continent",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "House Rules",
          imageType: "svg",
          svg: HouseRulesIcon,
          link: "/listing-attributes/houserules",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Country",
          imageType: "svg",
          svg: CountryIcon,
          link: "/listing-attributes/country",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Activities & Attractions",
          imageType: "svg",
          svg: ActivitesAttractionsIcon,
          link: "/listing-attributes/activities-attractions",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Offers",
          imageType: "svg",
          svg: OffersIcon,
          link: "/listing-attributes/offers",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Addons",
          imageType: "svg",
          svg: AddonsIcon,
          link: "/listing-attributes/addons",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Property types",
          imageType: "svg",
          svg: PropertyTypeIcon,
          link: "/listing-attributes/property-type",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Property facilities",
          imageType: "svg",
          svg: PropertyTypeIcon,
          link: "/listing-attributes/property-facilities",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Tax",
          imageType: "svg",
          svg: taxIcon,
          link: "/listing-attributes/tax",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Destination",
          imageType: "svg",
          svg: DestinationIcon,
          link: "/listing-attributes/destination",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "ListingTypes",
          imageType: "svg",
          svg: ListingTypesIcon,
          link: "/listing-attributes/listing-type",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "GeoTags",
          imageType: "svg",
          svg: GeoTagIcon,
          link: "/listing-attributes/geotag",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Coupons",
          imageType: "svg",
          svg: CoupanIcon,
          link: "/listing-attributes/coupons",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Pets",
          imageType: "svg",
          svg: PetsIcons,
          link: "/listing-attributes/pets",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Processing Fee",
          imageType: "svg",
          svg: ProcessingFeeIcon,
          link: "/listing-attributes/processing-fee",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Gift Card",
          imageType: "svg",
          svg: GiftCardIcon,
          link: "/listing-attributes/gift-card",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Extra Services",
          imageType: "svg",
          svg: ExtraServicesIcon,
          link: "/listing-attributes/extra-services",
          fontSize: "text-[13px]",
        },
        {
          id: useId(),
          name: "Faqs",
          imageType: "svg",
          svg: FaqsIcon,
          link: "/listing-attributes/faqs",
          fontSize: "text-[13px]",
        },
      ],
      svg: ChannelsIcon,
    },

    {
      id: useId(),
      name: "Reservations",
      imageType: "svg",
      link: "/reservations",
      svg: ReaservationIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "System Variables",
      imageType: "svg",
      link: "/system-variables",
      svg: SystemVariableIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Event Module",
      imageType: "svg",
      link: "/event-modules",
      svg: EventModuleIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Page Config",
      imageType: "svg",
      link: "/page-config",
      svg: pageConfig,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Payment Gateway",
      imageType: "svg",
      link: "/payment-gateway",
      svg: PaymentGetwayIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Payment Transactions",
      imageType: "svg",
      link: "/payment-transactions",
      svg: PaymentTransactionIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Payment Table",
      imageType: "svg",
      link: "/payment-table",
      svg: PaymentTableIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Affiliate Earnings",
      imageType: "svg",
      link: "/affiliate-earnings",
      svg: AffiliateEarningsIcon,
      fontSize: "text-[17px]",
    },
    {
      id: useId(),
      name: "Affliate Referrals",
      imageType: "svg",
      link: "/affliate-referral",
      svg: ReferralsIcon,
      fontSize: "text-[17px]",
    },
    
  ]);

  const onClickChevronButton = (data) => {
    // console.log(data);
    function updateIsActive(items) {
      items.forEach((item) => {
        if (item.id === data.id) {
          item.isActive = !item.isActive;
        }
        if (item.children) {
          updateIsActive(item.children);
        }
      });
    }
    updateIsActive(menuList);
    setMenuList([...menuList]);
  };

  // console.log(location.pathname);
  const listItems = (eachItem) => {
    return (
      <div className={`flex flex-col justify-center`}>
        <div className="flex cursor-pointer items-center w-full ">
          {eachItem?.children?.length > 0 ? (
            <div
              onClick={() => onClickChevronButton(eachItem)}
              className={`${eachItem.fontSize}  flex items-center ${
                eachItem.isActive && "mb-3"
              }`}
            >
              <eachItem.svg />
              <p className="pl-1 ">{eachItem.name}</p>

              <div className="mt-2 pl-1">
                {eachItem.isActive ? (
                  <div className="">
                    <ChevronDownIcon />
                  </div>
                ) : (
                  <div>
                    <ChevronRightIcon />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NavLink
              to={eachItem.link}
              key={eachItem.name}
              className={`${
                location.pathname === eachItem.link &&
                "text-[#CD264F] font-semibold"
              } w-full`}
            >
              <div className={`${eachItem.fontSize} flex items-center`}>
                <eachItem.svg />
                <p className="pl-1">{eachItem.name}</p>
              </div>
            </NavLink>
          )}
        </div>

        {eachItem.isActive &&
          eachItem.children?.map((item) => {
            return (
              <div key={item.id} className="p-3 pr-0">
                {listItems(item)}
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <div className="flex justify-center items-center ">
      <ul className=" flex flex-col w-full">
        {menuList.map((eachItem) => (
          <li key={eachItem.id} className="p-3 first:pt-8 last:pb-20">
            {listItems(eachItem)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Testing;

// import { useState, useEffect } from "react";
// import axios from "axios";

// import { useSelector } from "react-redux";
// import Table from "../../components/hkTable";
// // import ButtonAnimations from './animations/buttonAnimations'
// // when are passing
// const tableHead = [
//   {
//     fieldName: "checkout_id",
//     headName: "Checkout Id",
//     sort: true,
//     filter: true,
//     className: "w-[25%]",
//     filterFormat: "array",
//     inputType: "text",
//   },
//   {
//     fieldName: "fname",
//     headName: "First Name",
//     filter: true,
//     sort: true,
//     className: "w-[25%]",
//     filterFormat: "string",
//     inputType: "text",
//   },
//   {
//     fieldName: "lname",
//     headName: "Last Name",
//     filter: true,
//     className: "w-[25%]",
//     filterFormat: "array",
//     inputType: "text",
//   },
//   {
//     fieldName: "email_id",
//     headName: "Email",
//     filter: true,
//     className: "w-[25%]",
//     filterFormat: "array",
//     inputType: "text",
//   },
//   {
//     fieldName: "total",
//     headName: "Total",
//     filter: true,
//     className: "w-[25%]",
//     filterFormat: "range",
//     inputType: "range",
//   },
//   {
//     fieldName: "current_step",
//     headName: "Current Step",
//     filter: true,
//     className: "w-[25%]",
//     filterFormat: "string",
//     inputType: "select",
//     selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
//   },
//   {
//     fieldName: "conversion_rate",
//     headName: "conversion_rate",
//     filter: true,
//     className: "w-[25%]",
//     filterFormat: "string",
//     inputType: "select",
//     selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
//     hideColumn: true,
//   },
// ];

// function Testing() {
//   // console.log("app.js");
//   const [rows, setRows] = useState();
//   const queryBody = useSelector((state) => state.queryBody);

//   // console.log(queryBody);

//   useEffect(() => {
//     async function getData() {
//       try {
//         const response = await axios.post(
//           "https://www.snizle.com/hk-json/api/v3/checkout/query",
//           queryBody,
//           {
//             headers: {
//               Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjox[13px]E0LCJzZXNzaW9uX3Rva2VuIjoiZDQxZjNlZmYtY2RkNC00MWEzLTkyMjMtYWM2Yzc2OTNlMTViIiwiYXV0aF90eXBlIjoid3AiLCJuYW1lIjoic3JpIiwiZW1haWwiOiJzcmlAc2tpbWJveC51cyIsImlhdCI6MTY5NjQy[13px]c0OH0.LsLObEWOL96N1s5sD-OYZnHDbXD2dGxcPopzNVGUauM`,
//             },
//           }
//         );
//         // let datas = transformRows(response.data)
//         setRows(response.data);
//       } catch (e) {
//         console.log("error", e);
//       }
//     }
//     getData();
//   }, [queryBody]);

//   const transformRows = (response) => {
//     response.forEach((res) => {
//       res.current_step = <div>hello sri</div>;
//     });
//     return response;
//   };

//   return (
//     <div className="w-screen h-screen">
//       {/* <ButtonAnimations/> */}
//       {rows && <Table rows={rows} columns={tableHead} />}
//     </div>
//   );
// }

// export default Testing;
