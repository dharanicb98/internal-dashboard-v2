import React, { useState } from "react";

import { useSelector } from "react-redux";
import FormInputs from "../../../popup/formInputs";
import Button from "../../../button";

function PageConfigAmenitiesHighlightsForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const amenitiesData = useSelector(
    (state) => state?.attributes?.amenities?.data
  );
  // console.log(amenitiesData);
  // console.log(countryList);

  const handleSubmit = (e) => {
    e.preventDefault();

    close();
    handleRequest(formData);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
    setFormData(formData);
  };
  console.log(formData);
  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            <FormInputs
              objKey="id"
              required={true}
              optionsData={amenitiesData}
              label="Country Name"
              type="select"
              className="w-[49%] mt-2"
              value={formData.ref_id}
              onChange={(e) => {
                let filteredItem = amenitiesData.filter(
                  (each) => each.id === e.target.value
                )[0];
                setFormData({
                  ...formData,
                  ref_id: e.target.value,
                  name: filteredItem.name,
                });
              }}
            />
            <FormInputs
              objKey="id"
              label="Sequence No"
              required={true}
              type="number"
              className="w-[49%] mt-2"
              value={formData.sequence}
              onChange={(e) =>
                setFormData({ ...formData, sequence: e.target.value })
              }
            />
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
export default PageConfigAmenitiesHighlightsForm;
