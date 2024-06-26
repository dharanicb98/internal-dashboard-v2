import React, { useEffect, useState } from "react";
import InputRow from "../../../components/InputRow";
import PhoneExtensionSelectBar from "../../../components/dropdown/PhoneInputs/selectPhoneNo";
import Button from "../../../components/button";
import Input from "../../../components/popup/Input";


const UserEditForm = ({
  formData,
  InputData,
  isEdit,
  onClick,
  popUpContainer,
  onPopupAction,
}) => {
  const [formInputs, setFormInputs] = useState({ ...formData });
  const [phoneExt, setPhoneExt] = useState(`${formData?.mobile_ext ? formData.mobile_ext : "+1"}`);
 


  const handleCancel = () => {
    onClick();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    popUpContainer(formInputs);
    onPopupAction(true);
    onClick();
  };

  const renderFormInputs = (eachItem, index) => {
    switch (eachItem?.type) {
      case "select":
        return (
          <Input
            key={index}
            type={eachItem.type}
            ModuleName={eachItem.moduleName}
            optionName={eachItem.optionName}
            containerStyle={
              eachItem.row && {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }
            }
            value={formInputs[eachItem?.value]}
            labelStyle={
              eachItem.column
                ? "font-medium text-md mb-2 border-b-2 ml-3 self-end"
                : ""
            }
            style={
              eachItem.column ? { width: "30%" } : { width: "49.5%" }
            }
            ReadInput={eachItem.column ? eachItem.style : "w-full h-[50px] my-2"}
            label={eachItem.label}
            onChange={(event) =>
              setFormInputs({
                ...formInputs,
                [eachItem.value]: event.target.value,
              })
            }
          />
        )
        case "textarea":
          return (
            <Input
              key={index}
              type={eachItem.type}
              rows={4}
              containerStyle={
                eachItem.row && {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }
              }
              value={formInputs[eachItem?.value]}
              labelStyle={
                eachItem.column
                  ? "font-medium text-md mb-2 border-b-2 ml-3 self-end"
                  : ""
              }
              style={
                eachItem.column ? { width: "30%" } : { width: "49.5%" }
              }
              ReadInput={eachItem.column ? eachItem.style : "w-full my-2"}
              label={eachItem.label}
              onChange={(event) =>
                setFormInputs({
                  ...formInputs,
                  [eachItem.value]: event.target.value,
                })
              }
            />
          )  
      case "phone_ext":
        return (
          <PhoneExtensionSelectBar
            key={index}
            type={eachItem.type}
            inputStyle={eachItem.column ? "flex-col" : "justify-between"}
            value={formInputs[eachItem.value]}
            labelStyle={
              eachItem.column
                ? "font-medium text-md mb-2 border-b-2 ml-3"
                : ""
            }
            className={eachItem.column ? "w-[190%] ml-2 h-[41px]" : "w-full m-1 h-[50px]"}
            placeholder={"Enter number"}
            label={eachItem.label}
            selectPhoneExt = {(item)=> setPhoneExt(item)}
            phoneExt = {phoneExt}
            onChange={(event) =>{
              setFormInputs({
                ...formInputs,
                mobile_ext : phoneExt,
                [eachItem.value]: event.target.value,
              })
            }
            }
          />
        )

      default:
        return (
          <InputRow
            key={index}
            type={eachItem.type}
            inputStyle={eachItem.column ? "flex-col" : "justify-between"}
            value={formInputs[eachItem.value]}
            labelStyle={
              eachItem.column
                ? "font-medium text-md mb-2 border-b-2 ml-3"
                : ""
            }
            className={eachItem.column ? "w-[200%] ml-2" : "w-full m-1"}
            label={eachItem.label}
            onChange={(event) =>
              setFormInputs({
                ...formInputs,
                [eachItem.value]: event.target.value,
              })
            }
          />
        )
    }
  }




  return (
    <>
      <form onSubmit={handleUpdate}>
        {isEdit && (
          <div className="w-full flex justify-end mb-4">
            <div className="flex">
              <Button
                value="X"
                type="black"
                className="mr-3 text-[23px] text-white"
                onClick={handleCancel}
              />
              <Button
                value="✔"
                type={"outline"}
                buttonType={"submit"}
                className="!text-black text-[14px] font-bold rounded"
                onClick={handleUpdate}
              />
            </div>
          </div>
        )}
        <div
          className={`${InputData[0].column ? "flex justify-between w-full m-1" : ""
            }`}
        >
          {InputData.map((eachItem, index) =>
            renderFormInputs(eachItem, index)
          )}
        </div>
      </form>
    </>
  );
};

export default UserEditForm;

export const RenderUserNames = ({
  checkoutStatus,
  handleEdit,
  readButton,
}) => {
  return (
    <>
      {readButton && (
        <div className="w-full flex justify-end absolute top-2 right-2">
          <Button type="black" value="Edit" onClick={handleEdit} />
        </div>
      )}
      <div>
        {checkoutStatus &&
          checkoutStatus.map(({ name, value, hr, className }) => (
            <div key={name}>
              <div
                className={`flex justify-between pb-2 mx-auto ${className && className
                  }`}
              >
                <p className="text-slate-700">{name}</p>
                <p className="w-1/2">{value && value}</p>
              </div>
              {hr && <hr className="pb-2 mx-auto" />}
            </div>
          ))}
      </div>
    </>
  );
};
