import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DeleteIcon, EditIcon } from "../../../icons";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import { formatDate } from "../../../utils/common";
import DeletePopup from "../../../components/popup/deletePopup";
import {
  deleteProcessingFee,
  getProcessingFee,
} from "../../../services/processingFeeServices";
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";
import ProcessingFeeForm from "./processingForm";

const TABLE_COLUMNS = [
  {
    fieldName: "id",
    headName: "ID",
    sort: false,
    filter: false,
    className: "w-[200px]",
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

function ProcessingFee() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [isOpen, setIsOpen] = useState({
    isEdit: false,
    isDelete: false,
    isCreate: false,
  });
  const [deletedObj, setDeletedObj] = useState(null);
  const [editObj, setEditObj] = useState(null);

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    // console.log("getdata triggered");
    dispatch(loaderStart());
    getProcessingFee()
      .then((response) => {
        dispatch(loaderSuccess());
        let res = response.data.data;
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
      res.is_active = res.is_active ? "true" : "false";
      res.is_deleted = res.is_deleted ? "true" : "false";
      res.createdAt = getFormatDate(res.createdAt);
      res.updatedAt = getFormatDate(res.updatedAt);
    });
    // console.log("rows ====>", response);
    return response;
  }

  const getFormatDate = (date) => {
    return formatDate(date);
  };

  function getEditComponent(item) {
    return (
      <div onClick={() => handleEdit(item)}>
        <EditIcon />
      </div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div onClick={() => handleDelete(item)}>
        <DeleteIcon />
      </div>
    );
  }

  const handleEdit = (item) => {
    setIsOpen({ ...isOpen, isEdit: true });
    setEditObj(item);
  };

  const handleDelete = (data) => {
    const { id } = data;
    setIsOpen({ ...isOpen, isDelete: true });
    setDeletedObj({ Id: id });
  };

  const handleCreate = () => {
    setIsOpen({ ...isOpen, isCreate: true });
  };

  const hidePopup = () => {
    setIsOpen({ isEdit: false, isDelete: false, isCreate: false });
  };

  const handleDeleteRequest = () => {
    dispatch(loaderStart());
    deleteProcessingFee(deletedObj.Id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  // const handlePutRequest = (formData) =>{
  //   dispatch(loaderStart());
  //   editHouseRules(formData.id,formData)
  //     .then(() => {
  //       dispatch(loaderSuccess());
  //     })
  //     .catch((e) => {
  //       dispatch(error("Error ==> The Data is not Updated"));
  //     });
  // };

  // const handlePostRequest = (formData) =>{
  //   dispatch(loaderStart());
  //   postHouseRules(formData)
  //     .then(() => {
  //       dispatch(loaderSuccess());
  //     })
  //     .catch((e) => {
  //       dispatch(error("Error ==> The Data is not Added"));
  //     });
  // };

  // const handleSubmitClick = (uniqueId) =>{
  //   if (uniqueId){
  //     TABLE_COLUMNS.map(each => {
  //       if (each.id === uniqueId){
  //         return handleDelete();
  //       }
  //       return handleErrorInApi();
  //     })
  //   }
  // }

  return (
    <div className="m-3">
      <PageHeader title="Processing Fee" onClick={handleCreate} />
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
          filter={false}
          pagiNationFilter={false}
        />
      )}

      {isOpen.isDelete && deletedObj !== null && (
        <DeletePopup
          title={"Processing Fee"}
          setIsOpen={setIsOpen}
          deletedObj={deletedObj}
          onDeleteList={handleDeleteRequest}
        />
      )}
      {isOpen.isEdit && editObj !== null && (
        <Dialog
          closeModal={hidePopup}
          isOpen={isOpen.isEdit}
          title={"Processing Fee"}
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ProcessingFeeForm
            hidePopup={hidePopup}
            updateData={editObj}
            btn={isOpen}
            setPageLoad={setPageLoad}
            isEdit={isOpen.isEdit}
          />
        </Dialog>
      )}
      {isOpen.isCreate && (
        <Dialog
          closeModal={hidePopup}
          isOpen={isOpen.isCreate}
          createClick={isOpen.isCreate}
          title={"Processing Fee"}
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ProcessingFeeForm
            createClick={isOpen.isCreate}
            isEdit={isOpen.isCreate}
            hidePopup={hidePopup}
            updateData={{
              country_id: "",
              name: "",
              slug: "",
              type: "",
              fee_amount: "",
            }}
            btn={isOpen}
            readOnly={false}
            setPageLoad={setPageLoad}
          />
        </Dialog>
      )}
    </div>
  );
}

export default ProcessingFee;
