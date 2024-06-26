import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import { useDispatch } from "react-redux";
import {
  deletePage,
  getPageById,
  updatePage,
} from "../../../services/pageConfig";
import PageHeader from "../../pageHeader";
import Dialog from "../../../ui/dialog";
import { DeleteIcon, EditIcon } from "../../../icons";
import DeletePopup from "../../popup/deletePopup";
import PageConfigFeaturedDestinationForm from "./pageConfigFeaturedDestinationForm";
import PageConfigAmenitiesHighlightsForm from "./pageConfigDropdownOptions/pageConfigAmenitiesHighlightsForm";
import {
  getAmenitiesData,
  getCategories,
} from "../../../store/reducers/listingAttributesSlice";
import PageConfigPropertyTypeForm from "./pageConfigDropdownOptions/pageConfigPropertyTypeForm";
import {
  getAllDestinations,
  getAllRegions,
} from "../../../services/listingsServices";

const PageConfigInnerPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [pageLoad, setPageLoad] = useState(false);
  const [data, setData] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [amenitiesPop, setAmenitiesPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [propertyTypePop, setPropertyTypePop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });

  //   console.log("params000000000000", params);

  useEffect(() => {
    getData();
  }, [pageLoad]);

  useEffect(() => {
    dispatch(getAmenitiesData());
    dispatch(getCategories());
    // dispatch(getAllRegions());
    // dispatch(getAllDestinations());
  }, []);

  function getData() {
    dispatch(loaderStart());
    getPageById(params.id)
      .then((response) => {
        // console.log(response);
        dispatch(loaderSuccess());
        let res = response.data;
        // console.log("//////////////", res);
        // let result = transformRows(res);
        setData(res);
      })
      .catch((err) => {
        dispatch(error(err?.response?.data?.error?.message));
        // console.log(err);
      });
  }

  // feature Destination
  const handleCreateOpen = () => {
    setPop({ ...pop, isCreate: true });
  };

  const handleCreateClose = () => {
    setPop({ ...pop, isCreate: false });
  };

  const handleEditClose = () => {
    setPop({ ...pop, isEdit: false });
  };

  const handleEditOpen = (item, ind) => {
    // console.log("handleEdit Open--------", item);
    // console.log("item props id", item?.id?.props?.children);
    setActiveItem({ ...item, index: ind });
    setPop({ ...pop, isEdit: true });
  };

  const handleOpen = (item, ind) => {
    // console.log("handle Open--------", item);
    setActiveItem({ ...item, index: ind });
    setPop({ ...pop, isDelete: true });
  };

  const handlePutRequest = (formData) => {
    // console.log("put request", { ...formData });
    const updatedData = data[0]?.search_options?.items.map((eachItem, i) => {
      if (i === formData.index) {
        delete formData.index;
        return { ...formData };
      }
      return { ...eachItem };
    });
    // console.log("update Data", updatedData);
    const searchOptions = {
      search_options: {
        heading: "Featured Destination",
        items: updatedData,
      },
    };
    dispatch(loaderStart());
    updatePage(params.id, searchOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        // console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log("formData---------", formData);
    const searchOptions = {
      search_options: {
        heading: "Featured Destination",
        items:
          data[0]?.search_options?.items.length > 0
            ? [...data[0]?.search_options?.items, { ...formData }]
            : [{ ...formData }],
      },
    };
    // console.log(searchOptions);
    dispatch(loaderStart());
    updatePage(params.id, searchOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        dispatch(error(e));
        // console.log(e);
      });
    console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    const updatedData = data[0]?.search_options?.items.filter(
      (_, i) => i !== activeItem.index
    );
    const searchOptions = {
      search_options: {
        heading: "Featured Destination",
        items: updatedData,
      },
    };
    updatePage(params.id, searchOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        // console.log(e);
        dispatch(error(e));
      });
    console.log("deleted");
  };

  // Amenities Highlights

  const handleAmenitiesCreateOpen = () => {
    setAmenitiesPop({ ...amenitiesPop, isCreate: true });
  };

  const handleAmenitiesCreateClose = () => {
    setAmenitiesPop({ ...amenitiesPop, isCreate: false });
  };

  const handleAmenitiesEditClose = () => {
    setAmenitiesPop({ ...amenitiesPop, isEdit: false });
  };

  const handleAmenitiesEditOpen = (item, ind) => {
    // console.log("handleEdit Open--------", item);
    // console.log("item props id", item?.id?.props?.children);
    setActiveItem({ ...item, index: ind });
    setAmenitiesPop({ ...amenitiesPop, isEdit: true });
  };

  const handleAmenitiesDeleteOpen = (item, ind) => {
    // console.log("handle Open--------", item);
    setActiveItem({ ...item, index: ind });
    setAmenitiesPop({ ...amenitiesPop, isDelete: true });
  };

  const handleAmenitiesHighlightsPutRequest = (formData) => {
    // console.log("put request", { ...formData });
    const updatedData = data[0]?.dropdown_options?.amenities_highlight.map(
      (eachItem, i) => {
        if (i === formData.index) {
          delete formData.index;
          return { ...formData };
        }
        return { ...eachItem };
      }
    );
    // console.log("update Data", updatedData);
    const dropdownOptions = {
      dropdown_options: {
        amenities_highlight: updatedData,
        property_type: [...data[0]?.dropdown_options?.property_type],
      },
    };
    dispatch(loaderStart());
    updatePage(params.id, dropdownOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        // console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handleAmenitiesHighlightsPostRequest(formData) {
    const dropdownOptions = {
      dropdown_options: {
        amenities_highlight:
          data[0]?.dropdown_options?.amenities_highlight?.length > 0
            ? [
                ...data[0]?.dropdown_options?.amenities_highlight,
                { ...formData },
              ]
            : [{ ...formData }],
        property_type:
          data[0]?.dropdown_options?.property_type?.length > 0
            ? [...data[0]?.dropdown_options?.property_type]
            : [],
      },
    };
    // console.log("dropdownOptions-----------", dropdownOptions);
    dispatch(loaderStart());
    updatePage(params.id, dropdownOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        dispatch(error(e));
        // console.log(e);
      });
    console.log("post req");
  }

  const onDeleteAmenitiesHighlightsList = () => {
    dispatch(loaderStart());
    const updatedData = data[0]?.dropdown_options?.amenities_highlight.filter(
      (_, i) => i !== activeItem.index
    );
    const dropdownOptions = {
      dropdown_options: {
        amenities_highlight: updatedData,
        property_type: [...data[0]?.dropdown_options?.property_type],
      },
    };
    updatePage(params.id, dropdownOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        // console.log(e);
        dispatch(error(e));
      });
    console.log("deleted");
  };

  // Property Type

  const handlePropertyTypeCreateOpen = () => {
    setPropertyTypePop({ ...propertyTypePop, isCreate: true });
  };

  const handlePropertyTypeCreateClose = () => {
    setPropertyTypePop({ ...propertyTypePop, isCreate: false });
  };

  const handlePropertyTypeEditClose = () => {
    setPropertyTypePop({ ...propertyTypePop, isEdit: false });
  };

  const handlePropertyTypeEditOpen = (item, ind) => {
    // console.log("handleEdit Open--------", item);
    // console.log("item props id", item?.id?.props?.children);
    setActiveItem({ ...item, index: ind });
    setPropertyTypePop({ ...propertyTypePop, isEdit: true });
  };

  const handlePropertyTypeDeleteOpen = (item, ind) => {
    // console.log("handle Open--------", item);
    setActiveItem({ ...item, index: ind });
    setPropertyTypePop({ ...propertyTypePop, isDelete: true });
  };

  const handlePropertyTypePutRequest = (formData) => {
    // console.log("put request", { ...formData });
    const updatedData = data[0]?.dropdown_options?.property_type.map(
      (eachItem, i) => {
        if (i === formData.index) {
          delete formData.index;
          return { ...formData };
        }
        return { ...eachItem };
      }
    );

    const dropdownOptions = {
      dropdown_options: {
        amenities_highlight: [
          ...data[0]?.dropdown_options?.amenities_highlight,
        ],
        property_type: updatedData,
      },
    };
    console.log("update Data", updatedData, dropdownOptions);
    dispatch(loaderStart());
    updatePage(params.id, dropdownOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        // console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handlePropertyTypePostRequest(formData) {
    // console.log(
    //   "PropertyType formData---------",
    //   formData
    // );
    const dropdownOptions = {
      dropdown_options: {
        amenities_highlight:
          data[0]?.dropdown_options?.amenities_highlight?.length > 0
            ? [...data[0]?.dropdown_options?.amenities_highlight]
            : [],
        property_type:
          data[0]?.dropdown_options?.property_type?.length > 0
            ? [...data[0]?.dropdown_options?.property_type, { ...formData }]
            : [{ ...formData }],
      },
    };
    // console.log("dropdownOptions-----------", dropdownOptions);
    dispatch(loaderStart());
    updatePage(params.id, dropdownOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        dispatch(error(e));
        // console.log(e);
      });
    console.log("post req");
  }

  const onDeletePropertyTypeList = () => {
    dispatch(loaderStart());
    const updatedData = data[0]?.dropdown_options?.property_type.filter(
      (_, i) => i !== activeItem.index
    );
    const dropdownOptions = {
      dropdown_options: {
        amenities_highlight: [
          ...data[0]?.dropdown_options?.amenities_highlight,
        ],
        // data[0]?.dropdown_options?.amenities_highlight?.length > 0
        //   ? [...data[0]?.dropdown_options?.amenities_highlight]
        //   : [],
        property_type: updatedData,
      },
    };
    updatePage(params.id, dropdownOptions)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        // console.log(e);
        dispatch(error(e));
      });
    console.log("deleted");
  };

  // console.log("dataaaaaaaaaaaaaaaaaaa-------------", data, activeItem);

  return (
    <div className="m-8">
      {/* Featured Destination */}
      <div>
        <PageHeader
          title="Featured Destinations"
          buttonName="Add"
          onClick={handleCreateOpen}
        />

        <ul>
          <li className="flex m-3 p-3 text-xl">
            <div className="w-[200px]">Item Type</div> <div>Label</div>
          </li>
          {data[0]?.search_options?.items?.map((e, i) => (
            <li
              key={i}
              className="border m-3 flex items-center justify-between p-3"
            >
              <div className="flex">
                <div className="w-[200px]">{e.item_type}</div>
                <div>{e.item_label}</div>
              </div>
              <div className="flex justify-around w-[200px] ">
                <div onClick={() => handleEditOpen(e, i)}>
                  <EditIcon />
                </div>
                <div onClick={() => handleOpen(e, i)}>
                  <DeleteIcon />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {pop.isCreate && (
          <Dialog
            closeModal={handleCreateClose}
            isOpen={pop.isCreate}
            createClick={pop.isCreate}
            title="Page Config"
            childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
          >
            <PageConfigFeaturedDestinationForm
              isEdit={pop.isCreate}
              close={handleCreateClose}
              editData={{
                item_type: "",
                item_sequence: "",
                item_ref_id: "",
                item_label: "",
                item_image: "",
              }}
              handleRequest={handlePostRequest}
              value="Create"
              createClick={pop.isCreate}
            />
          </Dialog>
        )}

        {pop.isDelete && (
          <DeletePopup
            deletedObj={{ item_type: activeItem?.item_type }}
            setIsOpen={setPop}
            title="Page Config"
            onDeleteList={onDeleteList}
          />
        )}

        {pop.isEdit && (
          <Dialog
            closeModal={handleEditClose}
            isOpen={pop.isEdit}
            title="Page Config"
            childrenClass={
              "w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"
            }
          >
            <PageConfigFeaturedDestinationForm
              isEdit={pop.isEdit}
              close={handleEditClose}
              editData={{
                index: activeItem.index,
                item_type: activeItem.item_type,
                item_sequence: activeItem.item_sequence,
                item_ref_id: activeItem.item_ref_id,
                item_label: activeItem.item_label,
                item_image: activeItem.item_image,
              }}
              handleRequest={handlePutRequest}
              value="Update"
            />
          </Dialog>
        )}
      </div>
      {/* Amenities Highlight */}
      <div className="m-8">
        <h1 className="text-2xl font-semibold">Dropdown Options</h1>
        <PageHeader
          title="Amenities Highlights"
          buttonName="Add"
          onClick={handleAmenitiesCreateOpen}
        />

        {amenitiesPop.isCreate && (
          <Dialog
            closeModal={handleAmenitiesCreateClose}
            isOpen={amenitiesPop.isCreate}
            createClick={amenitiesPop.isCreate}
            title="Page Config"
            childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
          >
            <PageConfigAmenitiesHighlightsForm
              isEdit={amenitiesPop.isCreate}
              close={handleAmenitiesCreateClose}
              editData={{
                ref_id: "",
                name: "",
                sequence: "",
              }}
              handleRequest={handleAmenitiesHighlightsPostRequest}
              value="Create"
              createClick={amenitiesPop.isCreate}
            />
          </Dialog>
        )}

        {amenitiesPop.isEdit && (
          <Dialog
            closeModal={handleAmenitiesEditClose}
            isOpen={amenitiesPop.isEdit}
            title="Page Config"
            childrenClass={
              "w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"
            }
          >
            <PageConfigAmenitiesHighlightsForm
              isEdit={amenitiesPop.isEdit}
              close={handleAmenitiesEditClose}
              editData={{
                index: activeItem.index,
                ref_id: activeItem.ref_id,
                sequence: activeItem.sequence,
                name: activeItem.name,
              }}
              handleRequest={handleAmenitiesHighlightsPutRequest}
              value="Update"
            />
          </Dialog>
        )}

        {amenitiesPop.isDelete && (
          <DeletePopup
            deletedObj={{ name: activeItem?.name }}
            setIsOpen={setAmenitiesPop}
            title="Page Config"
            onDeleteList={onDeleteAmenitiesHighlightsList}
          />
        )}

        <ul>
          {/* <li className="flex m-3 p-3 text-xl">
            <div className="w-[200px]">Item Type</div> <div>Label</div>
          </li> */}
          {data[0]?.dropdown_options?.amenities_highlight?.map((e, i) => (
            <li
              key={i}
              className="border m-3 flex items-center justify-between p-3"
            >
              <div className="flex">
                <div className="w-[200px]">{e.name}</div>
                <div>{e.sequence}</div>
              </div>
              <div className="flex justify-around w-[200px] ">
                <div onClick={() => handleAmenitiesEditOpen(e, i)}>
                  <EditIcon />
                </div>
                <div onClick={() => handleAmenitiesDeleteOpen(e, i)}>
                  <DeleteIcon />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/*property Type*/}

      <div className="m-8">
        <PageHeader
          title="Property Types"
          buttonName="Add"
          onClick={handlePropertyTypeCreateOpen}
        />

        {propertyTypePop.isCreate && (
          <Dialog
            closeModal={handlePropertyTypeCreateClose}
            isOpen={propertyTypePop.isCreate}
            createClick={propertyTypePop.isCreate}
            title="Property Type"
            childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
          >
            <PageConfigPropertyTypeForm
              isEdit={propertyTypePop.isCreate}
              close={handlePropertyTypeCreateClose}
              editData={{
                type: "category",
                type_ref_id: "",
                sequence_no: "",
                name: "",
                image: "",
              }}
              handleRequest={handlePropertyTypePostRequest}
              value="Create"
              createClick={propertyTypePop.isCreate}
            />
          </Dialog>
        )}

        {propertyTypePop.isEdit && (
          <Dialog
            closeModal={handlePropertyTypeEditClose}
            isOpen={propertyTypePop.isEdit}
            title="Property Type"
            childrenClass={
              "w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"
            }
          >
            <PageConfigPropertyTypeForm
              isEdit={propertyTypePop.isEdit}
              close={handlePropertyTypeEditClose}
              editData={{
                index: activeItem.index,
                type: "category",
                type_ref_id: activeItem.type_ref_id,
                sequence_no: activeItem.sequence_no,
                name: activeItem.name,
                image: activeItem.image,
              }}
              handleRequest={handlePropertyTypePutRequest}
              value="Update"
            />
          </Dialog>
        )}

        {propertyTypePop.isDelete && (
          <DeletePopup
            deletedObj={{ name: activeItem?.name }}
            setIsOpen={setPropertyTypePop}
            title="Property Type"
            onDeleteList={onDeletePropertyTypeList}
          />
        )}

        <ul>
          {/* <li className="flex m-3 p-3 text-xl">
            <div className="w-[200px]">Item Type</div> <div>Label</div>
          </li> */}
          {data[0]?.dropdown_options?.property_type?.map((e, i) => (
            <li
              key={i}
              className="border m-3 flex items-center justify-between p-3"
            >
              <div className="flex">
                <div className="w-[200px]">{e.name}</div>
                <div>{e.sequence}</div>
              </div>
              <div className="flex justify-around w-[200px] ">
                <div onClick={() => handlePropertyTypeEditOpen(e, i)}>
                  <EditIcon />
                </div>
                <div onClick={() => handlePropertyTypeDeleteOpen(e, i)}>
                  <DeleteIcon />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageConfigInnerPage;
