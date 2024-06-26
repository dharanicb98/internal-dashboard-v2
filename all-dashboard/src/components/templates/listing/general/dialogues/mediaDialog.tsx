import React from "react";
import Image from "next/image";
import CloseRoundedIcon from "assets/icons/close-rounded.svg";
import UploadIcon from "assets/icons/upload.png";
import Dialog from "ui/dialog";
import OutlinedInput from "ui/input/outlinedInput";
import Photos from "components/templates/createListing/photos";
import { FilledButton } from "ui/buttons";
import FilesDragAndDrop from "ui/input/dnd";
import { fileUpload } from "services/uploadFile";

export default function AddMediaDialog(props: AddMediaDialogProps) {
  const { open, onClose, defaultImage } = props;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = React.useState<
    File | string | null
  >(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (files: FileList | File[]) => {
    const file = files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const addHandler = async () => {
    if (selectedImage && selectedImage !== defaultImage) {
      const res = await fileUpload(selectedImage);
      if (res.err) {
        alert("File upload error");
        onClose(null);
      } else {
        onClose(res.url);
      }
    } else {
      alert("Validation failed");
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <div className="p-4 rounded-2xl bg-white">
        <div className="flex flex-row justify-between mb-4">
          <h6 className="text-grey-dark">Add images</h6>
          <button onClick={() => onClose(null)}>
            <Image src={CloseRoundedIcon} alt="close" />
          </button>
        </div>

        <Photos onClose={() => onClose(null)} type="EditListing" />

        {/* <div
          className="border border-grey flex-center rounded-2xl b-6 overflow-hidden bg-grey-300 w-[60vw] h-[50vh] max-w-[646px] max-h-[282px] max flex items-center justify-center"
          onClick={handleImageClick}
        >
          <FilesDragAndDrop
            onUpload={(files) => handleFileChange(files)}
            formats={["jpg", "png", "svg", "webp"]}
            openDialogOnClick
            containerStyles={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedImage ? (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                className="w-full h-full object-contain"
                fill
              />
            ) : (
              <div className="flex-center flex-col mx-8 relative">
                <div className=" w-full h-full"></div>
                <Image src={UploadIcon} alt="upload" />
                <p className="text-grey-dark text-center text-[18px] mt-6">
                  Drag and drop images or select images from gallery
                </p>
              </div>
            )}
          </FilesDragAndDrop>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <OutlinedInput
            label="Copy and paste URL here"
            className="!border-grey"
          />
          <FilledButton text="Add" buttonClass="px-6" onClick={addHandler} />
        </div> */}
      </div>
    </Dialog>
  );
}

interface AddMediaDialogProps {
  open: boolean;
  onClose: (values: string | null) => void;
  defaultImage?: string;
}
