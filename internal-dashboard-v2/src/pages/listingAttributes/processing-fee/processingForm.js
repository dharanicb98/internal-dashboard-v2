import React, { useEffect, useState } from "react";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  editProcessingFee,
  postProcessingFee,
} from "../../../services/processingFeeServices";
import FormInputs from "../../../components/popup/formInputs";
import Button from "../../../components/button";

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
    label: "Fee Amount",
    apiKey: "fee_amount",
    optionsList: "",
  },
  {
    id: 4,
    type: "select",
    label: "Type",
    apiKey: "type",
    optionsList: [
      {
        id: 1,
        optionValue: "flat",
        name: "Flat",
      },
      {
        id: 2,
        optionValue: "percentage",
        name: "Percentage",
      },
    ],
  },
];

const ProcessingFeeForm = ({
  hidePopup,
  updateData,
  btn,
  readOnly = true,
  setPageLoad,
  isEdit,
  createClick,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(updateData);
  const { countryList } = useSelector((state) => state.country);

  const editApiHandler = () => {
    const { id, country_id, name, slug, fee_amount, type } = formData;
    dispatch(loaderStart());
    editProcessingFee({ id, country_id, name, slug, fee_amount, type })
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  const createApiHandler = () => {
    // console.log("createApi..........formData", formData);
    dispatch(loaderStart());
    // console.log("posting data ===>", {
    //   name: formData.name,
    //   slug: formData.slug,
    //   fee_amount: formData.fee_amount,
    //   type: formData.type,
    //   country_id: formData.country_id,
    // });
    postProcessingFee({
      // id: formData.id,
      name: formData.name,
      slug: formData.slug,
      fee_amount: formData.fee_amount,
      type: formData.type,
      country_id: formData.country_id,
      // icon_path:
      //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxnpVUzgyyp7rmUxx5fgb0F7xnq1PGL4eVw&usqp=CAU",
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
            <FormInputs
              objKey="id"
              optionsData={countryList}
              label="Country Name"
              type="select"
              className="w-[49%] mt-2"
              value={formData.country_id}
              onChange={(e) =>
                setFormData({ ...formData, country_id: e.target.value })
              }
            />
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
          </div>
          <div className="flex justify-between mt-5">
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
    </div>
  );
};

export default ProcessingFeeForm;
