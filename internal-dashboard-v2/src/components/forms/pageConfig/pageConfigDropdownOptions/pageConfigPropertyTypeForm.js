import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormInputs from "../../../popup/formInputs";
import Button from "../../../button";
import Dialog from "../../../../ui/dialog";
import UploadImage from "../../../../ui/input/uploadImage";
import { getAllRegions } from "../../../../services/regionServices";
import { getAllDestinations } from "../../../../services/destinationsServices";

const formList = [
  {
    id: 2,
    type: "number",
    label: "Sequence No",
    apiKey: "sequence_no",
    optionsList: "",
  },
  {
    id: 3,
    type: "text",
    label: "Image Url",
    apiKey: "image",
    optionsList: "",
  },
];

function PageConfigPropertyTypeForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const categoriesList = useSelector(
    (state) => state.attributes.categories.data
  );
  // console.log(categoriesList);

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
              optionsData={categoriesList}
              label="Category Name"
              type="select"
              className="w-[49%] mt-2"
              required={true}
              value={formData.type_ref_id}
              onChange={(e) => {
                let filteredItem = categoriesList.filter(
                  (each) => each.id === e.target.value
                )[0];
                setFormData({
                  ...formData,
                  type_ref_id: e.target.value,
                  name: filteredItem.name,
                  image: filteredItem.icon_path,
                });
              }}
            />
            {formList.map((eachItem) => (
              <FormInputs
                objKey="optionValue"
                optionsData={eachItem.optionsList}
                key={eachItem.id}
                required={true}
                label={eachItem.label}
                type={eachItem.type}
                value={formData[eachItem.apiKey]}
                className={`${
                  eachItem.apiKey === "image" ? "w-full" : "w-[49%]"
                } mt-2`}
                onChange={(e) =>
                  setFormData(
                    createClick
                      ? {
                          ...formData,
                          [eachItem.apiKey]: e.target.value,
                        }
                      : eachItem.apiKey !== "slug"
                      ? { ...formData, [eachItem.apiKey]: e.target.value }
                      : { ...formData }
                  )
                }
              />
            ))}
          </div>

          <div className="flex self-center justify-start">
            <Button
              buttonType="button"
              onClick={() => setShowUploadDialog((prev) => !prev)}
              type="secondary"
              value="Upload"
              className="mt-1"
            />
          </div>

          <Dialog
            parentClass={"no-scrollbar"}
            childrenClass="w-[400px] h-[280px]"
            showCreateClick={false}
            isOpen={showUploadDialog}
            closeModal={() => setShowUploadDialog((prev) => !prev)}
          >
            <UploadImage
              setShowUploadDialog={setShowUploadDialog}
              setIconPath={(iconPath) =>
                setFormData({ ...formData, image: iconPath })
              }
              title={formData?.name}
            />
          </Dialog>

          <div className="flex justify-between mt-10">
            <Button type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" />
          </div>
        </form>
      )}
    </div>
  );
}
export default PageConfigPropertyTypeForm;
