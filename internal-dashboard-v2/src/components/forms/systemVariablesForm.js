import React, { useState } from "react";
import Button from "../button";
import FormInputs from "../popup/formInputs";

const formList = [
  {
    id: 1,
    type: "number",
    label: "User Id",
    apiKey: "user_id",
    optionsList: "",
  },
  {
    id: 2,
    formType: "selectBox",
    type: "select",
    label: "Encrypted",
    apiKey: "encrypted",
    optionsList: [
      {
        id: 1,
        optionValue: 0,
        name: "false",
      },
      {
        id: 2,
        optionValue: 1,
        name: "true",
      },
    ],
  },

  {
    id: 3,
    formType: "selectBox",
    type: "select",
    label: "Group",
    apiKey: "group_id",
    optionsList: [
      {
        id: 1,
        optionValue: 1,
        name: "Group 1",
      },
      {
        id: 2,
        optionValue: 2,
        name: "Group 2",
      },
      {
        id: 3,
        optionValue: 3,
        name: "Group 3",
      },
    ],
  },

  {
    id: 4,
    type: "text",
    label: "Key Name",
    apiKey: "sys_key",
    optionsList: "",
  },
  {
    id: 5,
    type: "text",
    label: "Value",
    apiKey: "sys_value",
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

function SystemVariablesForm({
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
export default SystemVariablesForm;
