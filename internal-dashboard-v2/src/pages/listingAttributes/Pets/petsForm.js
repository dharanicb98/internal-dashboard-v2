import React, { useState } from "react";
import Button from "../../../components/button";
import FormInputs from "../../../components/popup/formInputs";
import Dialog from "../../../ui/dialog";
import UploadImage from "../../../ui/input/uploadImage";

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
    label: "Pet Name",
    apiKey: "name",
    optionsList: "",
  },
  {
    id: 3,
    type: "number",
    label: "Sequence No",
    apiKey: "sequence_no",
    optionsList: "",
    className: "w-full",
  },
  {
    id: 4,
    type: "text",
    label: "Image Path",
    apiKey: "image_path",
    optionsList: "",
    className: "md:w-[75%] lg:w-[85%] my-2",
    buttonValue: true,
  },
  
];

function PetsForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const [showUploadDialog, setShowUploadDialog] = useState(false);

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
                    <Button buttonType="button" onClick={() => setShowUploadDialog((prev) => !prev)} type="secondary" value='Upload' className='mt-8' />
                  </div>
                }
              </>
            ))}
          </div>
          <div className="flex justify-between w-[10%] mt-10">
            <Button type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" />
          </div>
        </form>
      )}
      <Dialog parentClass={"no-scrollbar"} childrenClass='w-[400px] h-[280px]' showCreateClick={false} isOpen={showUploadDialog} closeModal={() => setShowUploadDialog((prev) => !prev)}>
        <UploadImage setShowUploadDialog={setShowUploadDialog} setIconPath={(iconPath) => setFormData({ ...formData, image_path: iconPath })} title={formData.name} />
      </Dialog>
    </div>
  );
}
export default PetsForm;