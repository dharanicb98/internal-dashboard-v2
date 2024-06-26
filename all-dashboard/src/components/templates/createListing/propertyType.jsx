import { useDispatch } from "react-redux";
import { useCatagoriesSelector } from "selectors/listing";
import { updateData } from "slices/createListing";
import Image from "next/image";
import { useCreateListingDataSelector } from "selectors/createListing";

import Checkbox from "ui/input/checkbox";

function PropertyType() {
  const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

  const localStorageLoader = ({ src, width, quality }) => {
    return `${localStoragePath}${src}?q=${quality || 100}`;
  };

  const categoriesList = useCatagoriesSelector();
  const listingData = useCreateListingDataSelector();
  const dispatch = useDispatch();

  const handleUpdateData = (key, value) => {
    dispatch(updateData({ [key]: value }));
  };

  const findCategory = (id) =>
    listingData.categories.find((item) => id === item);

  const handleCategories = (id) => {
    let categories = [...listingData.categories];
    let findIndex = categories.indexOf(id);
    if (findIndex === -1) {
      categories.push(id);
    } else {
      categories.splice(findIndex, 1);
    }
    handleUpdateData("categories", categories);
  };

  // console.log("categories list", categoriesList);
  return (
    <div>
      <p className="before:content-['*'] before:text-primary mb-4 text-md leading-5 md:leading-8">
        Select Category type
      </p>
      <div className="grid grid-cols-4 xl:grid-cols-4 md:grid-cols-3 xs:grid-cols-2   sm:grid-cols-2 gap-6 ">
        {categoriesList.map((item, idx) => {
          return (
            <div
              className={`${
                listingData.categories.includes(item.id)
                  ? "border-black "
                  : "border-grey"
              } border  rounded-2xl cursor-pointer w-40 h-28 md:w-44 md:h-24 sm:w-full px-4 py-3 relative flex flex-col items-center justify-center`}
              key={idx}
              onClick={() => handleCategories(item.id)}
            >
              {/* <Image
                // src={item.icon_path}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxnpVUzgyyp7rmUxx5fgb0F7xnq1PGL4eVw&usqp=CAU'
                alt={item.name}
                width={96}
                height={96}
                className="w-9 h-9 !md:w-11 !md:h-11"
              /> */}

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxnpVUzgyyp7rmUxx5fgb0F7xnq1PGL4eVw&usqp=CAU"
                alt={item.name}
                width={96}
                height={96}
                className="w-9 h-9 !md:w-11 !md:h-11"
              />

              <p className="pb-2 text-center text-sm leading-5 font-medium">
                {item.name}
              </p>
              <Checkbox
                isChecked={!!findCategory(item.id)}
                handleChange={() => {}}
                className="absolute top-4 right-3"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PropertyType;
