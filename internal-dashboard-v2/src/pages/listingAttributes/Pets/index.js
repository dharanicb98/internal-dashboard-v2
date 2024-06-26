import React, { useEffect, useState } from "react";
import {
  getAllPets,
  deletePet,
  postPet,
  putPet,
} from "../../../services/petsServices";
import { useDispatch } from "react-redux";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../../store/reducers/loaderSlice";
import { DeleteIcon, EditIcon } from "../../../icons";
import { formatDate } from "../../../utils/common";
import DeletePopup from "../../../components/popup/deletePopup";
import Table from "../../../components/hkTable";
import PageHeader from "../../../components/pageHeader";
import Dialog from "../../../ui/dialog";
import PetsForm from "./petsForm";

const TABLE_COLUMNS = [
  {
    fieldName: "id",
    headName: "Pet ID",
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
    fieldName: "image_path",
    headName: "Image Path",
    filter: false,
    className: "w-[350px]",
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

const Pets = () => {
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
      const response = await getAllPets();
      dispatch(loaderSuccess());
      // console.log(response);
      const result = response.data.data;
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

  const getNameIconComponent = (res) => (
    <div className="flex">
      <img src={`${process.env.REACT_APP_CDN_URL}${res?.image_path}`} alt={`${res?.name}`} className="w-[20px] h-[20px] mr-1 self-center"/>
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
    // console.log("put request");
    // console.log(formData);
    // formData = {
    //   ...formData,
    //   name: formData.name || "Sample Pet",
    //   slug: formData.slug || "pet",
    // };
    // // console.log(formData);
    dispatch(loaderStart());
    putPet(formData)
      .then((res) => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log(res);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  const onDeleteList = () => {
    dispatch(loaderStart());
    deletePet(activeData.id)
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

  const handlePostRequest = (formData) => {
    // console.log(formData);
    dispatch(loaderStart());
    postPet(formData)
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
      <PageHeader title="Pets" onClick={handleCreateOpen} />
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
            id: activeData.id,
            "Pet Name": activeData?.name?.props?.children[1]?.props?.children,
          }}
          close={handleClose}
          title="Pets"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Pet"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <PetsForm
            isEdit={pop.isEdit}
            isEditClicked={true}
            close={handleEditClose}
            editData={{
              name: activeData.name?.props?.children[1]?.props?.children,
              id: activeData.id,
              slug: activeData.slug,
              sequence_no: activeData.sequence_no,
              image_path: activeData.image_path,
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
          title="Pet"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <PetsForm
            isEdit={pop.isCreate}
            isEditClicked={false}
            close={handleCreateClose}
            editData={{
              name: "",
              slug: "",
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

export default Pets;
