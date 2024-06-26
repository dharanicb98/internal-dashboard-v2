import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import {
  editHouseRules,
  postHouseRules,
} from "../../../services/houseRulesServices";
import FormInputs from "../../../components/popup/formInputs";
import Button from "../../../components/button";
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
    label: "User Id",
    apiKey: "user_id",
    optionsList: "",
    className: "w-full"
  },

  {
    id: 4,
    type: "text",
    label: "Icon Path",
    apiKey: "icon_path",
    optionsList: "",
    className: "md:w-[75%] lg:w-[85%] my-2",
    buttonValue: true,
  },
  {
    id: 5,
    type: "textarea",
    label: "Description",
    apiKey: "description",
    optionsList: "",
    className: "w-[49%]"
  },
];

const HouseRulesForm = ({
  hidePopup,
  updateData,
  btn,
  setPageLoad,
  isEdit,
  createClick,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(updateData);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const editApiHandler = () => {
    const { id, name, slug, description, user_id, icon_path } = formData;
    dispatch(loaderStart());
    editHouseRules({ id, name, slug, description, user_id, icon_path }, id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  const createApiHandler = () => {
    // console.log("createApi", formData);
    dispatch(loaderStart());
    postHouseRules({
      id: formData.id,
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      user_id: formData.user_id,
      icon_path:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxnpVUzgyyp7rmUxx5fgb0F7xnq1PGL4eVw&usqp=CAU",
    })
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((error) => {
        dispatch(error(error?.response?.data?.error?.message));
      });
  };

  //   const handleRequest = () => {
  //     apiCall(formData);
  //   }

  return (
    <div>
      {isEdit && (
        <form>
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

export default HouseRulesForm;
