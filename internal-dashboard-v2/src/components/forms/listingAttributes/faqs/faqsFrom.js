import React, { useEffect, useState } from "react";
import FormInputs from "../../../popup/formInputs";
import Button from "../../../button";
import { getAllRegions } from "../../../../services/regionServices";
import Dialog from "../../../../ui/dialog";
import UploadImage from "../../../../ui/input/uploadImage";


const formList = [
  {
    id: 1,
    type: "text",
    label: "Name",
    apiKey: "name",
    optionsList: "",
  },
  {
    id: 3,
    type: "number",
    label: "Sequence No",
    apiKey: "sequence",
    optionsList: "",
  },
  {
    id: 2,
    type: "text",
    label: "Image",
    apiKey: "image",
    optionsList: "",
    className: "md:w-[75%] lg:w-[85%] my-2",
    buttonValue: true,
  },
  
  {
    id: 4,
    type: "textarea",
    label: "Description",
    apiKey: "description",
    optionsList: "",
  },
];

function FaqsForm({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const [regions, setRegions] = useState([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest({...formData, sequence : parseInt(formData.sequence)});
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

  useEffect(() => {
    getRegions();
  }, []);


  // console.log(formData);
  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            <FormInputs
              objKey="id"
              optionsData={regions}
              label="Regions ID"
              type="select"
              className="w-full mt-2"
              value={formData.region_id}
              onChange={(e) =>
                setFormData({ ...formData, region_id: e.target.value })
              }
            />
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
                      ? { ...formData, [eachItem.apiKey]: e.target.value }
                      : eachItem.apiKey !== "slug"
                        ? { ...formData, [eachItem.apiKey]: e.target.value }
                        : { ...formData }
                  )
                }
              />
              {eachItem?.buttonValue &&
                  <div className="flex self-center justify-end">
                    <Button buttonType="button" onClick={() => setShowUploadDialog((prev) => !prev)} type="secondary" value='Upload' className='mt-8' />
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
      <Dialog parentClass={"no-scrollbar"} childrenClass='w-[400px] h-[280px]' showCreateClick={false} isOpen={showUploadDialog} closeModal={() => setShowUploadDialog((prev) => !prev)}>
        <UploadImage setShowUploadDialog={setShowUploadDialog} setIconPath={(iconPath) => setFormData({ ...formData, image: iconPath })} title={formData.name} />
      </Dialog>
    </div>
  );
}
export default FaqsForm;
