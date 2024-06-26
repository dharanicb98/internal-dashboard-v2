import React, { useState } from "react";
import Button from "../../../components/button";
import FormInputs from "../../../components/popup/formInputs";
import Dialog from "../../../ui/dialog";
import UploadImage from "../../../ui/input/uploadImage";

const formList = [
  {
    id: 1,
    type: "select",
    label: "Parent Type",
    apiKey: "parent_type",
    optionsList: [
      {
        id: 1,
        optionValue: "country",
        name: "Country",
      },
      {
        id: 2,
        optionValue: "destination",
        name: "Destination",
      },
      {
        id: 3,
        optionValue: "region",
        name: "Region",
      },
    ],
  },
  {
    id: 2,
    type: "text",
    label: "Title",
    apiKey: "title",
    optionsList: "",
  },
  {
    id: 3,
    type: "number",
    label: "Sequence No",
    apiKey: "sequence_no",
    optionsList: "",
  },
  {
    id: 4,
    type: "url",
    label: "Link",
    apiKey: "link",
    optionsList: "",
  },

  {
    id: 5,
    type: "text",
    label: "Image Path",
    apiKey: "image_path",
    optionsList: "",
    className: "w-[85%] my-2",
    buttonValue: true,
  },
  {
    id: 6,
    type: "text",
    label: "Icon",
    apiKey: "icon",
    optionsList: "",
    className: "md:w-[75%] lg:w-[85%] my-2",
    buttonValue: true,
  },
  {
    id: 7,
    type: "textarea",
    label: "Description",
    apiKey: "description",
    optionsList: "",
  },
];

function GeoTagsForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest(formData);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
    setFormData(formData);
  };
  // console.log(formData);


const handleShowUpload = (id) => {
  if (id === 5) {
   return setShowImageUpload((prev) => !prev)
  }
  if(id === 6) {
   return setShowUploadDialog((prev) => !prev)
  }
}


console.log("this image render --", showImageUpload , "this is uplaod--", showUploadDialog )

  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            {formList.map((eachItem) => (
              <>
                <FormInputs
                  objKey="optionValue"
                  optionsData={eachItem.optionsList}
                  key={eachItem.id}
                  label={eachItem.label}
                  type={eachItem.type}
                  value={formData[eachItem.apiKey]}
                  className={`${eachItem.className ? eachItem.className : "w-[49%] mt-2"}`}
                  onChange={(e) =>
                    setFormData(
                      createClick
                        ? !eachItem.buttonValue ? { ...formData, [eachItem.apiKey]: e.target.value } : { ...formData }
                        : eachItem.apiKey !== "slug"
                          ? !eachItem.buttonValue ? { ...formData, [eachItem.apiKey]: e.target.value } : { ...formData }
                          : { ...formData }
                    )
                  }
                />
                {eachItem?.buttonValue &&
                  <div className="flex self-center w-[10%] justify-end">
                    <Button key = {eachItem.id + 10} buttonType="button" id = {eachItem.id} onClick={() => handleShowUpload(eachItem.id)} type="secondary" value='Upload' className='mt-8' />
                  </div>
                }
              </>
            ))}
          </div>
          <div className="flex justify-between mt-10">
            <Button type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" />
          </div>
        </form>
      )}
      <Dialog parentClass={"no-scrollbar"} childrenClass='w-[400px] h-[280px]' showCreateClick={false} isOpen={showImageUpload} closeModal={() => setShowImageUpload((prev) => !prev)}>
        <UploadImage setShowUploadDialog={setShowImageUpload} setIconPath={(iconPath) => setFormData({ ...formData, image_path: iconPath })} title={formData.parent_type} />
      </Dialog>
      <Dialog parentClass={"no-scrollbar"} childrenClass='w-[400px] h-[280px]' showCreateClick={false} isOpen={showUploadDialog} closeModal={() => setShowUploadDialog((prev) => !prev)}>
        <UploadImage setShowUploadDialog={setShowUploadDialog} setIconPath={(iconPath) => setFormData({ ...formData, icon: iconPath })} title={formData.title} />
      </Dialog>

    </div>
  );
}
export default GeoTagsForm;
