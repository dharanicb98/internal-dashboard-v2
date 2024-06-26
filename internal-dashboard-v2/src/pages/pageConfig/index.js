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

import PageHeader from "../../components/pageHeader";
import Table from "../../components/hkTable";
import Dialog from "../../ui/dialog";
import PageConfigFrom from "../../components/forms/pageConfig/pageConfigFrom";
import {
  createPage,
  deletePage,
  updatePage,
  getAllPages,
} from "../../services/pageConfig";
import { useNavigate } from "react-router-dom";

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
    fieldName: "slug",
    headName: "Slug Name",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "page_type",
    headName: "Page Type",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "country_ref_id",
    headName: "Country Reference Id",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "region_ref_id",
    headName: "Region Reference Id",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "destination_ref_id",
    headName: "Destination Reference Id",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "default_currency",
    headName: "Currency",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
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

function PageConfig() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [activeItem, setActiveItem] = useState({});

  const navigate = useNavigate();

  const handleOpen = (item) => {
    setActiveItem({ ...item, id: item?.id?.props?.children });
    setPop({ ...pop, isDelete: true });
  };
  const handleClose = () => {
    setPop({ ...pop, isDelete: false });
  };

  const handleEditOpen = (item) => {
    // console.log("item props id", item?.id?.props?.children);
    setActiveItem({ ...item, id: item?.id?.props?.children });
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
    // console.log("put request", formData);

    dispatch(loaderStart());
    updatePage(activeItem.id, formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        // console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log("formData---------", formData);
    dispatch(loaderStart());
    createPage(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        dispatch(error(e));
        // console.log(e);
      });
    console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    deletePage(activeItem.id)
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
    getAllPages()
      .then((response) => {
        console.log(response);
        dispatch(loaderSuccess());
        let res = response.data;
        let result = transformRows(res);
        setRows(result);
      })
      .catch((err) => {
        dispatch(error(err?.response?.data?.error?.message));
        // console.log(err);
      });
  }

  function transformRows(response) {
    response.forEach((res) => {
      res.edit = getEditComponent(res);
      res.id = getIdComponent(res);
      res.delete = getDeleteComponent(res);
      res.created_at = formatDate(res.created_at);
      res.updated_at = formatDate(res.updated_at);
      res.is_active = getActiveComponent(res.is_active);
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
    });
    return response;
  }

  function handleNavigate(res) {
    // console.log(res?.id?.props?.children);
    navigate(`/page-config/${res?.id?.props?.children}`);
  }

  function getIdComponent(res) {
    return (
      <div
        onClick={() => handleNavigate(res)}
        className="text-blue-500 cursor-pointer"
      >
        {res.id}
      </div>
    );
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

  // console.log("rowsssssssss", rows);
  return (
    <div className="m-3">
      <PageHeader title="Page Config" onClick={handleCreateOpen} />
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
          deletedObj={{ slug: activeItem?.slug }}
          setIsOpen={setPop}
          title="Page Config"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Page Config"
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <PageConfigFrom
            isEdit={pop.isEdit}
            close={handleEditClose}
            editData={{
              id: activeItem.id,
              page_type: activeItem.page_type,
              slug: activeItem.slug,
              default_currency: activeItem.default_currency,
              country_ref_id: activeItem.country_ref_id || "",
              destination_ref_id: activeItem.destination_ref_id || "",
              region_ref_id: activeItem.region_ref_id || "",
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
          title="Page Config"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <PageConfigFrom
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              page_type: "",
              slug: "",
              default_currency: "USD",
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

export default PageConfig;
