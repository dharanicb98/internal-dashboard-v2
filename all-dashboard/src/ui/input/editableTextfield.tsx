import React from "react";
import EditPencilIcon from "assets/icons/edit-pencil.svg";
import Image from "next/image";
import TransparentInput from "./transparentInput";

const EditableTextField = (props: TitleProps) => {
  const {
    defaultValue,

    handleChange,
    textClass = "font-normal",
    containerClass = "",
    showTextBox = false,
  } = props;
  const [description, setDescription] = React.useState(defaultValue);
  const [isEdit, setIsEdit] = React.useState(showTextBox);

  const handleTitleClick = () => {
    setIsEdit(true);
  };

  const handleBlur = () => {
    setIsEdit(false);
    handleChange(description);
  };

  return (
    <div className={`${isEdit ? "flex" : "block"} ${containerClass}`}>
      {isEdit ? (
        <TransparentInput
          onChange={(value) => setDescription(value)}
          value={description}
          defaultValue={defaultValue}
          onBlur={handleBlur}
          className={`w-full border-grey-light rounded-md inline !px-0 !pb-2 pt-2  ${textClass}`}
          autoFocus
          placeholder="Title of your property "
        />
      ) : (
        <p className={`break-all inline py-2 ${textClass}`}>{defaultValue}</p>
      )}
      <button
        onClick={handleTitleClick}
        className="min-w-[15px] h-4 my-auto inline ml-3"
      >
        <Image src={EditPencilIcon} alt="edit" />
      </button>
    </div>
  );
};

export default EditableTextField;

interface TitleProps {
  defaultValue: string;
  handleChange: (v: string) => void;
  textClass?: string;
  containerClass?: string;
  showTextBox?: boolean
}
