import React, { useState } from "react";
import Button from "../../components/button";
import FormInputs from "../../components/popup/formInputs";

const formList = [
  {
    id: 1,
    formType: "selectBox",
    type: "select",
    label: "Module Name",
    apiKey: "module_name",
    optionsList: [
      {
        id: 1,
        optionValue: "RESERVATIONS",
        name: "Reservations",
      },
      {
        id: 2,
        optionValue: "USERS",
        name: "Users",
      },
      {
        id: 3,
        optionValue: "LISTINGS",
        name: "Listings",
      },
      {
        id: 4,
        optionValue: "PAYMENTS",
        name: "Payments",
      },
    ],
  },
  {
    id: 2,
    formType: "selectBox",
    type: "select",
    label: "Action",
    apiKey: "action",
    optionsList: [
      {
        id: 1,
        optionValue: "GET",
        name: "Get",
      },
      {
        id: 2,
        optionValue: "POST",
        name: "Post",
      },
      {
        id: 3,
        optionValue: "UPDATE",
        name: "Update",
      },
      {
        id: 4,
        optionValue: "DECLINE",
        name: "Decline",
      },
      {
        id: 5,
        optionValue: "CHECKIN",
        name: "Check In",
      },
      {
        id: 6,
        optionValue: "CHECKOUT",
        name: "Check out",
      },
    ],
  },
  {
    id: 3,
    type: "number",
    label: "Delay",
    apiKey: "delay",
    optionsList: "",
  },
  {
    id: 4,
    formType: "selectBox",
    type: "select",
    label: "Priority",
    apiKey: "priority",
    optionsList: [
      {
        id: 1,
        optionValue: "LOW",
        name: "Low",
      },
      {
        id: 2,
        optionValue: "MEDIUM",
        name: "Medium",
      },
      {
        id: 3,
        optionValue: "HIGH",
        name: "High",
      },
    ],
  },
  {
    id: 5,
    type: "url",
    label: "Url",
    apiKey: "url",
    optionsList: "",
  },
  {
    id: 6,
    type: "text",
    label: "Created By(User ID)",
    apiKey: "user_id",
    optionsList: "",
  },
];

function EventModuleForm({
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
          <div className="flex justify-between mt-6">
            <Button type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" />
          </div>
        </form>
      )}
    </div>
  );
}
export default EventModuleForm;
