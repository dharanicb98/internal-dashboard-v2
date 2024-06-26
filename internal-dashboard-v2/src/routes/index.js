import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPopup from "../components/popup/errorPopup";
import Loader from "../components/loader";
import { useSelector } from "react-redux";
import Layout from "../components/layout";
import Regions from "../pages/listingAttributes/region";
import Continent from "../pages/listingAttributes/continent";
import Listings from "../pages/listings";
import Country from "../pages/listingAttributes/country";
import Addons from "../pages/listingAttributes/addons";
import ActivitiesAndAttractions from "../pages/listingAttributes/activities-attractions";
import Home from "../pages/home";
import Tax from "../pages/listingAttributes/tax";
import Geotags from "../pages/listingAttributes/geotags";
import Facilities from "../pages/listingAttributes/facilities";
import HouseRules from "../pages/listingAttributes/houseRules";
import Offers from "../pages/listingAttributes/offers";
import PropertyType from "../pages/listingAttributes/propertyType";
import ListingTypes from "../pages/listingAttributes/listingTypes";
import Destinations from "../pages/listingAttributes/destination";
import PaymentGateWay from "../pages/paymentGateWay";
import AffiliateEarnings from "../pages/affiliateEarnings/index.js";
import AffiliateReferral from "../pages/AffliateReferral/index.js";
import SystemVariables from "../pages/system-variables";
import EventModules from "../pages/event-module";
// import Types from "../pages/listingAttributes/types";
import Users from "../pages/users";
import Uploads from "../pages/uploads";
import Coupons from "../pages/listingAttributes/coupons/index.js";
// import Testing from "../pages/testing/index.js";
import Pets from "../pages/listingAttributes/Pets/index.js";
import Checkout from "../pages/Checkout/index.js";
import CheckoutId from "../pages/Checkout/checkoutId.js";

import ProcessingFee from "../pages/listingAttributes/processing-fee/index.js";
import Reservations from "../pages/reservations/index.js";
import AmenitiesGroups from "../pages/listingAttributes/amenities-group/index.js";
import Amenities from "../pages/listingAttributes/amenities-group/amenities.js";
import GiftCard from "../pages/listingAttributes/gift-card/index.js";
import Categories from "../pages/listingAttributes/categories/index.js";
import ExtraServices from "../pages/listingAttributes/extraServices/index.js";
import UserID from "../pages/users/userID/index.js";
import PaymentTransactions from "../pages/paymentTransactions/index.js";
import PaymentTable from "../pages/paymentTable/index.js";
import Faqs from "../pages/listingAttributes/faqs/index.js";
import ListingDetails from "../pages/listings/listingDetail";
import PageConfig from "../pages/pageConfig/index.js";
import PageConfigInnerPage from "../components/forms/pageConfig/index.js";

const ProtectedRoutes = () => {
  const errorMessage = useSelector((state) => state.loader.errorMessage);
  const loader = useSelector((state) => state.loader.isLoading);
  return (
    <>
      {errorMessage && <ErrorPopup isOpen={true} errorMessage={errorMessage} />}
      {/* {errorMessage && <ErrorPop isOpen={true} errorMessage={errorMessage} />} */}

      {loader && <Loader />}

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/testing" element={<Testing />} /> */}
          <Route path="/users" element={<Users />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route
            path="/listing-attributes/categories"
            element={<Categories />}
          />
          <Route path="/listing-attributes/regions" element={<Regions />} />
          <Route path="/listing-attributes/continent" element={<Continent />} />
          <Route path="/listing-attributes/country" element={<Country />} />
          <Route path="/listing-attributes/tax" element={<Tax />} />
          <Route path="/listing-attributes/addons" element={<Addons />} />
          <Route
            path="/listing-attributes/activities-attractions"
            element={<ActivitiesAndAttractions />}
          />
          <Route
            path="/listing-attributes/destination"
            element={<Destinations />}
          />
          <Route
            path="/listing-attributes/listing-type"
            element={<ListingTypes />}
          />
          <Route path="/listing-attributes/geotag" element={<Geotags />} />
          <Route
            path="/listing-attributes/facilities"
            element={<Facilities />}
          />
          <Route
            path="/listing-attributes/houserules"
            element={<HouseRules />}
          />
          <Route path="/listing-attributes/offers" element={<Offers />} />
          <Route
            path="/listing-attributes/property-type"
            element={<PropertyType />}
          />
          <Route path="/payment-gateway" element={<PaymentGateWay />} />
          <Route path="/system-variables" element={<SystemVariables />} />
          <Route path="/affiliate-earnings" element={<AffiliateEarnings />} />
          <Route path="/affliate-referral" element={<AffiliateReferral />} />
          <Route path="/event-modules" element={<EventModules />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route
            path="/listing-attributes/amenities-group"
            element={<AmenitiesGroups />}
          />
          <Route
            path="/listing-attributes/amenities-group/:id"
            element={<Amenities />}
          />
          <Route
            path="/listing-attributes/activities-attractions"
            element={<ActivitiesAndAttractions />}
          />
          <Route
            path="/listing-attributes/destination"
            element={<Destinations />}
          />

          {/* <Route path="/listing-attributes/listing-type" element={<Types />} /> */}
          <Route path="/listing-attributes/geotag" element={<Geotags />} />
          <Route path="/listing-attributes/coupons" element={<Coupons />} />
          <Route path="/listing-attributes/pets" element={<Pets />} />
          <Route path="/page-config" element={<PageConfig />} />
          <Route path="/page-config/:id" element={<PageConfigInnerPage />} />
          <Route path="/payment-gateway" element={<PaymentGateWay />} />
          <Route
            path="/payment-transactions"
            element={<PaymentTransactions />}
          />
          <Route path="/payment-table" element={<PaymentTable />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route
            path="/listing-attributes/processing-fee"
            element={<ProcessingFee />}
          />
          <Route path="/listing-attributes/gift-card" element={<GiftCard />} />
          <Route path="/listing-attributes/faqs" element={<Faqs />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path={`/checkout/:id`} element={<CheckoutId />} />
          <Route path={`/user/:id`} element={<UserID />} />
          <Route
            path="/listing-attributes/extra-services"
            element={<ExtraServices />}
          />
        </Routes>
      </Layout>
    </>
  );
};

export default ProtectedRoutes;
