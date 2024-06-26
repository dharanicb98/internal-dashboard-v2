import React, { useEffect, useState } from "react";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../../store/reducers/loaderSlice";
import { useDispatch } from "react-redux";
import {
  deleteAmentiesGroup,
  getAmentiesGroup,
} from "../../../services/amenities-groupServices";
import { DeleteIcon, EditIcon } from "../../../icons";
import DeletePopup from "../../../components/popup/deletePopup";
import { formatDate } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";
import AmenitiesGroupForm from "./amenitiesGroupForm";

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
const AmenitiesGroups = () => {
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState();
  const dispatch = useDispatch();
  const [deletedObj, setDeleteDetails] = useState(null);
  const [rows, setRows] = useState([]);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [pageLoad, setPageLoad] = useState(false);

  const handleOpen = (item) => {
    setPop({ ...pop, isDelete: true });
    // console.log(item);
    const { id, name, slug } = item;
    setDeleteDetails({ id, name : name?.props?.children[1]?.props?.children, slug });
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());

    getAmentiesGroup()
      .then((res) => {
        // console.log(res);
        dispatch(loaderSuccess());
        let response = res.data.data;
        response = transformRows(response);
        // console.log(response);
        setRows(response);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
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
      res.id = getIdComponent(res);
      res.edit = getEditComponent(res);
      res.name = getNameIconComponent(res);
      res.delete = getDeleteComponent(res);
      res.is_active = getActiveComponent(res.is_active);
      res.is_deleted = res.is_deleted ? "true" : "false";
      res.createdAt = formatDate(res.createdAt);
      res.updatedAt = formatDate(res.updatedAt);
    });
    //   console.log(response);
    return response;
  }

  function getIdComponent(res) {
    // console.log(res);
    const { id, name } = res;
    return (
      <div
        className="text-blue-600 cursor-pointer"
        onClick={() => {
          navigate(`/listing-attributes/amenities-group/${id}`, {
            state: { name, id },
          });
        }}
      >
        {id}
      </div>
    );
  }

  function getActiveComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }
  // const showCommonPopup = ()=>setIsOpen(true)

  const hideCommonPopup = () => {
    // console.log("hideCommonPopup");
    setUpdateData("");
    setPop({ ...pop, isEdit: false });
  };

  const hideCreatePopup = () => {
    setUpdateData("");
    setPop({ ...pop, isCreate: false });
  };

  function getEditComponent(item) {
    return (
      <div
        onClick={() => {
          setPop({ ...pop, isEdit: true });
          setUpdateData({
            ...item,
            id: item?.id?.props?.children,
            name : item?.name?.props?.children[1]?.props?.children
          });
        }}
      >
        <EditIcon />
      </div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div
        onClick={() =>
          handleOpen({
            ...item,
            id: item?.id?.props?.children,
          })
        }
      >
        <DeleteIcon />
      </div>
    );
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    // console.log(deletedObj.id);
    deleteAmentiesGroup(deletedObj.id)
      .then((res) => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((err) => dispatch(error(err?.response?.data?.error?.message)));
  };

  const createAmentiesGroup = () => {
    setPop({ ...pop, isCreate: true });
  };

  // const apiCall = (data) => {
  //   console.log("apiCall", data);
  // };

  return (
    <>
      <div className="m-3">
        <PageHeader title="Amenities-Groups" onClick={createAmentiesGroup} />
        {rows && (
          <Table
            rows={rows}
            columns={TABLE_COLUMNS}
            filter={false}
            pagiNationFilter={false}
          />
        )}
      </div>
      {pop.isDelete && (
        <DeletePopup
          title={"Amenities Group"}
          setIsOpen={setPop}
          deletedObj={deletedObj}
          onDeleteList={onDeleteList}
        />
      )}
      {pop.isEdit && updateData && (
        <Dialog
          closeModal={hideCommonPopup}
          isOpen={pop.isEdit}
          title={"Amenities Group"}
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AmenitiesGroupForm
            hidePopup={hideCommonPopup}
            updateData={updateData}
            btn={pop}
            setPageLoad={setPageLoad}
            isEdit={pop.isEdit}
          />
        </Dialog>
      )}
      {pop.isCreate && (
        <Dialog
          closeModal={hideCreatePopup}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title={"Amenities Group"}
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AmenitiesGroupForm
            hidePopup={hideCreatePopup}
            updateData={{ name: "" }}
            btn={pop}
            setPageLoad={setPageLoad}
            createClick={pop.isCreate}
            isEdit={pop.isCreate}
          />
        </Dialog>
      )}
    </>
  );
};

export default AmenitiesGroups;