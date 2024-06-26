import React, { useState } from "react";
import Button from "../../components/button";
import FormInputs from "../../components/popup/formInputs";

const formList = [
  {
    id: 1,
    type: "number",
    label: "User ID",
    apiKey: "user_id",
    optionsList: "",
  },
  {
    id: 2,
    type: "select",
    label: "Active",
    apiKey: "is_active",
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
    type: "text",
    label: "Referral Code",
    apiKey: "ref_code",
    optionsList: "",
  },
  {
    id: 4,
    type: "number",
    label: "Customer Discount",
    apiKey: "customer_discount",
    optionsList: "",
  },
  {
    id: 5,
    type: "number",
    label: "Affiliate Comission",
    apiKey: "affiliate_comission",
    optionsList: "",
  },
];

function AffliateReferrelsForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
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
export default AffliateReferrelsForm;
