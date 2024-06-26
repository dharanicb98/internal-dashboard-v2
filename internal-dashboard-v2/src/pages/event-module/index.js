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
  deleteEventModules,
  getAllEventModules,
  postEventModules,
  putEventModules,
} from "../../services/eventModuleServices";
import PageHeader from "../../components/pageHeader";
import Table from "../../components/hkTable";
import EventModuleForm from "../../components/forms/eventModuleForm";
import Dialog from "../../ui/dialog";

const TABLE_COLUMNS = [
  {
    fieldName: "id",
    headName: "ID",
    sort: false,
    filter: false,
    className: "w-[100px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "module_name",
    headName: "Module Name",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "action",
    headName: "Action",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "delay",
    headName: "Delay",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "url",
    headName: "Url",
    filter: false,
    className: "w-[310px]",
    filterFormat: "array",
    inputType: "date",
    hideColumn: false,
  },
  {
    fieldName: "priority",
    headName: "Priority",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "created_by",
    headName: "Created By",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "select",
    hideColumn: false,
  },

  {
    fieldName: "created_at",
    headName: "Created At",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "updated_at",
    headName: "Updated At",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "edit",
    headName: "Edit",
    filter: false,
    className: "w-[100px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "delete",
    headName: "Delete",
    filter: false,
    className: "w-[100px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
];

function EventModules() {
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
    const { id, module_name } = item;
    setDeletedObj({ ID: id, ModuleName: module_name });
    setPop({ ...pop, isDelete: true });
  };
  const handleClose = () => {
    setPop({ ...pop, isDelete: false });
  };

  const handleEditOpen = (item) => {
    const { id, module_name, action, url, delay, priority, created_by } = item;
    setPutID(id);
    setEditData({
      module_name,
      action,
      url,
      delay,
      priority,
      user_id: created_by,
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
    console.log("put request");
    dispatch(loaderStart());
    putEventModules(formData, putID)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log(formData)
    dispatch(loaderStart());
    postEventModules(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        dispatch(error(e.response.data.error.message));
      });
    console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteEventModules(deletedObj.ID)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        console.log(e);
        dispatch(error(e.response.data.error.message));
      });
    console.log("deleted");
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllEventModules()
      .then((response) => {
        console.log(response);
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
      <PageHeader title="Event Modules" onClick={handleCreateOpen} />
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
          title="Event-Modules"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Event-Modules"
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <EventModuleForm
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
          title="Event-Modules"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <EventModuleForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              module_name: "",
              action: "",
              url: "",
              delay: "",
              priority: "",
              user_id: "",
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

export default EventModules;
