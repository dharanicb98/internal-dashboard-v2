import { generateRandomString } from "utils/common";
import * as Formik from "formik";

export const DropDown = (props: DropDownProps) => {
  const { labelName, inputClass = "", options, ...rest } = props;
  const htmlFor = generateRandomString(6);
  return (
    <div>
      {!!labelName && (
        <label htmlFor={htmlFor} className="block mb-2 ">
          {labelName}
        </label>
      )}
      <Formik.Field
        as="select"
        id={htmlFor}
        className={`border-grey-dark border !outline-none py-4 px-6 rounded-full text-black/[.70] appearance-none ${inputClass}`}
        {...rest}
      >
        {options.map((item) => (
          <option value={item.value} key={item.key}>
            {item.key}
          </option>
        ))}
      </Formik.Field>
    </div>
  );
};

interface DropDownProps {
  labelName?: string;
  inputClass?: string;
  options: KeyValue<string | number>[];
  [key: string]: any;
}
