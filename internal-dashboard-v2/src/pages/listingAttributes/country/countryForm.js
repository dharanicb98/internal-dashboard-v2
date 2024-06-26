import React, { useEffect, useState } from "react";
import { getAllContinent } from "../../../services/continentServices";
import Button from "../../../components/button";
import FormInputs from "../../../components/popup/formInputs";

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
];

function CountryForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const [continent, setcontinent] = useState([]);

  // console.log(countryList);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest(formData);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
    setFormData(formData);
  };

  const getContinent = async () => {
    try {
      const response = await getAllContinent();
      setcontinent(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContinent();
  }, []);

  // console.log(formData);
  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            <FormInputs
              objKey="id"
              optionsData={continent}
              label="Continent Name"
              type="select"
              className="w-[49%] mt-2"
              value={formData.parent_id || ""}
              onChange={(e) =>
                setFormData({ ...formData, parent_id: e.target.value })
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
export default CountryForm;
