import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button";
import FormInputs from "../../../components/popup/formInputs";

const formList = [
  {
    id: 1,
    type: "text",
    label: "Name",
    apiKey: "name",
    optionsList: "",
  },
  {
    id: 2,
    type: "select",
    label: "Type",
    apiKey: "type",
    optionsList: [
      {
        id: 1,
        optionValue: "flat",
        name: "Flat",
      },
      {
        id: 2,
        optionValue: "percentage",
        name: "Percentage",
      },
    ],
  },
  {
    id: 3,
    type: "select",
    label: "Per Person",
    apiKey: "per_person",
    optionsList: [
      {
        id: 1,
        optionValue: false,
        name: "false",
      },
      {
        id: 2,
        optionValue: true,
        name: "true",
      },
    ],
  },
  {
    id: 4,
    type: "select",
    label: "Per Night",
    apiKey: "per_night",
    optionsList: [
      {
        id: 1,
        optionValue: false,
        name: "false",
      },
      {
        id: 2,
        optionValue: true,
        name: "true",
      },
    ],
  },
  {
    id: 5,
    type: "select",
    label: "Per Bedroom",
    apiKey: "per_bedroom",
    optionsList: [
      {
        id: 1,
        optionValue: false,
        name: "false",
      },
      {
        id: 2,
        optionValue: true,
        name: "true",
      },
    ],
  },
  {
    id: 6,
    type: "number",
    label: "Value",
    apiKey: "value",
    optionsList: "",
  },
];

function TaxForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const { countryList } = useSelector((state) => state.country);

  // console.log(countryList);

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
            <FormInputs
              objKey="id"
              optionsData={countryList}
              label="Country Name"
              type="select"
              className="w-[49%] mt-2"
              value={formData.country_id}
              onChange={(e) =>
                setFormData({ ...formData, country_id: e.target.value })
              }
            />
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
export default TaxForm;
