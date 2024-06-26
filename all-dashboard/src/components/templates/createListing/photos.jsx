import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateData } from "slices/createListing";
import { useCreateListingDataSelector } from "selectors/createListing";
import FilesDragAndDrop from "ui/input/dnd";
import Image from "next/image";
import UploadIcon from "assets/icons/upload.png";
import { fileUpload } from "services/uploadFile";
import CloseRounded from "assets/icons/close-rounded.svg";
import axios from "axios";
import { useListingDetailsSelector } from "store/selectors/listing";
import { updateListingDetails } from "store/slices/listing";
import Axios from "utils/axios";

export default function Photos({ type, onClose }) {
  const dispatch = useDispatch();
  let listingData = useCreateListingDataSelector();
  if (type) {
    listingData = useListingDetailsSelector();
  }

  const [imageStatus, setImageStatus] = React.useState({
    total: 0,
    uploaded: 0,
  });
  const [loadImages, setLoadImages] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [seqenceNo, setSequenceNo] = useState(0);

  React.useEffect(() => {
    (async () => {
      const filterImageIds = listingData.media?.map((item) => item?.id);
      // setImages(listingData.media);
      // console.log("filterImagesIds", filterImageIds);
      try {
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/v2/upload/image/public/query`,
          {
            filters: [{ col: "id", val: filterImageIds, type: "array" }],
          },
          { pagination: { limit: 500, page: 1 } }
        );
        // console.log("response images===", response);
        setImages(response.data);
      } catch (e) {
        console.log("error in api", e);
      }
    })();
  }, [loadImages, seqenceNo]);

  const handleUpdateData = (key, value) => {
    if (type) {
      dispatch(updateListingDetails({ [key]: value }));
      onClose();
    } else {
      dispatch(updateData({ [key]: value }));
    }
  };

  // console.log("4444444444444444444", listingData.media);
  const addHandler = async (files) => {
    // console.log("files-----------------------", files);

    setImageStatus((prev) => ({ ...prev, total: prev.total + files.length }));
    const promises = files?.map(async (item) => {
      if (item) {
        const res = await fileUpload(item);
        if (!res.err) {
          setImageStatus((prev) => ({ ...prev, uploaded: prev.uploaded + 1 }));
          return res;
        }
      }
      return "";
    });

    const result = await Promise.all(promises);

    // console.log("add handler before------------------", listingData.media);
    const mappedResult = [];

    if (result.length > 0 && !result[0].err) {
      // const mappedResult = result[0]?.url?.map((item) => { return {id:item.id, sequence:seqenceNo}}) || [];
      result.forEach((e, i) => {
        mappedResult.push({
          id: e?.url?.[0]?.id,
          sequence: listingData.media.length + i + 1,
        });
      });
      setSequenceNo(listingData.media.length + 1);
      const nMedia = [...listingData.media, ...mappedResult];
      console.log("nMedia ----------", listingData.media, nMedia, seqenceNo);
      handleUpdateData("media", nMedia);

      setLoadImages((prev) => !prev);
    } else {
      alert("something went wrong");
    }
  };

  const removeHandler = (id) => {
    const filteredMedia = listingData.media?.filter((item) => item.id !== id);
    // console.log("removed items", filteredMedia);
    setSequenceNo((prev) => prev - 1);
    // setImageStatus((prev) => ({
    //   ...prev,
    //   total: prev.total - 1,
    //   uploaded: prev.uploaded - 1,
    // }));
    handleUpdateData("media", filteredMedia);
  };

  return (
    <div className="flex flex-col gap-y-8  ">
      {!type ? <p className="text-xl text-grey-900">Upload Images</p> : ""}
      <div className="hidden bg-cover" />
      <FilesDragAndDrop
        onUpload={(files) => addHandler(files)}
        formats={["jpg", "png", "svg", "webp"]}
        openDialogOnClick
        containerStyles={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="flex-center flex-col  w-full py-[55px] rounded-2xl dashed__border">
          <div className=" w-full h-full"></div>
          <Image src={UploadIcon} alt="upload" />
          <p className="text-grey-dark text-center text-base mt-6">
            Click to upload <br /> Images/Drag and drop
          </p>
        </div>
      </FilesDragAndDrop>

      {!!(imageStatus.total && imageStatus.total !== imageStatus.uploaded) && (
        <div className="flex items-center gap-3 ">
          <Image src={UploadIcon} alt="upload" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-sm">Uploading Images</p>
              <p className="text-grey-700">{`${imageStatus.uploaded}/${imageStatus.total} left`}</p>
            </div>
            <div className=" bg-grey  h-0.5 mt-3">
              <div
                className="bg-black h-0.5"
                style={{
                  width: `${(imageStatus.uploaded / imageStatus.total) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 sm:grid-cols-2  gap-7 lg:grid-cols-3 md-m:grid-cols-4 lg-m:grid-cols-5 pb-4 overflow-auto h-full">
        {!type &&
          images &&
          images?.map((item, i) => (
            <div
              className={`relative h-[136px]  w-[160px]  rounded flex-wrap bg-cover`}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}${item.file_path})`,
              }}
              key={item.path || i}
            >
              <button
                onClick={() => removeHandler(item.id)}
                className="overflow-hidden bg-black w-fit h-fit  rounded-full absolute right-2 top-1.5"
              >
                <Image
                  src={CloseRounded}
                  alt="close"
                  className="invert h-full w-full"
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
