/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "../../../utils/common";
import { DeleteIcon, EditIcon } from "../../../icons";
import DeletePopup from "../../../components/popup/deletePopup";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import Table from "../../../components/hkTable";
import PageHeader from "../../../components/pageHeader";
import Dialog from "../../../ui/dialog";
import {
  createExtraService,
  deleteExtraService,
  getAllExtraServices,
  updateExtraService,
} from "../../../services/extraServices";
import ExtraServicesForm from "./extraServicesForm";

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
    fieldName: "amount_type",
    headName: "Amount Type",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "select",
    hideColumn: false,
  },
  {
    fieldName: "amount",
    headName: "Amount",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "number",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
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
function ExtraServices() {
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
    getAllExtraServices()
      .then((response) => {
        dispatch(loaderSuccess());
        let res = response.data.data;
        console.log(res, "--------------------");
        let result = transformRows(res);
        setRows(result);
      })
      .catch((err) => {
        dispatch(error(err?.response?.data?.error?.message));
      });
  }

  function transformRows(response) {
    response.forEach((res) => {
      res.edit = getEditComponent(res);
      res.delete = getDeleteComponent(res);
      res.createdAt = formatDate(res.createdAt);
      res.updatedAt = formatDate(res.updatedAt);
      res.is_active = res.active ? "true" : "false";
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
    });
    // console.log("response", response);
    return response;
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
    // console.log("put request", formData);
    dispatch(loaderStart());
    updateExtraService(formData)
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
    deleteExtraService(activeItem.id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("Delete Success");
      })
      .catch((e) => dispatch(error(e?.response?.data?.error?.message)));
  };

  const handlePostRequest = (formData) => {
    formData = { ...formData, sequence_no: parseInt(formData.sequence_no) };
    dispatch(loaderStart());
    createExtraService(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e));
      });
  };

  // console.log("activeItem", activeItem);
  console.log("rows", rows);
  return (
    <>
      <div className="m-3">
        <PageHeader title="Extra Services" onClick={handleCreateButton} />
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
          title="Extra Service"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ExtraServicesForm
            isEdit={popup.isEdit}
            close={handleEditCloseButton}
            editData={{
              id: activeItem.id,
              name: activeItem.name,
              slug: activeItem.slug,
              sequence_no: activeItem.sequence_no,
              amount: activeItem.amount,
              amount_type: activeItem.amount_type,
            }}
            handleRequest={handlePutRequest}
            value="Update"
          />
        </Dialog>
      )}

      {popup.isDelete && (
        <DeletePopup
          deletedObj={{ name: activeItem?.name, slug: activeItem?.slug }}
          title="Extra Service"
          onDeleteList={handleDeleteRequest}
          setIsOpen={setPopUp}
        />
      )}

      {popup.isCreate && (
        <Dialog
          closeModal={handleCreateCloseButton}
          isOpen={popup.isCreate}
          createClick={popup.isCreate}
          title="Extra Service"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ExtraServicesForm
            isEdit={popup.isCreate}
            close={handleCreateCloseButton}
            editData={{
              name: "",
              slug: "",
              sequence_no: "",
              amount: "",
              amount_type: "",
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

export default ExtraServices;
