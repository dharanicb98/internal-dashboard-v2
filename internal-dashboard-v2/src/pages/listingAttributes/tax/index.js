import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../../store/reducers/loaderSlice";
import { DeleteIcon, EditIcon } from "../../../icons";
import { formatDate } from "../../../utils/common";
import DeletePopup from "../../../components/popup/deletePopup";
import {
  deleteTax,
  getAllTax,
  postTax,
  putTax,
} from "../../../services/taxServices";
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";
import TaxForm from "./taxForm";

const TABLE_COLUMNS = [
  {
    fieldName: "country_id",
    headName: "Country ID",
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
    fieldName: "value",
    headName: "Value",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "type",
    headName: "Type",
    filter: false,
    className: "w-[150px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "per_person",
    headName: "Per Person",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "per_night",
    headName: "Per Night",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "per_bedroom",
    headName: "Per Bedroom",
    filter: false,
    className: "w-[200px]",
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

function Tax() {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [deletedObj, setDeletedObj] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleOpen = (item) => {
    const { id, name, value } = item;
    setDeletedObj({ ID: id, Name: name, Value: value });
    setPop({ ...pop, isDelete: true });
  };

  const handleEditOpen = (item) => {
    const {
      id,
      country_id,
      type,
      value,
      name,
      per_person,
      per_night,
      per_bedroom,
    } = item;
    setEditData({
      id,
      country_id,
      type,
      value,
      name,
      per_person,
      per_night,
      per_bedroom,
    });
    setPop({ ...pop, isEdit: true });
  };

  const handleEditClose = () => {
    setPop({ ...pop, isEdit: false });
  };

  const handleCreateOpen = () => {
    setPop({ ...pop, isCreate: true });
  };

  const handleCreateClose = () => {
    setPop({ ...pop, isCreate: false });
  };

  const handlePutRequest = (formData) => {
    console.log("put request", formData);
    dispatch(loaderStart());
    putTax(formData)
      .then((a) => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("put request success", a);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
        console.log(e.message);
      });
  };

  function handlePostRequest(formData) {
    // console.log(formData)
    dispatch(loaderStart());
    postTax(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        console.log(e);
        dispatch(error(e?.response?.data?.error?.message));
      });
    // console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteTax(deletedObj.ID)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
    // console.log("deleted");
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllTax()
      .then((response) => {
        // console.log(response);
        dispatch(loaderSuccess());
        let res = response.data.data;
        // console.log(res);
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
      res.is_active = getActiveComponent(res.is_active);
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
      res.per_person = res.per_person ? "true" : "false";
      res.per_night = res.per_night ? "true" : "false";
      res.per_bedroom = res.per_bedroom ? "true" : "false";
    });
    return response;
  }
  function getEditComponent(item) {
    return (
      <div onClick={() => handleEditOpen(item)}>
        <EditIcon />
      </div>
    );
  }
  function getDeleteComponent(item) {
    return (
      <div>
        <DeleteIcon onClick={() => handleOpen(item)} />
      </div>
    );
  }

  function getActiveComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  function getIsDeleteComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  // console.log("rows---------", rows);
  return (
    <div className="m-3">
      <PageHeader title="Tax" onClick={handleCreateOpen} />
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
          filter={false}
          pagiNationFilter={false}
        />
      )}
      {pop.isDelete && deletedObj !== null && (
        <DeletePopup
          // isOpen={pop.isDelete}
          deletedObj={deletedObj}
          setIsOpen={setPop}
          // close={handleClose}
          title="Tax"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Tax"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <TaxForm
            isEdit={pop.isEdit}
            close={handleEditClose}
            editData={editData}
            handleRequest={handlePutRequest}
            value="Update"
          />
        </Dialog>
      )}
      {pop.isCreate && (
        <Dialog
          closeModal={handleCreateClose}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title="Tax"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <TaxForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              country_id: "",
              type: "",
              value: "",
              name: "",
              per_person: "",
              per_night: "",
              per_bedroom: "",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            create={pop.isCreate}
            createClick={pop.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
}

export default Tax;
