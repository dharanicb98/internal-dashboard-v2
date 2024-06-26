import React, { useState } from "react";
import Input from "../components/popup/Input";
import Button from "../components/button";
import { createCategory, updateCategory } from "../services/categoriesServices";
import { useDispatch } from "react-redux";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../store/reducers/loaderSlice";
import { phoneExtension } from "../constants/phoneExtension";
import { INPUT_STYLE } from "../constants";

const HomeForm = ({ hidePopup, updateData, btn }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(updateData);

  const editApiHandler = async () => {
    // console.log("editApi", formData);
    // const { id, name, slug } = formData;
    dispatch(loaderStart());
    try {
      const response = await updateCategory(formData);
      // console.log(response);
      dispatch(loaderSuccess());
    } catch (e) {
      // console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      dispatch(error(e?.response?.data?.error?.message));
    }
  };

  const createApiHandler = async () => {
    // console.log("createApi", formData);
    // console.log(formData);
    dispatch(loaderStart());
    try {
      const response = await createCategory({
        name: formData.name,
        slug: formData.id,
        term_group: 0,
        icon_path:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxnpVUzgyyp7rmUxx5fgb0F7xnq1PGL4eVw&usqp=CAU",
      });
      dispatch(loaderSuccess());
    } catch (e) {
      dispatch(error(e?.response?.data?.error?.message));
    }
  };

  return (
    <>
      <form className="flex flex-col text-2xl gap-2 ">
        <div className="flex gap-2">
          <Input
            type={"text"}
            label="FirstName"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />
          <Input
            type={"text"}
            label="LastName"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />

          <Input
            type={"date"}
            label="DOB"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[60px] flex flex-col ">
            <label className="text-slate-600 text-xl">M_Ext</label>
            <select className={`h-[37px] ${INPUT_STYLE}`}>
              {phoneExtension.map((el) => {
                return (
                  <option className="text-sm" value={el.dial_code}>
                    {el.dial_code}
                  </option>
                );
              })}
            </select>
          </div>
          <Input
            type={"number"}
            label="Mobile"
            value={formData.icon_path}
            className={`text-blue-900 font-bold`}
            onChange={(e) => {
              setFormData({ ...formData, icon_path: e.target.value });
            }}
          />
          <Input
            type={"password"}
            label="Password"
            value={formData.icon_path}
            className={`text-blue-900 font-bold`}
            onChange={(e) => {
              setFormData({ ...formData, icon_path: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2">
          <Input
            type={"text"}
            label="UserName"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />
          <Input
            type={"text"}
            label="Bio"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />

          <div className="w-full flex flex-col">
            <label className="text-slate-600 text-xl">Gender</label>
            <select className={`h-[37px] ${INPUT_STYLE}`}>
              <option>Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full flex flex-col">
            <label className="text-slate-600 text-xl">Role</label>
            <select className={`h-[37px] ${INPUT_STYLE}`}>
              <option>Choose Role</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label className="text-slate-600 text-xl">Is_Wp_User</label>
            <select className={`h-[37px] ${INPUT_STYLE}`}>
              <option>Is_Wp_User</option>
              <option value="Old">Old</option>
              <option value="New">New</option>
            </select>
          </div>

          <Input
            type={"text"}
            label="CompanyName"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />
        </div>

        <div className="flex gap-2">
          <Input
            type={"text"}
            label="Address_1"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />
          <Input
            type={"text"}
            label="Address_2"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />

          <Input
            type={"text"}
            label="House_No"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>

        <div className="flex gap-2">
          <Input
            type={"text"}
            label="User_Avatar"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />
          <Input
            type={"text"}
            label="User_Cover"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />

          <Input
            type={"text"}
            label="Facebook"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>

        <div className="flex gap-2">
          <Input
            type={"text"}
            label="Instagram"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />
          <Input
            type={"text"}
            label="LinkedIn"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
            }}
          />

          <Input
            type={"text"}
            label="Youtube"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Input
            type={"text"}
            label="Apple"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Input
            type={"text"}
            label="Twitter"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button
            className="p-2"
            type="black"
            value={"Cancel"}
            onClick={hidePopup}
          />
          {btn.isEdit && (
            <Button
              className="p-2 "
              type="primary"
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
              className="p-2 "
              type="primary"
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
    </>
  );
};

export default HomeForm;
