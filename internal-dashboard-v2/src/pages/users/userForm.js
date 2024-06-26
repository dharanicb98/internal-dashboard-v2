import React, { useState } from "react";
import FormInputs from "../../components/popup/formInputs";
import Button from "../../components/button";
import moment from "moment-timezone";
import { UserFormEditList, UserFormList } from "../../constants/userData";
import PhoneExtensionSelectBar from "../../components/dropdown/PhoneInputs/selectPhoneNo";


const UserForm = ({
  close,
  updateData,
  handleRequest,
  isEdit,
  value,
  createClick,
  isdisplay = false
}) => {
  const [formData, setFormData] = useState({ ...updateData });
  const [phoneExt, setPhoneExt] = useState(`${formData?.mobile_ext ? formData.mobile_ext : "+1"}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    let obj = {}
    Object.keys(formData).forEach(eachkey => {
      if (formData[eachkey] !== updateData[eachkey]) {
        obj[eachkey] = formData[eachkey]
      }
    })
    handleRequest(createClick ? formData : obj);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    setFormData(formData);
  };

  const renderFormInputs = (eachItem, index) => {
    switch (eachItem.type) {
      case "phone_ext":
        return (
          <PhoneExtensionSelectBar
            key={index}
            type={eachItem.type}
            inputStyle={eachItem.column ? "flex-col mt-3 items-start justify-start" : "justify-between"}
            value={formData[eachItem.apiKey]}
            labelStyle={
              eachItem.column
                ? "font-medium text-md mx-2"
                : ""
            }
            className={eachItem.column ? `${eachItem.className && eachItem.className} ${isdisplay ? "w-[245%]" : "w-[170%]"} left-0 h-[45px]` : "w-full m-1 h-[50px]"}
            placeholder={"Enter number"}
            label={eachItem.label}
            selectPhoneExt={(item) => setPhoneExt(item)}
            phoneExt={phoneExt}
            onChange={(event) => {
              setFormData({
                ...formData,
                mobile_ext: phoneExt,
                [eachItem.apiKey]: event.target.value,
              })
            }
            }
          />
        )

      default:
        return (
          <FormInputs
            objKey="optionValue"
            optionsData={eachItem.optionsList}
            required={createClick && eachItem.required}
            key={index}
            label={eachItem.label}
            type={eachItem.type}
            labelStyle={`${eachItem.labelStyle ? eachItem.labelStyle : ""}`}
            readTextArea={`${eachItem.className && eachItem.className}`}
            value={formData[eachItem.apiKey] || ""}
            className={`mt-2 ${eachItem.className && eachItem.className} ${isdisplay ? `w-[45%]` : "w-[30%] ml-1"}`}
            readInput={"h-[43px]"}
            onChange={(e) => setFormData(
              createClick
                ? { ...formData, [eachItem.apiKey]: e.target.value }
                : eachItem.apiKey !== "slug"
                  ? { ...formData, [eachItem.apiKey]: e.target.value }
                  : { ...formData }
            )}
          />
        )
    }
  }


  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <div className={`flex ${isdisplay ? "xl:space-x-2 md:space-x-1" : "xl:space-x-1.5 md:space-x-1"} xl:space-x-3 md:space-x-1 flex-wrap`}>
            {isdisplay ? (
              UserFormList.map((eachItem, index) => (
                renderFormInputs(eachItem, index)
              ))
            ) : (
              UserFormEditList.map((eachItem, index) => (
                renderFormInputs(eachItem, index)
              ))
            )
            }
          </div>
          <div className="flex justify-between mt-10">
            <Button buttonType="button" type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" />
          </div>
        </form>
      )}
    </div>
  );
};

export default UserForm;
