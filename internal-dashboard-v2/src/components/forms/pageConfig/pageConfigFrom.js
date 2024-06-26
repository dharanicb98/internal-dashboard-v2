import React, { useEffect, useState } from "react";
import Button from "../../button";
import FormInputs from "../../popup/formInputs";
import { getAllRegions } from "../../../services/regionServices";
import { useSelector } from "react-redux";
import { getAllDestinations } from "../../../services/destinationsServices";

const formList = [
  {
    id: 4,
    type: "text",
    label: "Slug",
    apiKey: "slug",
  },
  {
    id: 1,
    formType: "selectBox",
    type: "select",
    label: "Page Type",
    apiKey: "page_type",
    optionsList: [
      {
        id: 1,
        optionValue: "country",
        name: "Country",
      },
      {
        id: 2,
        optionValue: "region",
        name: "Region",
      },
      {
        id: 3,
        optionValue: "destination",
        name: "Destination",
      },
    ],
  },
  {
    id: 3,
    type: "currency",
    label: "Default currency",
    apiKey: "default_currency",
    optionsList: "",
  },
];

function PageConfigFrom({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const [regions, setRegions] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const { countryList } = useSelector((state) => state.country);
  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    let obj = {};
    Object.keys(formData).forEach((eachkey) => {
      if (formData[eachkey] !== editData[eachkey]) {
        obj[eachkey] = formData[eachkey];
      }
    });
    if (createClick || Object.keys(obj).length > 0) {
      handleRequest(createClick ? formData : obj); // send the obj data(edit)-keys for API which is changed
    }
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    setFormData(formData);
  };

  const getRegions = async () => {
    try {
      const response = await getAllRegions();
      // console.log(response.data.data);
      setRegions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDestinations = async () => {
    try {
      const response = await getAllDestinations();
      // console.log(response.data.data, "destination");
      setDestinations(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegions();
    getDestinations();
  }, []);

  const renderSelectOption = () => {
    switch (formData.page_type) {
      case "country":
        return countryList;
      case "destination":
        return destinations;
      default:
        return regions;
    }
  };

  const renderSelectIds = () => {
    // console.log("renderSelectIds Called");
    switch (formData.page_type) {
      case "country":
        return "country_ref_id";
      case "destination":
        return "destination_ref_id";
      default:
        return "region_ref_id";
    }
  };
  const handleOnChange = (e, key) => {
    let copyData;
    createClick
      ? (copyData = {
          ...formData,
          [key]: e.target.value,
        })
      : key !== "slug"
      ? (copyData = { ...formData, [key]: e.target.value })
      : (copyData = { ...formData });

    delete copyData?.destination_ref_id;
    delete copyData?.region_ref_id;
    delete copyData?.country_ref_id;
    setFormData(copyData);
  };

  // console.log("data in the form", formData);

  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            {formList.map((eachItem) => (
              <FormInputs
                objKey="optionValue"
                optionsData={eachItem?.optionsList}
                key={eachItem.id}
                required={true}
                label={eachItem.label}
                type={eachItem.type}
                value={formData[eachItem.apiKey]}
                className="w-[49%] mt-2"
                onChange={(e) => {
                  handleOnChange(e, eachItem.apiKey);
                  // setFormData(
                  //   createClick
                  //     ? {
                  //         ...formData,
                  //         [eachItem.apiKey]: e.target.value,
                  //       }
                  //     : eachItem.apiKey !== "slug"
                  //     ? { ...formData, [eachItem.apiKey]: e.target.value }
                  //     : { ...formData }
                  // );
                }}
              />
            ))}
            <FormInputs
              objKey="id"
              optionsData={renderSelectOption()}
              label={`${
                formData.page_type.charAt(0).toUpperCase() +
                  formData.page_type.slice(1) || "Selected Page"
              }`}
              type="select"
              className="w-[49%] mt-2"
              value={formData[renderSelectIds()]}
              onChange={(e) => {
                setFormData({
                  page_type: formData.page_type,
                  slug: formData.slug,
                  default_currency: formData.default_currency,
                  [renderSelectIds()]: e.target.value,
                });
              }}
            />
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
export default PageConfigFrom;
