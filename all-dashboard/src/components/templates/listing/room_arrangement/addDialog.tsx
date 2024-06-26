/* eslint-disable @typescript-eslint/no-explicit-any */
import Dialog from "ui/dialog";
import Image from "next/image";
import React from "react";
import { FilledButton } from "ui/buttons";
import { useListingDetailsSelector } from "store/selectors/listing";
import CloseIcon from "assets/icons/close-rounded.svg";
import FilledInput from "ui/input/filledInput";
import { generateUUID } from "utils/common";

export default function AddDialog(props: AddAddonsDialogProps) {
  const { open, onClose, index } = props;
  const resetFormData = {
    name: "",
    details: [
      {
        name: "",
        description: "",
        price: "",
        additional_info: "",
        sequence: 1,
        _id: generateUUID(),
      },
    ],
  };

  const listingDetails = useListingDetailsSelector();
  // console.log("////////////////////////////", listingDetails);
  const [formData, setFormData] = React.useState({ ...resetFormData });

  const clone = (items: any) => structuredClone(items);

  React.useEffect(() => {
    const selectedService = listingDetails?.room_arrangement[index] || {};
    if (open == "edit") {
      setFormData({ ...selectedService });
    } else {
      setFormData({ ...resetFormData });
    }
  }, [index]);

  const validateExtraServiceData = (data) => {
    if (!data.name) return false;

    return true;
  };

  const setNewFormData = (name, index, value) => {
    const formDetails = clone([...formData.details]);
    formDetails[index][name] = value;
    setFormData({ ...formData, details: formDetails });
  };

  const removeDetails = (index) => {
    let formDetails = clone(formData.details);
    if (formDetails.length > 1) {
      formDetails = formDetails.filter((_, i) => i !== index);
      setFormData({ ...formData, details: formDetails });
    }
  };

  const addDetails = () => {
    const formDetails = clone(formData.details);
    formDetails?.push({
      ...resetFormData.details[index],
      _id: generateUUID(),
      sequence: formDetails.reduce((a, b) => {
        return b.sequence > a ? b.sequence + 1 : a + 1;
      }, 1),
    });
    setFormData({ ...formData, details: formDetails });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="bg-white p-6 md:p-4 rounded-2xl flex w-[90vw] max-w-[600px]">
        <div className="w-full">
          <Image
            src={CloseIcon}
            alt="close"
            width={26}
            height={26}
            className="cursor-pointer md:!w-6 md:!h-6 text-primary underline ml-auto flex"
            onClick={onClose}
          />

          <p>Heading</p>
          <FilledInput
            title="name"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="mt-5">
            {formData?.details?.map((v, i) => {
              return (
                <div
                  className="mt-5 border-t-2 pt-3"
                  key={v._id + "-" + formData.details.length}
                >
                  <div className="flex relative">
                    <b>Item {i + 1}</b>
                    <Image
                      src={CloseIcon}
                      alt="close"
                      width={16}
                      height={16}
                      className={`cursor-pointer md:!w-6 md:!h-6 text-primary underline ml-auto flex ${
                        formData.details.length == 1 ? "hidden" : ""
                      }`}
                      onClick={() => removeDetails(i)}
                    />
                  </div>
                  <div className="flex mt-3">
                    <div className="w-[50%] pr-5">
                      <p>Name</p>
                      <FilledInput
                        title="name"
                        value={formData.details[i].name}
                        onChange={(e) =>
                          setNewFormData("name", i, e.target.value)
                        }
                      />
                    </div>
                    <div className="w-[50%] pl-5">
                      <p>Description</p>
                      <FilledInput
                        title="description"
                        value={formData.details[i].description}
                        onChange={(e) =>
                          setNewFormData("description", i, e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="w-[50%] pr-5">
                      <p>Price</p>
                      <FilledInput
                        type="number"
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        title="price"
                        value={formData.details[i].price}
                        onChange={(e) =>
                          setNewFormData("price", i, e.target.value)
                        }
                      />
                    </div>
                    <div className="w-[50%] pl-5">
                      <p>Additional Information</p>
                      <FilledInput
                        title="additional_info"
                        value={formData.details[i].additional_info}
                        onChange={(e) =>
                          setNewFormData("additional_info", i, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 text-right pt-3">
            <FilledButton
              text="Add"
              type="button"
              buttonClass="px-5"
              onClick={() => addDetails()}
            />
          </div>

          <div className="mt-5 border-t-2" />

          {open == "add" && (
            <FilledButton
              text="Save"
              buttonClass="w-full mt-6"
              onClick={() => {
                const data = {
                  ...formData,
                };
                if (validateExtraServiceData(data)) {
                  onClose(data, "add");
                  setFormData({ ...resetFormData });
                }
              }}
            />
          )}
          {open == "edit" && (
            <FilledButton
              text="Update"
              buttonClass="w-full mt-6"
              onClick={() => {
                const selectedService = listingDetails?.room_arrangement[index];
                const data = {
                  ...selectedService,
                  ...formData,
                };
                if (validateExtraServiceData(data)) {
                  onClose(data, "edit");
                }
              }}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
}
interface AddAddonsDialogProps {
  open?: any;
  index?: any;
  onClose?: any;
}
