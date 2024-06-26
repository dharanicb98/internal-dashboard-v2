import { generateRandomString } from "utils/common";
import * as Formik from "formik";

export const TextField = (props: TextFieldProps) => {
  const { labelName, inputClass = "", ...rest } = props;
  const htmlFor = generateRandomString(6);
  return (
    <div>
      {!!labelName && (
        <label htmlFor={htmlFor} className="block mb-2 ">
          {labelName}
        </label>
      )}
      <Formik.Field
        id={htmlFor}
        className={`border-grey-dark border !outline-none py-4 px-6 rounded-full text-black/[.70] ${inputClass}`}
        {...rest}
      />
    </div>
  );
};

interface TextFieldProps {
  labelName?: string;
  inputClass?: string;
  [key: string]: any;
}
