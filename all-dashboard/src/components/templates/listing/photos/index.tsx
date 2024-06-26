import React, { useState } from "react";
import GroupWrapper from "components/templates/listing/general/groupWrapper";
import { FilledButton } from "ui/buttons";
import HighlightCard from "components/templates/listing/photos/highlight-card";
import Gallery from "ui/gallery";
import MediaDialog, {
  MediaContentType,
} from "components/templates/listing/general/dialogues/highlightDialog";
import AddCard from "components/templates/listing/general/cards/addCard";
import MediaCard from "components/templates/listing/general/cards/mediaCard";
import AddMediaDialog from "components/templates/listing/general/dialogues/mediaDialog";
import Divider from "ui/divider";
import { useListingDetailsSelector } from "store/selectors/listing";
import AddIcon from "assets/icons/add-sm.png";
import Image from "next/image";
import ConfirmDialog from "ui/dialog/confirmDialog";
import { updateListingDetails } from "store/slices/listing";
import { useDispatch } from "react-redux";
import { ListingDataType } from "types/listing";
import { isEqual } from "lodash";
import { generateUUID } from "utils/common";
import Axios from "utils/axios";

export default function PhotosContent(props: PropertyContentProps) {
  const {} = props;
  const dispatch = useDispatch();
  const [showHighlightDialog, setShowHighlightDialog] =
    React.useState<MediaContentType | null>(null);
  const [showGalleryDialog, setShowGalleryDialog] = React.useState<
    true | string
  >("");
  const [showConfirm, setShowConfirm] = React.useState<string>("");
  const listingDetails = useListingDetailsSelector();
  const highlightedImages =
    listingDetails?.media?.filter((item) => item.is_highlighted) || [];
  const photoGalleryImages =
    listingDetails?.media?.filter((item) => !item.is_highlighted) || [];
  const [images, setImages] = useState([]);

  const handleChangeListingDetails = (
    key: keyof ListingDataType,
    value: ListingDataType[keyof ListingDataType]
  ) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  React.useEffect(() => {
    (async () => {
      const filterImageIds =
        listingDetails?.media?.map((item) => item?.id) || [];
      try {
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/v2/upload/image/public/query`,
          { filters: [{ col: "id", val: filterImageIds, type: "array" }] }
        );
        setImages(response.data);
      } catch (e) {
        console.log("error in api", e);
      }
    })();
  }, [listingDetails?.media]);

  // console.log("photoGalleryImages-----------", photoGalleryImages);
  return (
    <div className="flex flex-col md:flex-col-reverse">
      <div className="bg-cover" />
      <MediaDialog
        open={!!showHighlightDialog}
        onClose={(value) => {
          if (value && !isEqual(showHighlightDialog, value)) {
            let addedMedia = [...listingDetails.media].map((a) => {
              return { ...a };
            });
            if (value?.editable) {
              const removeIndex = listingDetails.media.findIndex(
                (v) => v.id == value.editable
              );
              const nObject = {
                ...addedMedia[removeIndex],
                ...(value?.media?.[0] || {}),
                title: value?.title,
                description: value?.description,
              };
              addedMedia[removeIndex] = nObject;
            } else {
              addedMedia = [
                ...listingDetails.media,
                {
                  ...(value?.media?.[0] || {}),
                  title: value?.title,
                  description: value?.description,
                  is_highlighted: true,
                  _id: generateUUID(),
                },
              ];
            }
            handleChangeListingDetails("media", addedMedia as any);
          }
          setShowHighlightDialog(null);
        }}
        defaultValues={showHighlightDialog}
      />
      <AddMediaDialog
        open={!!showGalleryDialog}
        onClose={(value) => {
          if (value && !isEqual(showGalleryDialog, value)) {
            const addedMedia = [
              ...listingDetails.media,
              {
                ...(value?.[0] || {}),
                is_highlighted: false,
                _id: generateUUID(),
              },
            ];
            handleChangeListingDetails("media", addedMedia as any);
            setShowHighlightDialog(null);
          } else {
            setShowHighlightDialog(null);
          }
          setShowGalleryDialog("");
        }}
        defaultImage={showGalleryDialog === true ? "" : showGalleryDialog}
      />

      <ConfirmDialog
        confirmText="Are you sure you want remove?"
        confirmAction={() => {
          let filterMedia = [...listingDetails.media].map((a) => {
            return { ...a };
          });
          if (showConfirm && String(showConfirm).includes("highlight_")) {
            const removeIndex = listingDetails.media.findIndex(
              (v) => v.id == showConfirm.replace("highlight_", "")
            );
            filterMedia[removeIndex].is_highlighted = false;
          } else {
            filterMedia = listingDetails.media.filter(
              (item) => item.id != showConfirm
            );
          }
          handleChangeListingDetails("media", filterMedia);
          setShowConfirm("");
        }}
        declineAction={() => setShowConfirm("")}
        open={!!showConfirm}
      />
      <div>
        <GroupWrapper
          name="Highlights"
          description="Choose Your Property's Best Features: Select the most captivating pictures."
          descriptionClass="text-xl md:text-sm md:mt-5"
          wrapperClass="overflow-X-scroll "
        >
          <div className="flex gap-4 ">
            <AddCard
              title="Add Image"
              containerClass="h-56 w-40 self-start"
              onClick={() =>
                setShowHighlightDialog({
                  add: true,
                  media: "",
                  title: "",
                  description: "",
                })
              }
            />
            {highlightedImages?.map((item, idx) => (
              <HighlightCard
                imgUrl={`${
                  process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN
                }${images.find((e: any) => e.id == item.id)?.file_path}`}
                title={item.title}
                description={item.description}
                key={idx}
                onEdit={() => {
                  setShowHighlightDialog({
                    editable: item.id,
                    media: item.path,
                    title: item.title,
                    description: item.description,
                  });
                }}
                onRemove={() => setShowConfirm("highlight_" + item.id)}
              />
            ))}
          </div>
        </GroupWrapper>
      </div>
      <Divider className="my-6 " />
      <GroupWrapper
        name="Add more images to gallery"
        description="Choose Your Property's Best Features: Select the most captivating pictures."
        descriptionClass="text-xl md:hidden"
        wrapperClass="md:flex-col-reverse"
        action={
          <FilledButton
            onClick={() => setShowGalleryDialog(true)}
            text={
              <div className="flex items-center gap-3">
                <p>Add</p>
                <Image src={AddIcon} alt="add" className="md-m:hidden" />
              </div>
            }
            buttonClass="py-2.5 px-6 text-lg shrink-0 md:bg-white md:border md:border-grey md:text-black"
          />
        }
        containerClass="gap-5"
      >
        <div>
          <Gallery
            data={photoGalleryImages.map((item: any) => ({
              src: `${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}${images.find(
                (e: any) => e.id == item.id
              )?.file_path}`,
              ...item,
            }))}
            imgComponent={(value) => (
              <MediaCard
                imgUrl={value.src}
                containerClass="shadow w-[286px] h-[184px] group-first:w-full group-first:h-full group-first:min-h-[184px] group-first:md:h-[184px] rounded-2xl 1xl:w-full"
                actions={[
                  {
                    title: "Add to highlight",
                    handler: () => {
                      const filterMedia = listingDetails.media.map((item) =>
                        value.id == item.id
                          ? { ...item, is_highlighted: true }
                          : item
                      );
                      handleChangeListingDetails("media", filterMedia);
                    },
                  },
                  {
                    title: "Remove photo",
                    handler: () => {
                      setShowConfirm(value.id);
                    },
                  },
                ]}
              />
            )}
          />
        </div>
      </GroupWrapper>
    </div>
  );
}

interface PropertyContentProps {}
