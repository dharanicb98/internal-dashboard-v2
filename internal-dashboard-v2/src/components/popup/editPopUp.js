import React, { useState } from "react";
import CommonPopup from "./commonPopup";
import Input from "./Input";
import Button from "../button";
function EditPopUp({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  create = false,
}) {
  const [formData, setFormData] = useState({ ...editData });
  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest(formData);
    setFormData({ ...formData, name: "", slug: "" });
  };

  const handleEdit = (event) => {
    if (create) {
      setFormData({ ...formData, slug: event.target.value });
    } else {
      setFormData({ ...formData, slug: "" });
    }
  };

  return (
    <div>
      {isEdit && (
        <CommonPopup hidePopup={close}>
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="Slug Name"
              value={formData.slug}
              onChange={handleEdit}
            />
            <div className="flex justify-between mt-3">
              <Button type="secondary" value="Cancel" onClick={close} />
              <Button
                buttonType="submit"
                value={value}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded animeBtn"
              />
            </div>
          </form>
        </CommonPopup>
      )}
    </div>
  );
}
export default EditPopUp;
