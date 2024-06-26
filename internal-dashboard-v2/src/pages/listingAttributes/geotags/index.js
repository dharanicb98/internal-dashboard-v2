import React, { useEffect, useState } from "react";
import {
  getAllGeotags,
  deleteGeotag,
  postGeotag,
  putGeotag,
} from "../../../services/geotagServices";
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
import GeoTagsForm from "./geoTagsForm";

const TABLE_COLUMNS = [
  {
    fieldName: "user_id",
    headName: "User Id",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "parent_type",
    headName: "Parent Type",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "title",
    headName: "Title",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "date",
    hideColumn: false,
  },
  {
    fieldName: "description",
    headName: "Description",
    filter: false,
    className: "w-[310px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "sequence_no",
    headName: "Sequence No",
    filter: false,
    className: "w-[300px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "icon",
    headName: "Icon",
    filter: false,
    className: "w-[310px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "link",
    headName: "Link",
    filter: false,
    className: "w-[310px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "image_path",
    headName: "Image Path",
    filter: false,
    className: "w-[310px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
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

const Geotags = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [pageLoad, setPageLoad] = useState(false);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [activeData, setActiveData] = useState(null);

  useEffect(() => {
    getData();
  }, [pageLoad]);

  async function getData() {
    dispatch(loaderStart());
    try {
      const response = await getAllGeotags();
      dispatch(loaderSuccess());
      // console.log(response);
      const result = response.data.data;
      // console.log(result)
      let resultedRows = transformRows(result);
      setRows(resultedRows);
    } catch (err) {
      console.log(err);
      dispatch(error(err?.response?.data?.error?.message));
    }
  }

  const handleEditOpen = (item) => {
    setActiveData(item);
    setPop({ ...pop, isEdit: true });
  };

  const handleDeleteOpen = (item) => {
    setActiveData(item);
    setPop({ ...pop, isDelete: true });
  };

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
        <DeleteIcon onClick={() => handleDeleteOpen(item)} />
      </div>
    );
  }

  function getActiveComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  function getIsDeleteComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  const getNameIconComponent = (title , icon) => (
    <div className="flex">
      <img src={`${process.env.REACT_APP_CDN_URL}${icon}`} alt={`${title}`} className="w-[20px] h-[20px] mr-1 self-center"/>
      <p className="self-center">{title}</p>
    </div>
  )

  function transformRows(response) {
    response.forEach((res) => {
      res.edit = getEditComponent(res);
      res.delete = getDeleteComponent(res);
      res.createdAt = formatDate(res.createdAt);
      res.title = getNameIconComponent(res?.title , res?.icon);
      res.parent_type = getNameIconComponent(res?.parent_type , res?.image_path);
      res.updatedAt = formatDate(res.updatedAt);
      res.is_active = getActiveComponent(res.is_active);
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
    });
    return response;
  }

  const handleCreateOpen = () => {
    setPop({ ...pop, isCreate: true });
  };

  const handleClose = () => {
    setPop({ ...pop, isDelete: false });
  };

  const handleEditClose = () => {
    setPop({ ...pop, isEdit: false });
  };

  const handleCreateClose = () => {
    setPop({ ...pop, isCreate: false });
  };

  const handlePutRequest = (formData) => {
    dispatch(loaderStart());
    putGeotag(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteGeotag(activeData._id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.messagee));
      });
    // console.log("deleted");
  };

  const handlePostRequest = (formData) => {
    // console.log(formData);
    dispatch(loaderStart());
    postGeotag(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
    // console.log("post req");
  };

  return (
    <div className="m-3">
      <PageHeader title="Geo Tags" onClick={handleCreateOpen} />
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
          filter={false}
          pagiNationFilter={false}
        />
      )}
      {pop.isDelete && (
        <DeletePopup
          setIsOpen={setPop}
          deletedObj={{
            id: activeData._id,
            type: activeData.parent_type?.props?.children[1]?.props?.children,
            title: activeData.title?.props?.children[1]?.props?.children,
          }}
          close={handleClose}
          title="Geotags"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Geotag"
          childrenClass={
            "w-[50%] h-[75%]  p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <GeoTagsForm
            isEdit={pop.isEdit}
            close={handleEditClose}
            editData={{
              parent_type: activeData.parent_type?.props?.children[1]?.props?.children,
              title: activeData.title?.props?.children[1]?.props?.children,
              description: activeData.description,
              icon: activeData.icon,
              link: activeData.link,
              image_path: activeData.image_path,
              sequence_no: activeData.sequence_no,
            }}
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
          title="Geotag"
          childrenClass={
            "w-[50%] h-[75%] p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <GeoTagsForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              parent_type: "",
              title: "",
              description: "",
              icon: "",
              link: "",
              image_path: "",
              sequence_no: "",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            createClick={pop.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Geotags;
