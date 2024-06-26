import React, { useState } from "react";
import Button from "../../components/button";
import FormInputs from "../../components/popup/formInputs";

const formList = [
    {
        id: 1,
        type: "select",
        label: "Payment Method",
        apiKey: "payment_method",
        optionsList: [
            {
              id: 1,
              optionValue: "flat",
              name: "Flat",
            },
            {
              id: 2,
              optionValue: "parcentage",
              name: "Percentage",
            },
        ],
      },
  {
    id: 2,
    type: "select",
    label: "Payment Status",
    apiKey: "payment_status",
   optionsList: [
        {
          id: 1,
          optionValue: "COMPLETED",
          name: "Completed",
        },
        {
          id: 2,
          optionValue: "INCOMPLETED",
          name: "Incompleted",
        },
        {
          id: 3,
          optionValue: "PENDING",
          name: "Pending",
        },
      ],
  },
  {
    id: 3,
    type: "number",
    label: "Amount",
    apiKey: "amount",
    optionsList: "",
  },
  {
    id: 4,
    type: "date",
    label: "Payment Date",
    apiKey: "payment_date",
    optionsList: "",
  },
  {
    id: 5,
    type: "textarea",
    label: "Reason",
    apiKey: "reason",
    optionsList: "",
  },
  {
    id: 6,
    type: "textarea",
    label: "Description",
    apiKey: "description",
    optionsList: "",
  },
  
];

function PaymentTableForm({
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
export default PaymentTableForm;

