import React, { useEffect, useState } from "react";
import Button from "../../../components/button";
import FormInputs from "../../../components/popup/formInputs";
import { useSelector } from "react-redux";
import { INPUT_STYLE } from "../../../constants";
import { ChevronDownIcon } from "../../../icons";

const formList = [
  {
    id: 1,
    type: "text",
    label: "Slug Name",
    apiKey: "slug",
    optionsList: [],
  },
  {
    id: 2,
    type: "text",
    label: "Name",
    apiKey: "name",
    optionsList: [],
  },
  //   {
  //     id: 3,
  //     formType: "selectBox",
  //     type: "select",
  //     label: "Country ID",
  //     apiKey: "country_supported",
  //     optionsList: [],
  //   },
  {
    id: 13,
    type: "select",
    label: "Discount Type",
    apiKey: "discount_type",
    optionsList: [
      {
        id: 1,
        optionValue: "percentage",
        name: "Percentage",
      },
      {
        id: 2,
        optionValue: "flat",
        name: "Flat",
      },
    ],
  },
  {
    id: 4,
    type: "number",
    label: "Discount Amount",
    apiKey: "discount_amount",
    optionsList: [],
  },
  {
    id: 6,
    type: "date",
    label: "Expiry Date",
    apiKey: "expiry_date",
    optionsList: [],
  },
  {
    id: 7,
    type: "number",
    label: "Max Usage",
    apiKey: "max_usage",
    optionsList: [],
  },
  {
    id: 9,
    type: "number",
    label: "Min Amount",
    apiKey: "min_amount",
    optionsList: [],
  },
  {
    id: 10,
    type: "number",
    label: "Max Amount",
    apiKey: "max_amount",
    optionsList: [],
  },
];

function CouponsCreateAndEditPopUp({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const { countryList } = useSelector((state) => state.country);
  const [formData, setFormData] = useState({ ...editData });
  const [isShow, setIsShow] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    setSelectedCountries(
      countryList.filter((e) => formData.country_supported.includes(e.id))
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.country_supported && formData.discount_type !== "") {
      close();
      handleRequest(formData);
      Object.keys(formData).forEach((e) => (formData[e] = ""));
      // console.log("+,,,,,,,,,", formData);
      setFormData(formData);
    }
  };

  const handleAddSelectItemButton = (isChecked, item) => {
    if (isChecked) {
      setSelectedCountries((prev) => [...prev, item]);
      setFormData((prev) => ({
        ...prev,
        country_supported: [...prev.country_supported, item.id],
      }));
    } else {
      setSelectedCountries((prev) => [...prev].filter((e) => e.id !== item.id));
      setFormData((prev) => ({
        ...prev,
        country_supported: prev.country_supported.filter((e) => e !== item.id),
      }));
    }
  };
  // console.log(formData, "selectedCountries", selectedCountries);
  // console.log("==========", isShow);
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

            <div
              onClick={() => setIsShow((prev) => !prev)}
              className={`${INPUT_STYLE} h-[50px]  mt-3 flex w-[100%] border-2 rounded items-center`}
            >
              {selectedCountries.length > 0 ? (
                <ul className="overflow-x-auto w-[90%] h-full  flex justify-start pl-2 items-center">
                  {selectedCountries?.map((e) => (
                    <li
                      key={e.id}
                      className="mr-2 px-2 py-1  bg-gray-300 rounded-lg"
                    >
                      <div className=" flex items-center">
                        <p className=" w-max">{e.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="w-[90%] pl-2 text-slate-500">Select</div>
              )}
              <div className="flex-grow  h-full flex justify-center items-center">
                <ChevronDownIcon />
              </div>
            </div>
            <ul className="w-full mt-3 max-h-[250px] overflow-y-auto mb-5">
              {isShow &&
                countryList?.map((eachCountry) => (
                  <li
                    key={eachCountry.id}
                    className="hover:bg-slate-300 px-4 py-2  flex items-center"
                  >
                    <input
                      defaultChecked={formData.country_supported.includes(
                        eachCountry.id
                      )}
                      id={eachCountry.id}
                      type="checkbox"
                      className="cursor-pointer accent-black relative shrink-0 border-[#6B6B6B] border w-6 h-6 rounded bg-white focus:outline-none focus:ring-offset-0 "
                      onChange={(e) =>
                        handleAddSelectItemButton(e.target.checked, eachCountry)
                      }
                    />
                    <label
                      htmlFor={eachCountry.id}
                      className="text-lg text-slate-800 w-full pl-3 cursor-pointer"
                    >
                      {eachCountry.name}
                    </label>
                  </li>
                ))}
            </ul>
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
export default CouponsCreateAndEditPopUp;
