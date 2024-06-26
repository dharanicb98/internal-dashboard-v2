import React, { useState } from "react";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import { useDispatch } from "react-redux";
import { editOffers, postOffers } from "../../../services/offersServices";
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
    label: "Title",
    apiKey: "title",
    optionsList: "",
  },
  {
    id: 3,
    type: "number",
    label: "Number",
    apiKey: "sequence_no",
    optionsList: "",
  },
  {
    id: 4,
    type: "number",
    label: "Max Offer Amount",
    apiKey: "max_offer_amount",
    optionsList: "",
  },
  {
    id: 5,
    type: "number",
    label: "Offer Price",
    apiKey: "offer_price",
    optionsList: "",
  },
  {
    id: 6,
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
  {
    id: 7,
    type: "textarea",
    label: "Description",
    apiKey: "description",
    optionsList: "",
  },
];

const OffersForm = ({
  hidePopup,
  updateData,
  btn,
  setPageLoad,
  isEdit,
  createClick,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(updateData);

  const editApiHandler = () => {
    const {
      id,
      title,
      slug,
      description,
      max_offer_amount,
      offer_price,
      type,
      sequence_no,
    } = formData;
    dispatch(loaderStart());
    // console.log("formData ===>",formData);
    editOffers(
      {
        id,
        title,
        slug,
        description,
        max_offer_amount,
        type,
        offer_price,
        sequence_no,
      },
      id
    )
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
    postOffers({
      // id: formData.id,
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      max_offer_amount: formData.max_offer_amount,
      offer_price: formData.offer_price,
      type: formData.type,
      user_id: formData.user_id,
      sequence_no: formData.sequence_no,
    })
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((error) => {
        dispatch(error(error?.response?.data?.error?.message));
      });
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
    </div>
  );
};

export default OffersForm;
