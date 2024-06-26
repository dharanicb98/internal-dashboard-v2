import React, { useState } from "react";
import Button from "../button";
// import { useDispatch } from "react-redux";
// import { loaderSuccess } from "../../store/reducers/loaderSlice";
import Input from "./Input";
import { Actions, ModuleName } from "../../constants/moduleEvents";

const ErrorPop = ({ isOpen, errorMessage }) => {
  const [model, setModel] = useState(false);
  const [formData, setFormData] = useState({ module_name: "", action: "" });

  const hanldeOpen = () => {
    setModel(!model);
    // console.log("open");
  };

  // const dispatch = useDispatch();

  //to close modal
  // const hanldeClose = () => {
  //   setModel(prev => !prev);
  //   dispatch(loaderSuccess());
  // };

  return (
    <>
      <div className="text-right flex justify-end mt-10">
        {/* <Button
          onClick={hanldeOpen}
          value={`Model`}
          type="secondary"
          className="m-10"
        /> */}
        <Button
          value="home"
          url="https://img.freepik.com/free-photo/3d-view-house-model_23-2150761168.jpg?size=626&ext=jpg&ga=GA1.1.1480451672.1699352948&semt=sph"
          side="right"
          className={"last:mt-15"}
          onClick={hanldeOpen}
        />
      </div>
      {model && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex z-20 min-h-full items-center modal justify-center p-4 text-center modalover">
            <div
              className="flex min-h-full items-center justify-center p-4 text-center overlay"
              onClick={hanldeOpen}
            ></div>
            <div className="w-full absolute max-w-xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100">
              {/* <h3 className="text-lg font-medium leading-6 text-gray-900 border-b-2 pb-2">
              Error Message
            </h3>
            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Request failed with status code 500
                {/* {errorMessage} */}
              {/* </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                buttonType={"button"}
                onClick={hanldeOpen}
                className="m-5 sm:w-[100px]"
                value="Close"
                type="cancel"
              /> */}
              {/* </div> */}
              <div className="flex gap-2">
                <Input
                  type={`select`}
                  value={formData.module_name}
                  className="w-[50%]"
                  ModuleName={ModuleName}
                  label={`Module Name`}
                  onChange={(e) =>
                    setFormData({ ...formData, module_name: e.target.value })
                  }
                />
                <Input
                  type={`select`}
                  value={formData.action}
                  className="w-[50%]"
                  ModuleName={Actions}
                  label={`Actions`}
                  onChange={(e) =>
                    setFormData({ ...formData, action: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Input
                  type={`select`}
                  value={formData.module_name}
                  className="w-[50%]"
                  ModuleName={ModuleName}
                  label={`Module Name`}
                  onChange={(e) =>
                    setFormData({ ...formData, module_name: e.target.value })
                  }
                />
                <Input
                  type={`select`}
                  value={formData.action}
                  className="w-[50%]"
                  ModuleName={Actions}
                  label={`Actions`}
                  onChange={(e) =>
                    setFormData({ ...formData, action: e.target.value })
                  }
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  buttonType={"button"}
                  onClick={hanldeOpen}
                  className="m-5 sm:w-[100px]"
                  value="Close"
                  type="cancel"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPop;
