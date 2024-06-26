import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DeleteIcon, EditIcon } from "../../../icons";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import { formatDate } from "../../../utils/common";
import DeletePopup from "../../../components/popup/deletePopup";
import { deleteOffers, getOffers } from "../../../services/offersServices";
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";
import OffersForm from "./offersForm";

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
    fieldName: "title",
    headName: "Title",
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
    fieldName: "description",
    headName: "Description",
    filter: false,
    className: "w-[310px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "type",
    headName: "Type",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "max_offer_amount",
    headName: "Max Offer Amount",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "offer_price",
    headName: "Offer Price",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "is_deleted",
    headName: "Deleted",
    filter: false,
    className: "w-[150px]",
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

function Offers() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [isOpen, setIsOpen] = useState({
    isEdit: false,
    isDelete: false,
    isCreate: false,
  });
  const [deletedObj, setDeletedObj] = useState(null);
  const [editObj, setEditObj] = useState(null);

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    // console.log("getdata triggered");
    dispatch(loaderStart());
    getOffers()
      .then((response) => {
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
      res.is_active = res.is_active ? "true" : "false";
      res.is_deleted = res.is_deleted ? "true" : "false";
      res.createdAt = getFormatDate(res.createdAt);
      res.updatedAt = getFormatDate(res.updatedAt);
    });
    // console.log("response ==>", response);
    return response;
  }

  const getFormatDate = (date) => {
    return formatDate(date);
  };

  function getEditComponent(item) {
    return (
      <div onClick={() => handleEdit(item)}>
        <EditIcon />
      </div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div onClick={() => handleDelete(item)}>
        <DeleteIcon />
      </div>
    );
  }

  const handleEdit = (item) => {
    setIsOpen({ ...isOpen, isEdit: true });
    setEditObj(item);
  };

  const handleDelete = (data) => {
    const { id, title, slug } = data;
    setIsOpen({ ...isOpen, isDelete: true });
    setDeletedObj({ Id: id, Title: title, Slug: slug });
  };

  const handleCreate = () => {
    setIsOpen({ ...isOpen, isCreate: true });
  };

  const hidePopup = () => {
    setIsOpen({ isEdit: false, isDelete: false, isCreate: false });
  };

  const handleDeleteRequest = () => {
    dispatch(loaderStart());
    deleteOffers(deletedObj.Id)
      .then(() => {
        // console.log("deleted....");
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  // const handlePutRequest = (formData) =>{
  //   dispatch(loaderStart());
  //   editHouseRules(formData.id,formData)
  //     .then(() => {
  //       dispatch(loaderSuccess());
  //     })
  //     .catch((e) => {
  //       dispatch(error("Error ==> The Data is not Updated"));
  //     });
  // };

  // const handlePostRequest = (formData) =>{
  //   dispatch(loaderStart());
  //   postHouseRules(formData)
  //     .then(() => {
  //       dispatch(loaderSuccess());
  //     })
  //     .catch((e) => {
  //       dispatch(error("Error ==> The Data is not Added"));
  //     });
  // };

  return (
    <div className="m-3">
      <PageHeader title="Offers" onClick={handleCreate} />
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
          filter={false}
          pagiNationFilter={false}
        />
      )}
      {isOpen.isDelete && deletedObj !== null && (
        <DeletePopup
          title={"Offer"}
          setIsOpen={setIsOpen}
          deletedObj={deletedObj}
          onDeleteList={handleDeleteRequest}
        />
      )}
      {isOpen.isEdit && editObj !== null && (
        <Dialog
          closeModal={hidePopup}
          isOpen={isOpen.isEdit}
          title={"Offer"}
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <OffersForm
            hidePopup={hidePopup}
            updateData={editObj}
            btn={isOpen}
            setPageLoad={setPageLoad}
            isEdit={isOpen.isEdit}
          />
        </Dialog>
      )}
      {isOpen.isCreate && (
        <Dialog
          closeModal={hidePopup}
          isOpen={isOpen.isCreate}
          createClick={isOpen.isCreate}
          title={"Offer"}
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <OffersForm
            hidePopup={hidePopup}
            updateData={{
              title: "",
              slug: "",
              description: "",
              max_offer_amount: "",
              type: "",
              offer_price: "",
              sequence_no: "",
            }}
            btn={isOpen}
            readOnly={false}
            setPageLoad={setPageLoad}
            isEdit={isOpen.isCreate}
            createClick={isOpen.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
}

export default Offers;
