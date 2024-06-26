import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormInputs from "../../popup/formInputs";
import Button from "../../button";
import { getAllDestinations } from "../../../services/destinationsServices";
import { getAllRegions } from "../../../services/regionServices";
import Dialog from "../../../ui/dialog";
import UploadImage from "../../../ui/input/uploadImage";

const formList = [
  {
    id: 1,
    type: "select",
    label: "Type",
    apiKey: "item_type",
    optionsList: [
      {
        id: 1,
        optionValue: "destination",
        name: "Destination",
      },
      {
        id: 2,
        optionValue: "region",
        name: "Region",
      },
    ],
  },
  {
    id: 2,
    type: "number",
    label: "Sequence No",
    apiKey: "item_sequence",
    optionsList: "",
  },
  {
    id: 3,
    type: "text",
    label: "Image Url",
    apiKey: "item_image",
    optionsList: "",
  },
];

function PageConfigFeaturedDestinationForm({
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
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const region = useSelector((state) => state);
  console.log(region);
  // console.log(countryList);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest(formData);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
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
    switch (formData.item_type) {
      case "region":
        return regions;
      case "destination":
        return destinations;
      default:
        return;
    }
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
                required={true}
                value={formData[eachItem.apiKey]}
                className="w-[49%] mt-2"
                onChange={(e) =>
                  setFormData(
                    createClick
                      ? {
                          ...formData,
                          [eachItem.apiKey]: e.target.value,
                          item_ref_id: "",
                        }
                      : eachItem.apiKey !== "slug"
                      ? { ...formData, [eachItem.apiKey]: e.target.value }
                      : { ...formData }
                  )
                }
              />
            ))}
            <FormInputs
              objKey="id"
              optionsData={renderSelectOption()}
              required={true}
              label={`${
                formData?.item_type?.charAt(0).toUpperCase() +
                  formData?.item_type?.slice(1) || "Selected Type"
              }`}
              type="select"
              className="w-[49%] mt-2"
              value={formData.item_ref_id}
              onChange={(e) => {
                let filteredItem = renderSelectOption().filter(
                  (each) => each.id === e.target.value
                )[0];
                setFormData({
                  ...formData,
                  item_ref_id: e.target.value,
                  item_label: filteredItem.name,
                  item_image: filteredItem.icon_path,
                });
              }}
            />
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
                setFormData({ ...formData, item_image: iconPath })
              }
              title={formData.name}
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
export default PageConfigFeaturedDestinationForm;
