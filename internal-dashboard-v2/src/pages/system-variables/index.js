import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../store/reducers/loaderSlice";
import { DeleteIcon, EditIcon } from "../../icons";
import { formatDate } from "../../utils/common";
import DeletePopup from "../../components/popup/deletePopup";
import {
  deleteSystemVariables,
  getAllSystemVariables,
  postSystemVariables,
  putSystemVariables,
} from "../../services/system-variable-services";
import Table from "../../components/hkTable";
import PageHeader from "../../components/pageHeader";
import Dialog from "../../ui/dialog";
import SystemVariablesForm from "../../components/forms/systemVariablesForm";

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
    fieldName: "user_id",
    headName: "User Id",
    filter: false,
    sort: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "group_id",
    headName: "Group Id",
    filter: false,
    sort: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "sys_key",
    headName: "Key Name",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "sys_value",
    headName: "Value",
    filter: false,
    className: "w-[280px]",
    filterFormat: "array",
    inputType: "date",
    hideColumn: false,
  },
  {
    fieldName: "encrypted",
    headName: "Encrypted",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "description",
    headName: "Description",
    filter: false,
    className: "w-[300px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },

  {
    fieldName: "created_at",
    headName: "Created At",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "updated_at",
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
function SystemVariables() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [putID, setPutID] = useState(null);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [deletedObj, setDeletedObj] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleOpen = (item) => {
    const { id, user_id } = item;
    setDeletedObj({ ID: id, UserID: user_id });
    setPop({ ...pop, isDelete: true });
  };

  const handleEditOpen = (item) => {
    const {
      id,
      group_id,
      sys_key,
      sys_value,
      user_id,
      description,
      encrypted,
    } = item;
    setPutID(id);
    setEditData({
      group_id,
      sys_key,
      sys_value,
      user_id,
      description,
      encrypted,
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
    // console.log("put request");
    dispatch(loaderStart());
    putSystemVariables(formData, putID)
      .then(() => {
        setPageLoad((prev) => !prev);
        dispatch(loaderSuccess());
        // console.log("success");
      })
      .catch((e) => {
        // console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log(formData)
    dispatch(loaderStart());
    formData = { ...formData, encrypted: parseInt(formData.encrypted) };
    postSystemVariables(formData)
      .then(() => {
        setPageLoad((prev) => !prev);
        dispatch(loaderSuccess());
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e.response.data.error.message));
      });
    // console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteSystemVariables(deletedObj.ID)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        console.log(e);
        dispatch(error(e.response.data.error.message));
      });
    // console.log("deleted");
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllSystemVariables()
      .then((response) => {
        // console.log(response);
        dispatch(loaderSuccess());
        let res = response.data;
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
      res.created_at = formatDate(res.created_at);
      res.updated_at = formatDate(res.updated_at);
      res.is_active = getActiveComponent(res.is_active);
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
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

  return (
    <div className="m-3">
      <PageHeader title="System Variables" onClick={handleCreateOpen} />
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
          deletedObj={deletedObj}
          setIsOpen={setPop}
          title="System Variables"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="System Variables"
          childrenClass={
            "w-[50%] h-[75%]  p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <SystemVariablesForm
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
          title="System Variables"
          childrenClass={
            "w-[50%] h-[75%] p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <SystemVariablesForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              group_id: "",
              user_id: "",
              description: "",
              sys_key: "",
              sys_value: "",
              encrypted: "",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            createClick={pop.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
}

export default SystemVariables;
