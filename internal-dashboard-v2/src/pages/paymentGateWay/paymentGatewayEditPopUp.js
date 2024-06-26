import React, { useState } from "react";
import Button from "../../components/button";
import FormInputs from "../../components/popup/formInputs";
import { useSelector } from "react-redux";

const formList = [
  {
    id: 1,
    type: "text",
    label: "Slug Name",
    apiKey: "slug",
    optionsList: "",
  },
  {
    id: 2,
    type: "text",
    label: "Name",
    apiKey: "name",
    optionsList: "",
  },
  {
    id: 4,
    type: "number",
    label: "Sequence No",
    apiKey: "sequence_no",
    optionsList: "",
  },
  {
    id: 5,
    type: "text",
    label: "Vendor Name",
    apiKey: "vendor_name",
    optionsList: "",
  },
  {
    id: 6,
    type: "text",
    label: "Pg Type",
    apiKey: "pg_type",
    optionsList: "",
  },
  {
    id: 7,
    type: "text",
    label: "Key 1",
    apiKey: "key_1",
    optionsList: "",
  },
  {
    id: 8,
    type: "text",
    label: "Key 2",
    apiKey: "key_2",
    optionsList: "",
  },
  {
    id: 9,
    type: "text",
    label: "Key 3",
    apiKey: "key_3",
    optionsList: "",
  },
  {
    id: 10,
    type: "text",
    label: "Key 4",
    apiKey: "key_4",
    optionsList: "",
  },
  {
    id: 11,
    type: "text",
    label: "Callback Url",
    apiKey: "callback_url",
    optionsList: "",
  },
  {
    id: 12,
    type: "select",
    label: "Active",
    apiKey: "active",
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
];

function PaymentGatewayEditPopUp({
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
    if (formData.country_id && formData.active !== "" && formData.sequence_no) {
      close();
      handleRequest(formData);
      Object.keys(formData).forEach((e) => (formData[e] = ""));
      // console.log("+,,,,,,,,,", formData);
      setFormData(formData);
    }
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
export default PaymentGatewayEditPopUp;
