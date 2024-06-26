/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../../store/reducers/loaderSlice";
import { useDispatch } from "react-redux";
import { DeleteIcon, EditIcon } from "../../../icons";
import DeletePopup from "../../../components/popup/deletePopup";
import { formatDate } from "../../../utils/common";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  updateDestination,
} from "../../../services/destinationsServices";
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";
import DestinationForm from "./destinationForm";

const TABLE_COLUMNS = [
  {
    fieldName: "id",
    headName: "ID",
    sort: false,
    filter: false,
    className: "w-[150px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "name",
    headName: "Name",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "slug",
    headName: "Slug Name",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "sequence_no",
    headName: "Sequence No",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "icon_path",
    headName: "Icon Path",
    filter: false,
    className: "w-[350px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "is_active",
    headName: "Active",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "is_deleted",
    headName: "Deleted",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "createdAt",
    headName: "Created At",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "updatedAt",
    headName: "Updated At",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "edit",
    headName: "Edit",
    filter: false,
    className: "w-[100px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "delete",
    headName: "Delete",
    filter: false,
    className: "w-[100px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
];
function Destinations() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [popup, setPopUp] = useState({
    isEdit: false,
    isDelete: false,
    isCreate: false,
  });

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllDestinations()
      .then((response) => {
        dispatch(loaderSuccess());
        let res = response.data.data;
        // console.log(res, "--------------------");
        let result = transformRows(res);
        setRows(result);
      })
      .catch((err) => {
        dispatch(error(err?.response?.data?.error?.message));
      });
  }

  const getNameIconComponent = (res) => (
    <div className="flex">
      <img src={`${process.env.REACT_APP_CDN_URL}${res?.icon_path}`} alt={`${res?.name}`} className="w-[20px] h-[20px] mr-1 self-center"/>
      <p className="self-center">{res?.name}</p>
    </div>
  )

  function transformRows(response) {
    response.forEach((res) => {
      res.edit = getEditComponent(res);
      res.delete = getDeleteComponent(res);
      res.createdAt = formatDate(res.createdAt);
      res.name = getNameIconComponent(res);
      res.updatedAt = formatDate(res.updatedAt);
      res.is_active = getActiveComponent(res.is_active);
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
    });
    // console.log("response", response);
    return response;
  }

  function getActiveComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  function getIsDeleteComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  function getEditComponent(item) {
    // console.log("----------------", item);
    return (
      <div>
        <EditIcon onClick={() => handleEditButton(item)} />
      </div>
    );
  }

  function handleEditButton(item) {
    // console.log("Radhe Radhe", item);

    setActiveItem(item);
    setPopUp((prev) => ({ ...prev, isEdit: true }));
  }

  const handleEditCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isEdit: false }));

  function getDeleteComponent(item) {
    return (
      <div>
        <DeleteIcon onClick={() => handleDeleteButton(item)} />
      </div>
    );
  }

  const handleDeleteButton = (item) => {
    // console.log("Response", item);

    setActiveItem(item);
    setPopUp((prev) => ({ ...prev, isDelete: true }));
  };

  const handleCreateButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: true }));

  const handleCreateCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: false }));

  const handlePutRequest = (formData) => {
    // console.log("put request");
    dispatch(loaderStart());
    updateDestination(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });

    // console.log("Radhe Radhe");
  };

  const handleDeleteRequest = () => {
    dispatch(loaderStart());
    deleteDestination(activeItem.id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("Delete Success");
      })
      .catch((e) => dispatch(error(e?.response?.data?.error?.message)));
  };

  const handlePostRequest = (formData) => {
    dispatch(loaderStart());
    // console.log("form data", formData);
    createDestination(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  // console.log("activeItem", activeItem);
  // console.log("rows", rows);
  return (
    <>
      <div className="m-3">
        <PageHeader title="Destination" onClick={handleCreateButton} />
        {rows && (
          <Table
            rows={rows}
            columns={TABLE_COLUMNS}
            filter={false}
            pagiNationFilter={false}
          />
        )}
      </div>

      {popup.isEdit && (
        <Dialog
          closeModal={handleEditCloseButton}
          isOpen={popup.isEdit}
          title="Destination"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <DestinationForm
            isEdit={popup.isEdit}
            close={handleEditCloseButton}
            editData={{
              id: activeItem?.id,
              name: activeItem?.name?.props?.children[1]?.props?.children,
              slug: activeItem?.slug,
              icon_path: activeItem?.icon_path,
              sequence_no: activeItem?.sequence_no,
              parent_id: activeItem?.parent_id,
              parent_type: "region",
            }}
            handleRequest={handlePutRequest}
            value="Update"
          />
        </Dialog>
      )}

      {popup.isDelete && (
        <DeletePopup
          deletedObj={{ name: activeItem?.name?.props?.children[1]?.props?.children, slug: activeItem?.slug }}
          title="Destination"
          onDeleteList={handleDeleteRequest}
          setIsOpen={setPopUp}
        />
      )}

      {popup.isCreate && (
        <Dialog
          closeModal={handleCreateCloseButton}
          isOpen={popup.isCreate}
          createClick={popup.isCreate}
          title="Destination"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <DestinationForm
            isEdit={popup.isCreate}
            close={handleCreateCloseButton}
            editData={{
              name: "",
              slug: "",
              icon_path: "",
              sequence_no: "",
              parent_id: "",
              parent_type: "region",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            createClick={popup.isCreate}
          />
        </Dialog>
      )}
    </>
  );
}

export default Destinations;
