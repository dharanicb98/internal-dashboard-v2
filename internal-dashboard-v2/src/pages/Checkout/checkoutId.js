import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getCheckout } from "../../services/checkoutServices";
import Button from "../../components/button";
import {formatDate, formatInput } from "../../utils/common";
import {
  InputAmount,
  InputCheckout,
  InputData,
  InputNames,
  InputStatus,
} from "../../constants/checkdata";
import CheckoutEditForm, { RenderCheckoutNames } from "./checkoutEditForm";
import CheckoutPopup from "./checkoutPopup";
import Dialog from "../../ui/dialog";
import Input from "../../components/popup/Input";

const CheckoutId = () => {
  const parms = useParams();
  const [checkoutData, setData] = useState({});
  const [pageLoad, setPageLoad] = useState(false);
  const [pop, setPop] = useState({});
  const location = useLocation();
  const [isPopup, setIspopup] = useState(false);
  const handleClose = () => {
    setIspopup(false);
  };
  // const navigate = useNavigate();
  const [isEdit, setEdit] = useState({
    editNames: false,
    editCheckout: false,
    editCheckStatus: false,
    editPayment: false,
    editCheckoutDetails: false,
    editHostData: false,
  });
  const {
    id,
    eid,
    fname,
    lname,
    email,
    mobile,
    checkin_dt,
    checkout_dt,
    nights,
    booking_id,
    checkout_status,
    payment_type,
    payment_status,
    listing_id,
    listing_data,
    pricing_data,
    payment_gateway,
    payment_amount,
    need_insurance,
    min_part_payment,
    default_account_conversion_rate,
    host_data,
    default_account_currency,
    part_payment_disabled,
    adults,
    childrens,
    pets,
    total_amount,
    amount_paid,
    phone_ext,
    balance_amount,
    system_variable,
    agreement_status,
    customer_id,
    remaining_days,
    host_id,
    rules,
    coupon_code,
    min_payment,
    ref_code,
    reservation_id,
    user_currency,
    booking_status,
  } = checkoutData;

  const priceData = checkoutData?.pricing_data && JSON.parse(checkoutData?.pricing_data)

  const popUpContainer = (updateData) => {
    setPop({ ...pop, updateData: updateData });
  };

  const handleEdit = () => {
    setEdit({
      ...isEdit,
      editCheckout: !isEdit.editCheckout,
    });
  };
  const handleEditPayment = () => {
    setEdit({
      ...isEdit,
      editPayment: !isEdit.editPayment,
    });
  };


  const handleCheckout = () => {
    setEdit({
      ...isEdit,
      editCheckoutDetails: !isEdit.editCheckoutDetails,
    });
  };

  const handleStatus = () => {
    setEdit({
      ...isEdit,
      editCheckStatus: !isEdit.editCheckStatus,
    });
  };

  const handleNames = () => {
    setEdit({
      ...isEdit,
      editNames: !isEdit.editNames,
    });
  };

  const checkoutBookingStatus = [
    { name: "Customer ID", value: customer_id },
    { name: "Host ID", value: host_id },
    { name: "Remaining Days", value: remaining_days },
    { name: "Booking Status", value: booking_status },
    { name: "Payment Status", value: payment_status },
    { name: "Agreement Status", value: agreement_status },
  ];
  const checkoutPricingData = [
    { name: "Checkin Date", value: priceData?.checkInDate },
    { name: "Checkout Date", value: priceData?.checkOutDate },
    { name: "Conversion Rate", value: priceData?.conversion_rate },
    { name: "No of days", value: priceData?.no_of_days },
    { name: "No of guests", value: priceData?.no_of_guests },
    { name: "Notes", value: priceData?.notes, hr: true },
    { name: "Coupon Discount", value: priceData?.coupon_discount },
    { name: "Referral Discount", value: priceData?.referral_discount },
    { name: "Long term discount total", value: priceData?.long_term_discount_total, hr: true },
    { name: "Total Discount", value: priceData?.total_discount, hr: true },
    { name: "Extra Guest Price total", value: priceData?.extra_guest_price_total },
    { name: "Extra Service Price total", value: pricing_data?.extra_service_price_total },
    { name: "Offer price total", value: priceData?.offer_price_total },
    { name: "Platform fee total", value: priceData?.platform_fee_total },
    { name: "Processing fee total", value: priceData?.processing_fee_total },
    { name: "Security deposit total", value: priceData?.security_deposit_total },
    { name: "Tax price total", value: priceData?.tax_price_total, hr: true },
    { name: "Final Price", value: priceData?.final_price },
    { name: "Grand Total", value: priceData?.grand_total },
    { name: "Net Total", value: priceData?.net_total },
    { name: "Total", value: priceData?.total },
  ];

  const checkoutHostData = [
    { name: "First Name", value: host_data?.fname },
    { name: "Last Name", value: host_data?.lname },
    { name: "Date of birth", value: host_data?.dob },
    { name: "Email", value: host_data?.email },
    { name: "Mobile", value: host_data ? `${[host_data?.mobile_ext, host_data?.mobile].join(" ")}` : " " },
    // { name: "mobile_ext", value: host_data?.mobile_ext },
    { name: "Gender", value: host_data?.gender },
    { name: "Languages", value: host_data?.languages },
    { name: "Bio", value: host_data?.bio },
    // { name: "user_avatar", value: host_data?.user_avatar },
  ];



  const checkoutListingAddress = [
    { name: "House", value: listing_data?.address?.house },
    { name: "Area", value: listing_data?.address?.area },
    { name: "Street", value: listing_data?.address?.street },
    { name: "State", value: listing_data?.address?.state },
    { name: "Country", value: listing_data?.address?.country },
    { name: "Pin code", value: listing_data?.address?.pin },
    { name: "Landmark", value: listing_data?.address?.landmark },
    { name: "Full Address", value: listing_data?.address?.full_address },
    { name: "House Rules", value: rules },
    { name: "Region", value: listing_data?.address?.region },
    { name: "Destination", value: listing_data?.address?.destination },
    { name: "Country ID", value: listing_data?.address?.country_id },
    { name: "Checkin", value: listing_data?.check_in_ins },
    { name: "Checkin time", value: listing_data?.check_in_time },
    { name: "Checkout time", value: listing_data?.check_out_time },
    { name: "Currency", value: listing_data?.currency },
    { name: "Listing Country", value: listing_data?.listing_country },
    { name: "Listing ID", value: listing_id },
    { name: "Listing Country ID", value: listing_data?.listing_country_id },
  ];


  const checkoutStatus = [
    { name: "Checkout ID", value: id },
    { name: "Order ID", value: booking_id },
    { name: "Checkout Status", value: checkout_status },
    { name: "Payment Type", value: payment_type },
    { name: "Payment Status", value: payment_status },
  ];

  const checkoutNames = [
    { name: "Checkin", value: formatDate(checkin_dt), className: "mt-6" },
    { name: "Checkout", value: formatDate(checkout_dt) },
    { name: "Childrens", value: childrens },
    { name: "Pets", value: pets },
    { name: "Total Guests", value: adults },
    { name: "nights", value: nights },
  ];

  const checkoutSystemVariable = [
    { name: "Part payment enable after", value: system_variable && system_variable[" part_payment_enable_after"] },
    { name: "Cancellation divisor", value: system_variable?.cancellation_divisor },
    { name: "Current channel listing index", value: system_variable?.current_channel_listing_index },
    { name: "Enable part payment", value: system_variable?.enable_part_payment },
    { name: "Min part payment amount", value: system_variable?.min_part_payment_amount },
    { name: "Min payment pct", value: system_variable?.min_payment_pct },
    { name: "Min Repayment Amount", value: system_variable?.min_repayment_amount },
    { name: "Min Repayment Pct", value: system_variable?.min_repayment_pct, hr: true },
    {
      name: "Ref Affiliate Discount Pct",
      value: system_variable?.ref_affiliate_discount_pct,
    },
    { name: "Ref Customer Discount Pct", value: system_variable?.ref_customer_discount_pct },
  ];

  const paymentType = [
    { name: "Payment Gateway", value: payment_gateway },
    { name: "Payment Amount", value: payment_amount },
    { name: "Minimum part payment", value: min_part_payment },
    { name: "Paid Amount", value: amount_paid },
    { name: "Minimum payment", value: min_payment },
    { name: "Coupon code", value: coupon_code },
    { name: "Refer code", value: ref_code },
    { name: "Balence amount", value: balance_amount },
    { name: "Total Amount", value: total_amount },
    { name: "Reservation ID", value: reservation_id },
    { name: "Need Insurance", value: need_insurance, hr: true },
    {
      name: "Default account conversion rate",
      value: default_account_conversion_rate,
    },
    {
      name: "User currency",
      value: user_currency,
    },
    {
      name: "Default account currency",
      value: default_account_currency,
      hr: true,
    },
    { name: "Part payment disabled", value: part_payment_disabled },
  ];

  const getData = async () => {
    try {
      const response = await getCheckout(parms.id);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);

  const renderNames = () => {
    return (
      <>
        <div>
          <p className="font-medium text-md mb-2 border-b-2">First Name:</p>
          <p className="text-slate-700">{fname ? fname : ""}</p>
        </div>
        <div>
          <p className="font-medium text-md mb-2 border-b-2">Last Name:</p>
          <p className="text-slate-700">{lname ? lname : ""}</p>
        </div>
        <div>
          <p className="font-medium text-md mb-2 border-b-2">Email</p>
          <p className="text-slate-700">{email ? email : ""}</p>
        </div>
        <div>
          <p className="font-medium text-md mb-2 border-b-2">Phone Number:</p>
          <p className="text-slate-700">
            {mobile ? phone_ext + " " + mobile : ""}
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            type="black"
            value="Edit"
            onClick={() => setEdit({ ...isEdit, editNames: !isEdit.editNames })}
          />
        </div>
      </>
    );
  };

  const onPopupActionChange = (e) => {
    setIspopup(e);
  };

  return (
    <div className="h-screen overflow-y-auto mb-20">
      <div className="m-3 min-h-screen scrollbar-hide overflow-y-auto">
        <div className="flex justify-between self-center m-4">
          <h1 className="text-2xl font-semibold">
            Checkout{" "}
            {checkoutData.fname && checkoutData.lname && checkoutData?.fname + " " + checkoutData?.lname}
          </h1>
          {/* <Button type="primary" value="Make Payment"  onClick={handleCreateOpen} className="animeBtn"
        /> */}
        </div>
        <div className="flex flex-col m-3">
          <div className="xl:ml-[120px]">
            <div className="w-full xl:w-[88%] drop-shadow flex-wrap bg-white rounded py-8">
              <div className="w-[95%] px-3 flex justify-around items-center">
                {isEdit.editNames ? (
                  <CheckoutEditForm
                    formData={{
                      fname: fname ? fname : "",
                      lname: lname ? lname : "",
                      email: email ? email : "",
                      phone_ext: phone_ext ? phone_ext : "",
                      mobile: mobile ? mobile : "",
                    }}
                    InputData={InputNames}
                    isEdit={isEdit.editNames}
                    onClick={handleNames}
                    popUpContainer={popUpContainer}
                    onPopupAction={(e) => onPopupActionChange(e)}
                  />
                ) : (
                  renderNames()
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="mt-12">
                {isEdit.editCheckout ? (
                  <CheckoutEditForm
                    formData={{
                      checkin_dt: checkin_dt ? formatInput(checkin_dt) : "",
                      checkout_dt: checkout_dt ? formatInput(checkin_dt) : "",
                      childrens: childrens ? childrens : "",
                      pets: pets ? pets : "",
                      adults: adults ? adults : "",
                      nights: nights ? nights : "",
                    }}
                    InputData={InputData}
                    isEdit={isEdit.editCheckout}
                    onClick={handleEdit}
                    popUpContainer={popUpContainer}
                    onPopupAction={(e) => onPopupActionChange(e)}
                  />
                ) : (
                  <RenderCheckoutNames
                    checkoutStatus={checkoutNames}
                    handleEdit={handleEdit}
                    readButton={true}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="mt-12">
                {isEdit.editCheckoutDetails ? (
                  <div>
                    <RenderCheckoutNames
                      checkoutStatus={checkoutStatus.slice(
                        0,
                        InputCheckout.length - 1
                      )}
                      handleEdit={handleCheckout}
                    />
                    <CheckoutEditForm
                      formData={{
                        checkout_status: checkout_status ? checkout_status : "",
                        payment_type: payment_type ? payment_type : "",
                        payment_status: payment_status ? payment_status : "",
                      }}
                      InputData={InputCheckout}
                      isEdit={isEdit.editCheckoutDetails}
                      onClick={handleCheckout}
                      popUpContainer={popUpContainer}
                      onPopupAction={(e) => onPopupActionChange(e)}
                    />
                  </div>
                ) : (
                  <RenderCheckoutNames
                    checkoutStatus={checkoutStatus}
                    handleEdit={handleCheckout}
                    readButton={true}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="mt-12">
                <RenderCheckoutNames
                  checkoutStatus={checkoutPricingData}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="mt-12">
                {isEdit.editPayment ? (
                  <div>
                    <CheckoutEditForm
                      formData={{
                        amount_paid: amount_paid ? amount_paid : "",
                        payment_gateway: payment_gateway ? payment_gateway : "",
                        payment_amount: payment_amount ? payment_amount : "",
                        min_part_payment: min_part_payment ? min_part_payment : "",
                      }}
                      InputData={InputAmount}
                      isEdit={isEdit.editPayment}
                      onClick={handleEditPayment}
                      popUpContainer={popUpContainer}
                      onPopupAction={(e) => onPopupActionChange(e)}
                    />
                    <RenderCheckoutNames
                      checkoutStatus={paymentType.slice(InputAmount.length)}
                      handleEdit={handleEditPayment}
                      readButton={!isEdit.editPayment}
                    />
                  </div>
                ) : (
                  <RenderCheckoutNames
                    checkoutStatus={paymentType}
                    handleEdit={handleEditPayment}
                    readButton={!isEdit.editPayment}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="mt-12">
                <RenderCheckoutNames
                  checkoutStatus={checkoutSystemVariable}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="mt-12">
                {isEdit.editCheckStatus ? (
                  <div>
                    <CheckoutEditForm
                      formData={{
                        booking_status: booking_status ? booking_status : "",
                        payment_status: payment_status ? payment_status : "",
                        agreement_status: agreement_status ? agreement_status : "",
                      }}
                      InputData={InputStatus}
                      isEdit={isEdit.editCheckStatus}
                      onClick={handleStatus}
                      popUpContainer={popUpContainer}
                      onPopupAction={(e) => onPopupActionChange(e)}
                    />
                    <RenderCheckoutNames
                      checkoutStatus={checkoutBookingStatus.slice(
                        0,
                        InputStatus.length
                      )}
                      handleEdit={handleStatus}
                      readButton={!isEdit.editCheckStatus}
                    />
                  </div>
                ) : (
                  <RenderCheckoutNames
                    checkoutStatus={checkoutBookingStatus}
                    handleEdit={handleStatus}
                    readButton={!isEdit.editCheckStatus}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="mt-12">
                <RenderCheckoutNames
                  checkoutStatus={checkoutHostData}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
              <div className="flex flex-col items-center">
                <h1 className="my-4 text-gray-900 text-[20px] font-bold">{`${listing_data?.title}`}</h1>
                <img src={`${process.env.REACT_APP_CDN_URL}${listing_data?.media?.file_path}`} alt={`${listing_data?.title}`} className="w-[40%] h-[180px] text-center" />
              </div>
              <div className="mt-12">
                <RenderCheckoutNames
                  checkoutStatus={checkoutListingAddress}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-4/5 items-center flex justify-between flex-wrap bg-white rounded p-3 drop-shadow mx-auto">
              <div className="text-blue-400 hover:underline cursor-pointer py-2  rounded-md">
                <a
                  target="_blank"
                  href={`${process.env.REACT_APP_WEBSITE_URL}/checkout/${eid}`}
                >{`${process.env.REACT_APP_WEBSITE_URL}/checkout/${eid}`}</a>
              </div>
              <div className="right-2">
                <Input
                  type={"select"}
                  // placeholder={"Send Email"}
                  optionName={"Send Email"}
                  ModuleName={[
                    { name: "Incomplete Checkout", value: checkout_status },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        {isPopup && (
          <Dialog
            closeModal={handleClose}
            isOpen={isPopup}
            title={"Order"}
            childrenClass={"w-[50%] max-h-[60%] p-6 rounded-md overflow-auto no-scrollbar dark-scrollbar"}
            >
            <CheckoutPopup
              value={"Update"}
              formData={pop.updateData}
              putID={id}
              close={handleClose}
              setPageLoad = {(item) => setPageLoad(item)}
              isOpen={isPopup}
              data={checkoutData && checkoutData}
            />
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CheckoutId;
