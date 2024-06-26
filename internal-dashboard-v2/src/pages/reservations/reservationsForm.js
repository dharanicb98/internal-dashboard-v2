import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import FormInputs from "../../components/popup/formInputs";

const formList = [
  {
    id: 1,
    type: "select",
    label: "Payment Status",
    apiKey: "payment_status",
    optionsList: [
      {
        id: 1,
        optionValue: "pending",
        name: "Pending",
      },
      {
        id: 2,
        optionValue: "completed",
        name: "Completed",
      },
      {
        id: 3,
        optionValue: "cancelled",
        name: "Cancelled",
      },
    ],
  },
  {
    id: 2,
    type: "select",
    label: "Booking Status",
    apiKey: "booking_status",
    optionsList: [
      {
        id: 1,
        optionValue: "pending",
        name: "Pending",
      },
      {
        id: 2,
        optionValue: "completed",
        name: "Completed",
      },
      {
        id: 3,
        optionValue: "cancelled",
        name: "Cancelled",
      },
    ],
  },
  {
    id: 3,
    type: "date",
    label: "Cancellation_Reminder_Dt",
    apiKey: "cancellation_reminder_dt",
    optionsList: "",
  },
  {
    id: 4,
    type: "date",
    label: "Final_Payment_Reminder_Dt",
    apiKey: "final_payment_reminder_dt",
    optionsList: "",
  },
];
const ReservationsForm = ({
  close,
  updateData,
  handleRequest,
  value,
  createClick,
}) => {
  let [checkout, setCheckout] = useState([]);
  const [formData, setFormData] = useState(updateData);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    let updatedFormData = checkout.filter(
      (e) => e.id === parseInt(formData.checkout_id)
    )[0];
    // console.log("updatedFormData", updatedFormData);
    handleRequest(updatedFormData);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
    setFormData(formData);
  };

  const getCheckout = async () => {
    try {
      const response = await axios.post(
        `https://rentmyhotel.com/api/v2/checkout/query`
      );
      // console.log("checkout", response);
      setCheckout(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCheckout();
  }, []);
  console.log("checkout", checkout, formData);
  // checkout = checkout.map((e) => ({ name: e.id, id: e.id }));
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between flex-wrap">
          {createClick ? (
            <FormInputs
              objKey="id"
              optionsData={checkout}
              label="Continent"
              type="select"
              className="w-[100%] mt-2"
              value={formData.checkout_id}
              defaultkey="false"
              onChange={(e) =>
                setFormData({ ...formData, checkout_id: e.target.value })
              }
            />
          ) : (
            formList.map((eachItem) => (
              <FormInputs
                objKey="optionValue"
                optionsData={eachItem.optionsList}
                key={eachItem.id}
                label={eachItem.label}
                type={eachItem.type}
                value={formData[eachItem.apiKey]}
                className="w-[49%] mt-2"
                onChange={(e) =>
                  setFormData(
                    createClick
                      ? { ...formData, [eachItem.apiKey]: e.target.value }
                      : eachItem.apiKey !== "slug"
                      ? { ...formData, [eachItem.apiKey]: e.target.value }
                      : { ...formData }
                  )
                }
              />
            ))
          )}
        </div>
        <div className="flex justify-between mt-10">
          <Button type="outline" value="Cancel" onClick={close} />
          <Button buttonType="submit" value={value} type="secondary" />
        </div>
      </form>
    </div>
  );
};

export default ReservationsForm;
