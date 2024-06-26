import { useDispatch } from "react-redux";
import { useCreateListingDataSelector } from "selectors/createListing";
import { updateData } from "slices/createListing";
import EditableTextField from "ui/input/editableTextfield";

function PropertyDetails() {
  const listingData = useCreateListingDataSelector();
  const dispatch = useDispatch();

  const handleUpdateData = (key, value) => {
    dispatch(updateData({ [key]: value }));
  };

  function convertToSlug(str = "") {
    str = str
      .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
      .toLowerCase();
    str = str.replace(/^\s+|\s+$/gm, "");
    return str.replace(/\s+/g, "-");
  }

  return (
    <div>
      <div className="mb-8 border-b border-b-grey">
        <p className="before:content-['*'] before:text-primary mb-4 text-base">
          Title
        </p>
        <EditableTextField
          defaultValue={listingData.title}
          handleChange={(value) => handleUpdateData("title", value)}
          textClass="text-xl leading-5 font-semibold"
          showTextBox={true}
        />
      </div>

      <div className="my-4">
        <p className="text-base mb-4">Permalink</p>
        <EditableTextField
          defaultValue={
            listingData.permalink ? listingData.permalink : listingData.title
          }
          handleChange={(value) => {
            handleUpdateData(
              "permalink",
              listingData.permalink ? value : listingData?.title
            );
          }}
          textClass="text-xl leading-5 font-normal"
          showTextBox={true}
        />
        <p className="mb-3 mt-2">{convertToSlug(listingData?.title)}</p>
        <a
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/listing/${
            listingData.permalink ? listingData?.permalink : listingData?.title
          }`}
        >
          {process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/listing/
          {listingData.permalink ? listingData?.permalink : listingData?.title}
        </a>
      </div>

      <div>
        <p className="before:content-['*'] before:text-primary mb-4 text-base">
          Description
        </p>
        <EditableTextField
          defaultValue={listingData.description}
          handleChange={(value) => handleUpdateData("description", value)}
          textClass="text-xl font-normal leading-8 md:leading-7"
          showTextBox={true}
        />
      </div>
    </div>
  );
}

export default PropertyDetails;
