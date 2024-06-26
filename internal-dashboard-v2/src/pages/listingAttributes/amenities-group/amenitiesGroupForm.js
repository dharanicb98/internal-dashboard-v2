import React, { useState } from "react";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import { useDispatch } from "react-redux";
import {
  createAmentiesGroup,
  updateAmentiesGroup,
} from "../../../services/amenities-groupServices";
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
    label: "Name",
    apiKey: "name",
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
    label: "Icon Path",
    apiKey: "icon_path",
    optionsList: "",
  },
];

const AmenitiesGroupForm = ({
  updateData,
  setPageLoad,
  hidePopup,
  btn,
  createClick,
  isEdit,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...updateData });
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const editApiHandler = async () => {
    const { id, name, slug, icon_path, sequence_no } = formData;
    dispatch(loaderStart());
    try {
      const response = await updateAmentiesGroup({
        id,
        name,
        slug,
        icon_path,
        sequence_no,
      });
      dispatch(loaderSuccess());
      setPageLoad((prev) => !prev);
    } catch (error) {
      dispatch(error(error?.response?.data?.error?.message));
    }
  };

  const createApiHandler = async () => {
    // console.log("createApi", formData);
    dispatch(loaderStart());
    try {
      const response = await createAmentiesGroup(formData);
      dispatch(loaderSuccess());
      setPageLoad((prev) => !prev);
    } catch (error) {
      dispatch(error(error?.response?.data?.error?.message));
    }
  };

  return (
    <div>
      {isEdit && (
        <form>
          <div className="flex justify-between flex-wrap">
            {formList.map((eachItem) => (
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
                      ? eachItem.apiKey !== "icon_path" ? { ...formData, [eachItem.apiKey]: e.target.value } : { ...formData }
                      : eachItem.apiKey !== "slug"
                        ? eachItem.apiKey !== "icon_path" ? { ...formData, [eachItem.apiKey]: e.target.value } : { ...formData }
                        : { ...formData }
                  )
                }
              />
            ))}
          </div>
          <div className="flex self-center justify-end">
              <Button buttonType="button" onClick={() => setShowUploadDialog((prev) => !prev)} type="secondary" value='Upload' className='mt-1' />
            </div>
          <div className="flex justify-between mt-10">
            <Button
              className="p-2"
              type="outline"
              value={"Cancel"}
              onClick={hidePopup}
            />
            {btn.isEdit && (
              <Button
                className="p-2"
                type="secondary"
                value={"Update"}
                onClick={(e) => {
                  hidePopup();
                  editApiHandler();
                  e.preventDefault();
                }}
              />
            )}
            {btn.isCreate && (
              <Button
                className="p-2"
                type="secondary"
                value={"Create"}
                onClick={(e) => {
                  hidePopup();
                  createApiHandler();
                  e.preventDefault();
                }}
              />
            )}
          </div>
        </form>
      )}
      <Dialog parentClass={"no-scrollbar"} childrenClass='w-[400px] h-[280px]' showCreateClick={false} isOpen={showUploadDialog} closeModal={() => setShowUploadDialog((prev) => !prev)}>
        <UploadImage setShowUploadDialog={setShowUploadDialog} setIconPath={(iconPath) => setFormData({ ...formData, icon_path: iconPath })} title={formData.name} />
      </Dialog>
    </div>
  );
};

export default AmenitiesGroupForm;
