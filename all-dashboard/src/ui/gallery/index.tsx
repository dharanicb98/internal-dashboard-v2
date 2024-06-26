import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
// import { useListingDetailsSelector } from "store/selectors/listing";
import { updateListingDetails } from "store/slices/listing";

export default function Gallery(props: GalleryProps) {
  const {
    data,
    imgComponent = (value) => (
      <Image
        className="h-auto max-w-full rounded-lg"
        src={value.src}
        alt={value.alt || ""}
        width={value.width || 400}
        height={value.height || 400}
      />
    ),
  } = props;

  // const listingDetails = useListingDetailsSelector();

  const dispatch = useDispatch();
  const dragStart = useRef(0);
  const draggedOver = useRef(0);

  // console.log("aaaaaaaaaaaaa", listingDetails);

  const handleUpdateData = (key, value) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  const handleSort = () => {
    let listClone = [...data];
    // console.log("listClone-------", listClone);

    const removedDraggedItem = listClone.splice(dragStart.current, 1)[0];
    listClone.splice(draggedOver.current, 0, removedDraggedItem);
    dragStart.current = 0;
    draggedOver.current = 0;
    listClone = listClone.map((each, i) => ({ ...each, sequence: i + 1 }));
    handleUpdateData("media", listClone);
  };
  console.log("data-------------", data);
  return (
    <div className="grid grid-cols-4 gap-y-8 gap-x-[26px] md:grid-cols-2 ">
      {data?.map((item, idx) => (
        <div
          draggable
          onDragStart={() => (dragStart.current = idx)}
          onDragEnter={() => (draggedOver.current = idx)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          className=" first:col-span-3 first:row-span-2 first:md:col-span-2 group"
          key={item._id || idx}
        >
          {imgComponent(item)}
        </div>
      ))}
    </div>
  );
}

interface ImageData extends Record<string, any> {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
}

interface GalleryProps {
  data: ImageData[];
  imgComponent?: (value: ImageData) => React.ReactNode;
}
