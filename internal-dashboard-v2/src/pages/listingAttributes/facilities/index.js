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
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";
import { deleteFacilities, editFacilities, getFacilities, postFacilities } from "../../../services/facilitiesServices";
import FacilitiesForm from "./facilitesForm";

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
    fieldName: "description",
    headName: "Description",
    filter: false,
    className: "w-[303px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "user_id",
    headName: "User Id",
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
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "is_deleted",
    headName: "Deleted",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
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
function Facilities() {
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
    // console.log(item);
    const { id, name, slug } = item;
    setDeletedObj({ id, name: name?.props?.children[1]?.props?.children, slug: slug });
    setPop({ ...pop, isDelete: true });
  };

  const handleEditOpen = (item) => {
    const { id, name, slug, description, user_id, icon_path } = item;
    // console.log(sequence_no);
    setEditData({ id, name :name?.props?.children[1]?.props?.children, slug, description, user_id, icon_path });
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
    editFacilities(formData, formData.id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log(formData);
    dispatch(loaderStart());
    postFacilities(formData)
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
    // console.log(deletedObj._id);
    dispatch(loaderStart());
    deleteFacilities(deletedObj.id)
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
    getFacilities()
      .then((response) => {
        // console.log(response.data.data);
        dispatch(loaderSuccess());
        let res = response.data.data;
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
      res.name = getNameIconComponent(res);
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
      <PageHeader title="Facilities" onClick={handleCreateOpen} />
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
          title="Facilities"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Facilities"
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <FacilitiesForm
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
          title="Facilities"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <FacilitiesForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{  name : "", slug: "", description: "", user_id : "", icon_path : "" }}
            handleRequest={handlePostRequest}
            value="Create"
            createClick={pop.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
}

export default Facilities;
