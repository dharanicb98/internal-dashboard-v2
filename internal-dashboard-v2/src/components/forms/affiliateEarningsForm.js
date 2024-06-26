import React, { useState } from "react";
import Button from "../../components/button";
import FormInputs from "../../components/popup/formInputs";

const formList = [
  {
    id: 1,
    type: "number",
    label: "Customer ID",
    apiKey: "customer_id",
    optionsList: "",
    required: true,
  },
  {
    id: 2,
    type: "email",
    label: "Customer Email",
    apiKey: "customer_email",
    optionsList: "",
    required: true,
  },
  {
    id: 3,
    type: "number",
    label: "Ref Code",
    apiKey: "ref_code",
    optionsList: "",
    required: true,
  },
  {
    id: 4,
    type: "number",
    label: "Ref Owner ID",
    apiKey: "ref_owner_id",
    optionsList: "",
    required: true,
  },
  {
    id: 5,
    type: "number",
    label: "Ref Amount",
    apiKey: "ref_amount",
    required: true,
    optionsList: "",
  },
  {
    id: 6,
    type: "currency",
    label: "Ref Currency",
    apiKey: "ref_currency",
    optionsList: "",
    defaultValue : "",
    required: true,
  },
  {
    id: 7,
    type: "number",
    label: "Reservation ID",
    apiKey: "reservation ID",
    optionsList: "",
    required: true,
  },
  {
    id: 8,
    type: "number",
    label: "Checkout ID",
    apiKey: "checkout_id",
    optionsList: "",
    required: true,
  },
  {
    id: 9,
    type: "number",
    label: "Booking Amount",
    apiKey: "booking_amount",
    optionsList: "",
    required: true,
  },
  {
    id: 10,
    type: "currency",
    label: "Booking Currency",
    apiKey: "booking_currency",
    optionsList: "",
    defaultValue : "",
    required: true,
  },
  
  {
    id: 11,
    type: "select",
    label: "Booking Status",
    apiKey: "booking_status",
    required: true,
    // className : "w-[45%]",
    optionsList: [
      {
        id: 1,
        optionValue: 0,
        name: "Pending",
      },
      {
        id: 2,
        optionValue: 1,
        name: "Check In",
      },
      {
        id: 3,
        optionValue: 2,
        name: "Check Out",
      },
    ],
  },
]

function AffiliateForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest(formData);
    let obj = {}
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    Object.keys(formData).forEach(eachkey => {
      if (formData[eachkey] !== editData[eachkey]) {
        obj[eachkey] = formData[eachkey]
      }
    })
    handleRequest(createClick ? formData : obj); // send the obj data(edit)-keys for API which is changed 
    setFormData(formData);
  };
  
  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            {formList.map((eachItem) => (
              <FormInputs
                objKey="optionValue"
                optionsData={eachItem.optionsList}
                defaultValue = {(currency)=> eachItem.defaultValue &&  formData[eachItem.apiKey] === currency ? true : false}
                required={createClick && eachItem.required}
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
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" />
          </div>
        </form>
      )}
    </div>
  );
}
export default AffiliateForm;
