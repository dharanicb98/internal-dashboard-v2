import React from "react";
import Image from "next/image";
import CloseRoundedIcon from "assets/icons/close-rounded.svg";
import Dialog from "ui/dialog";
import { FilledButton } from "ui/buttons";
import UploadIcon from "assets/icons/upload.png";
import TransparentInput from "ui/input/transparentInput";
import FilesDragAndDrop from "ui/input/dnd";
import Divider from "ui/divider";
import { fileUpload } from "services/uploadFile";

export default function MediaDialog(props: MediaDialogProps) {
  const { open, onClose, defaultValues } = props;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [mediaContent, setMediaContent] =
    React.useState<MediaContentType | null>(defaultValues);

  const handleChangeContent = (
    key: keyof MediaContentType,
    value: MediaContentType[keyof MediaContentType]
  ) => {
    setMediaContent((prev): any => {
      return { ...(prev || {}), [key]: value };
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (files: File[] | FileList) => {
    const file = files?.[0];
    if (file) {
      handleChangeContent("media", file);
    }
  };
  const getFileUrl = (file: File | string): string => {
    if (file && typeof file === "object") {
      return URL.createObjectURL(file);
    }
    return file as string;
  };

  const addHandler = async () => {
    if (
      mediaContent?.title &&
      mediaContent?.description &&
      (mediaContent?.add ? mediaContent?.media : true)
    ) {
      const res =
        mediaContent.media === defaultValues?.media
          ? { err: false, url: defaultValues.media }
          : await fileUpload(mediaContent.media);
      if (res.err) {
        alert("File upload error");
        onClose(null);
      } else {
        onClose({
          ...mediaContent,
          media: res.url,
        });
      }
    } else {
      alert("Validation failed");
    }
  };

  React.useEffect(() => {
    if (defaultValues) {
      setMediaContent(defaultValues);
    }
  }, [defaultValues]);

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <div className="w-[380px] p-4 rounded-2xl bg-white dark-scrollbar">
        <div className="flex flex-row justify-between mb-4">
          <h6>{mediaContent?.add ? 'Add To':'Edit'} Highlight</h6>
          <button onClick={() => onClose(null)}>
            <Image src={CloseRoundedIcon} alt="close" />
          </button>
        </div>
        <div
          className="border border-grey flex-center  rounded-2xl h-[200px] mb-6 relative overflow-hidden"
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
            {!!mediaContent?.media ? (
              <Image
                src={getFileUrl(mediaContent?.media)}
                alt="Selected Image"
                className="w-full h-full object-cover"
                fill
              />
            ) : (
              <div className="flex-center flex-col mx-8">
                <Image src={UploadIcon} alt="upload" />
                <p className="text-grey-dark text-center text-[18px]">
                  Drag and drop images or select images from gallery
                </p>
              </div>
            )}
          </FilesDragAndDrop>
        </div>
        <div>
          <div>
            <h6 className="text-grey-dark">Add Title</h6>
            <TransparentInput
              className="!px-0 text-[18px]"
              placeholder="Enter your title"
              onChange={(value) => handleChangeContent("title", value)}
              value={mediaContent?.title || ""}
            />
          </div>
          <Divider className="my-2" />
          <div className="mb-6">
            <h6 className="text-grey-dark">Add your Description</h6>
            <TransparentInput
              className="!px-0 text-[18px]"
              placeholder="Enter your description"
              onChange={(value) => handleChangeContent("description", value)}
              value={mediaContent?.description || ""}
            />
          </div>
          <FilledButton text="Add" buttonClass="w-full" onClick={addHandler} />
        </div>
      </div>
    </Dialog>
  );
}

export interface MediaContentType {
  media?: File | string | null;
  title: string;
  add?: boolean;
  description: string;
}

interface MediaDialogProps {
  open: boolean;
  onClose: (values: MediaContentType | null) => void;
  defaultValues: MediaContentType | null;
}
