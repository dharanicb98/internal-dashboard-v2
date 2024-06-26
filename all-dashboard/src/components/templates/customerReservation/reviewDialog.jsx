import React, { use, useState } from "react";
import Dialog from "ui/dialog";
import Image from "next/image";
import CloseIcon from "assets/icons/close-rounded.svg";
import MediaDialog, {
  MediaContentType,
} from "components/templates/listing/general/dialogues/highlightDialog";
import FilesDragAndDrop from "ui/input/dnd";
import UploadIcon from "assets/icons/upload.png";
import { fileUpload } from "services/uploadFile";
import CloseRounded from "../../../public/assets/icons/close-rounded.svg";
import Loading from "../../../ui/loading/index";
import { getReviewsPost } from "../../../services/customerReservations/apis";
import { getRangeBetweenDates2 } from "../../../utils/common";

function ReviewDialog({ setOpen, open, data }) {
  const [photosDialog, setPhotosDialog] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [reviewImageTitle, setReviewImageTitle] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [submitPopup, setSubmitPopup] = useState({
    isSubmitted: false,
    errorPopup: false,
    message: "",
  });
  const [reviewsPayload, setReviewsPayload] = useState({
    listing_id: data?.listing_id,
    booking_id: data?.reservation_code,
    user_id: data?.customer_id,
    rating: "",
    title: "",
    review_txt: "",
    ip: "",
    cleaniless_rating: "",
    amenities_rating: "",
    communication_rating: "",
    location: "",
    media: [],
  });

  const reviewsList = [
    { id: 1, label: "Overall Rating", value: "rating" },
    {
      id: 2,
      label: "Communication",
      value: "communication_rating",
    },
    { id: 3, label: "Cleaning", value: "cleaniless_rating" },
    { id: 4, label: "Amenities", value: "amenities_rating" },
  ];
  const handleFileChange = (files) => {
    const file = files?.[0];

    if (file) {
      setMediaFile(file);
    }
  };

  const handleSaveImage = async () => {
    setPhotosDialog(false);
    try {
      if (mediaFile) {
        setShowLoader(true);
        const data = await fileUpload(mediaFile);
        // Check if the data contains a url array and it's not empty
        if (data && data.url && data.url.length > 0) {
          setShowLoader(false);
          const fileInfo = data.url[0];
          const { file_path, id } = fileInfo;
          setReviewsPayload((prev) => ({
            ...prev,
            media: [
              ...prev.media,
              { title: reviewImageTitle, url: file_path, id },
            ],
          }));
          setMediaFile("");
        } else {
          setShowLoader(false);
          console.error("No file data returned from the server.");
        }
      }
    } catch (error) {
      setShowLoader(false);
      console.error("Error uploading file:", error);
    }
  };

  const handleRemoveMedia = (idx) => {
    let mediaData = [...reviewsPayload.media];
    mediaData.splice(idx, 1);
    setReviewsPayload((prev) => {
      return { ...prev, media: mediaData };
    });
  };

  const getImageFileUrl = (fileData) => {
    if (fileData && typeof fileData === "object") {
      console.log("fileData", URL.createObjectURL(fileData));
      return URL.createObjectURL(fileData);
    }
    return fileData;
  };

  const handleReviewSubmitButton = async (e) => {
    e.preventDefault();
    setShowLoader(true);
   
    try {
      const response = await getReviewsPost(reviewsPayload);
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", response);
      if (response.status === 200) {
        setShowLoader(false);
        setSubmitPopup((prev) => ({
          ...prev,
          isSubmitted: true,
          errorPopup: false,
          message: response.data.status,
        }));
        Object.keys(reviewsPayload).forEach((e) => (reviewsPayload[e] = ""));
        setReviewsPayload(reviewsPayload);
        setOpen(false)
      } 
    } catch (error) {
      setShowLoader(false);
      setSubmitPopup((prev) => ({
        ...prev,
        isSubmitted: false,
        errorPopup: true,
        message: error.message,
      }));
      // console.log("errorrrrrrrrrrrrrrrrrrrrrrrr",error);
    }
  };

  // console.log("----------ddddddddddd-----------", data,reviewsPayload);

  return (
    <>
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      contentClass={
        "relative md-m:h-[800px] md-m:px-8 md:h-[500px] !w-[500px] md-m:w-auto bg-[#fff] p-4 rounded-xl m-4"
      }
    >
      <p className="md-m:text-xl md-m:mb-4 mb-4  mt-3 font-medium leading-6 text-base">
        Booking Completed
      </p>
      <div className=" text-[#5C5C5C]">
        <p className="leading-5 font-medium text-base mb-2">
          {data.listing_name}
        </p>
        <div className="flex gap-14 mb-2">
          <p>{getRangeBetweenDates2(data.checkin, data.checkout)}</p>
          <p>{data.total_guests} Guests</p>
        </div>
        <p className="leading-5 font-medium text-base mb-3">
          Reservation Id -
          <span className="text-[#CD264F] font-semibold">
            {data.reservation_code}
          </span>
        </p>
      </div>

      <Image
        src={CloseIcon}
        alt="close"
        width={26}
        height={26}
        className="absolute top-2 right-3 md:top-4 md:right-6 cursor-pointer md:!w-6 md:!h-6"
        onClick={() => setOpen(false)}
      />

      <div className="flex flex-col mb-4 gap-2 ">
        <label htmlFor="title" className="text-grey-dark text-lg">
          Title
        </label>
        <input
          value={reviewsPayload.title}
          onChange={(e) =>
            setReviewsPayload((prev) => ({ ...prev, title: e.target.value }))
          }
          id="title"
          className={`w-full h-[40px] rounded-lg placeholder-grey-dark focus:ring-0 or focus:ring-transparent !border-none 
      placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] 
      px-4 py-2  bg-grey-300 shadow-sm text-lg`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-grey-dark text-lg">Description</label>
        <textarea
          rows={3}
          value={reviewsPayload.review_txt}
          onChange={(e) =>
            setReviewsPayload((prev) => ({
              ...prev,
              review_txt: e.target.value,
            }))
          }
          className="w-full rounded-lg placeholder-grey-dark focus:ring-0 or focus:ring-transparent !border-none 
      placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] 
      px-4 py-2  bg-grey-300 shadow-sm text-lg"
        ></textarea>
      </div>

      <button
        className="text-[#CD264F] mt-3 mb-4"
        onClick={() => setPhotosDialog(true)}
      >
        Add Photos
      </button>

      <Dialog
        onClose={() => setPhotosDialog(false)}
        open={photosDialog}
        contentClass={
          "relative h-auto md:w-[300px] md-m:w-[380px] md-m:w-auto bg-[#fff] p-4 m-3 rounded-xl"
        }
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
          {mediaFile ? (
            <div className="h-[200px] w-[470px]">
              <Image
                src={getImageFileUrl(mediaFile)}
                alt="Selected Image"
                className="w-full h-full object-cover"
                fill
                // width={400}
                // height={200}
              />
            </div>
          ) : (
            <div className="flex-center flex-col  md:h-[180px] h-[200px] rounded border-dashed border-2 p-3">
              <Image src={UploadIcon} alt="upload" />
              <p className="text-grey-dark text-center text-[18px]">
                Drag and drop images or select images from gallery
              </p>
            </div>
          )}
        </FilesDragAndDrop>
        <div className="flex flex-col mb-4 gap-2 mt-5">
          <label htmlFor="title" className="text-grey-dark text-base">
            Title
          </label>
          <input
            onChange={(e) => setReviewImageTitle(e.target.value)}
            id="title"
            className={`w-full h-[40px] rounded-lg placeholder-grey-dark focus:ring-0 or focus:ring-transparent !border-none 
      placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] 
      px-4 py-2  bg-grey-300 shadow-sm text-base`}
          />
        </div>

        <div className="text-right mt-5">
          <button
            className="px-5 py-2 bg-black text-white rounded-full text-sm font-normal"
            onClick={() => handleSaveImage()}
          >
            Upload
          </button>
        </div>
      </Dialog>

      <Dialog onClose={() => {}} open={showLoader}>
        <Loading containerClass="!w-16 !h-16 fill-primary" />
      </Dialog>

      {reviewsPayload && reviewsPayload?.media.length > 0 && (
        <div className="grid grid-cols-2 gap-3 p-3 max-h-[300px] overflow-y-auto">
          {reviewsPayload.media.map((imageData, idx) => (
            <div key={idx} className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}${imageData.url}`}
                alt={imageData.title}
                className="rounded h-[150px] w-[200px] md:h-[100px] mb-2 "
              />
              <button
                onClick={() => handleRemoveMedia(idx)}
                className="overflow-hidden bg-black w-fit h-fit  rounded-full absolute z-999 right-2 top-1.5"
              >
                <Image
                  src={CloseRounded}
                  alt="close"
                  className="invert h-full w-full"
                />
              </button>
              <p className="text-lg font-semibold">{imageData.title}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-xl font-medium">Ratings</p>
        <ul className=" flex flex-col   mt-4">
          {reviewsList?.map((each) => {
            return (
              <li key={each.id} className="flex justify-between mb-4 gap-12">
                <p>{each.label}</p>
                <div className=" flex items-center">
                  {[...Array(5)].map((_, i) => {
                    return (
                      <label className={`relative mr-2`} key={i}>
                        <svg
                          width="20"
                          height="19"
                          className="cursor-pointer"
                          viewBox="0 0 20 19"
                          fill={`${
                            reviewsPayload[each.value] > i
                              ? "#000000"
                              : "#D9D9D9"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z"
                            // fill="black"
                          />
                        </svg>

                        <input
                          id={each.label}
                          type="radio"
                          key={i}
                          value={reviewsPayload[each.value] || ""}
                          className="absolute top-1 left-1 cursor-pointer hidden "
                          name={each.label}
                          onClick={() => {
                            Object.keys(reviewsPayload).forEach((objKey) => {
                              each.value === objKey &&
                                setReviewsPayload((prev) => ({
                                  ...prev,
                                  [objKey]: i + 1,
                                }));
                            });
                          }}
                        />
                      </label>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <form onSubmit={handleReviewSubmitButton} className="text-right mt-6">
        <button
          type="submit"
          className="w-[120px] h-[40px] rounded-full bg-black text-white px-8"
        >
          Submit
        </button>
      </form>
    </Dialog>

    {/* submittion dialog */}
    <Dialog
        onClose={() => {
          submitPopup.isSubmitted
            ? (setOpen(false),
            setSubmitPopup((prev) => ({ ...prev, isSubmitted: false }))
          )
            : setSubmitPopup((prev) => ({ ...prev, errorPopup: false }));
        }}
        open={
          submitPopup.isSubmitted
            ? submitPopup.isSubmitted
            : submitPopup.errorPopup
        }
        contentClass={
          "relative md-m:h-[200px] md-m:px-8 md:h-[300px] !w-[500px] md-m:w-auto bg-[#fff] p-4 rounded-xl m-4"
        }
      >
        <div className="flex justify-center items-center h-full">
          <h1>{submitPopup.message}</h1>
        </div>

        <Image
          src={CloseIcon}
          alt="close"
          width={26}
          height={26}
          className="absolute top-2 right-3 md:top-4 md:right-6 cursor-pointer md:!w-6 md:!h-6"
          onClick={() => {
            submitPopup.isSubmitted
              ? (setOpen(false),
                setSubmitPopup((prev) => ({ ...prev, isSubmitted: false }))
              )
              : setSubmitPopup((prev) => ({ ...prev, errorPopup: false }));
          }}
        />
      </Dialog>
    </>
  );
}

export default ReviewDialog;
