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
  deleteAddons,
  getAllAddons,
  postAddons,
  putAddons,
} from "../../../services/addonServices";
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";
import AddonsForm from "./addonsForm";

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
    className: "w-[150px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "amount",
    headName: "Amount",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "amount_type",
    headName: "Amount Type",
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

function Addons() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [deletedObj, setDeletedObj] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleOpen = (item) => {
    const { id, name, slug } = item;
    setDeletedObj({ ID: id, Name: name, Slug: slug });
    setPop({ ...pop, isDelete: true });
  };

  const handleEditOpen = (item) => {
    const { id, name, slug, amount_type, amount, sequence_no } = item;
    // console.log(term_id);
    setEditData({ id, name, slug, amount_type, amount, sequence_no });
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
    putAddons(formData, formData.id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        console.log(e);
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log(formData)
    dispatch(loaderStart());
    postAddons(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
    // console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteAddons(deletedObj.ID)
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
    getAllAddons()
      .then((response) => {
        // console.log(response);
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
      res.createdAt = formatDate(res.createdAt);
      res.updatedAt = formatDate(res.updatedAt);
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
      <PageHeader title="Addons" onClick={handleCreateOpen} />
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
          // isOpen={pop.isOpen}
          deletedObj={deletedObj}
          setIsOpen={setPop}
          // close={handleClose}
          title="Addons"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Addons"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AddonsForm
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
          title="Addons"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AddonsForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              name: "",
              slug: "",
              amount: "",
              sequence_no: "",
              amount_type: "",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            create={true}
            createClick={pop.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
}

export default Addons;
