import React, { useState } from "react";
import Button from "../../components/button";
import FormInputs from "../../components/popup/formInputs";

const formList = [
  {
    id: 1,
    type: "text",
    label: "Full Name",
    apiKey: "full_name",
    optionsList: "",
  },
  {
    id: 2,
    type: "text",
    label: "Email",
    apiKey: "email",
    optionsList: "",
  },
  {
    id: 3,
    type: "number",
    label: "Phone Number",
    apiKey: "phone_number",
    optionsList: "",
  },
  // {
  //   id: 4,
  //   type: "number",
  //   label: "Phone Number",
  //   apiKey: "phone_number",
  //   optionsList: "",
  // },
  {
    id: 5,
    type: "number",
    label: "Postal Code",
    apiKey: "postal_code",
    optionsList: "",
  },
  {
    id: 6,
    type: "number",
    label: "Amount",
    apiKey: "amount",
    optionsList: "",
  },
  
];

function PaymentTransactionsForm({
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
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
    setFormData(formData);
  };
  // console.log(formData);
  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            {formList.map((eachItem) => (
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
            ))}
          </div>
          <div className="flex justify-between mt-10">
            <Button type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" />
          </div>
        </form>
      )}
    </div>
  );
}
export default PaymentTransactionsForm;

