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
import {deletePropertyType, editPropertyType, getPropertyType, postPropertyType} from "../../../services/propertyTypeServices"
import PropertyForm from "../../../components/forms/listingAttributes/propertyForm";

const TABLE_COLUMNS = [
  {
    id: 1,
    field: "id",
    headerName: "ID",
    width: "120px",
    minWidth: "100px",
    maxWidth: "120px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 2,
    field: "name",
    headerName: "Name",
    width: "180px",
    minWidth: "280px",
    maxWidth: "200px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 3,
    field: "slug",
    headerName: "Slug",
    width: "180px",
    minWidth: "100px",
    maxWidth: "240px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 4,
    field: "description",
    headerName: "Description",
    width: "300px",
    minWidth: "100px",
    maxWidth: "240px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 5,
    field: "user_id",
    headerName: "User Id",
    width: "180px",
    minWidth: "100px",
    maxWidth: "240px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 6,
    field: "sequence_no",
    headerName: "Sequence No",
    width: "200px",
    minWidth: "180px",
    maxWidth: "200px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 7,
    field: "icon_path",
    headerName: "Icon Path",
    width: "700px",
    minWidth: "180px",
    maxWidth: "700px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 8,
    field: "is_deleted",
    headerName: "Deleted",
    width: "200px",
    minWidth: "180px",
    maxWidth: "200px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 9,
    field: "is_active",
    headerName: "Active",
    width: "200px",
    minWidth: "180px",
    maxWidth: "200px",
    type: "text",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 10,
    field: "createdAt",
    headerName: "Created At",
    width: "200px",
    minWidth: "180px",
    maxWidth: "200px",
    type: "date",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 11,
    field: "updatedAt",
    headerName: "Updated At",
    width: "180px",
    minWidth: "160px",
    maxWidth: "180px",
    type: "date",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 12,
    field: "edit",
    headerName: "Edit",
    width: "120px",
    minWidth: "100px",
    maxWidth: "120px",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
  {
    id: 13,
    field: "delete",
    headerName: "Delete",
    width: "120px",
    minWidth: "100px",
    maxWidth: "120px",
    hideable: true,
    editable: true,
    filterable: false,
    sortable: false,
    colshow: true,
    sort: "",
    filter: [],
  },
];
function PropertyType() {
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
    setEditData({ id, name:name?.props?.children[1]?.props?.children, slug, description, user_id, icon_path });
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
    editPropertyType(formData, formData.id)
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
    postPropertyType(formData)
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
    deletePropertyType(deletedObj.id)
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
    getPropertyType()
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
      <PageHeader title="Property-Type" onClick={handleCreateOpen} />
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
          title="Property-Type"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Property-Type"
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <PropertyForm
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
          title="Property-Type"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <PropertyForm
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

export default PropertyType;
