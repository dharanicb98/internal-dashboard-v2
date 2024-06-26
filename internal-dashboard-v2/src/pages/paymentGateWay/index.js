/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentGateWayEditPopUp from "./paymentGatewayEditPopUp";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  updatePayment,
} from "../../services/paymentGatewayServices";
import DeletePopup from "../../components/popup/deletePopup";
import { formatDate } from "../../utils/common";
import { DeleteIcon, EditIcon } from "../../icons";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../store/reducers/loaderSlice";
import Table from "../../components/hkTable";
import PageHeader from "../../components/pageHeader";
import Dialog from "../../ui/dialog";

const TABLE_COLUMNS = [
  {
    fieldName: "country_id",
    headName: "Country ID",
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
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "vendor_name",
    headName: "Vendor Name",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "pg_type",
    headName: "Pg Type",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "key_1",
    headName: "Key 1",
    filter: false,
    className: "w-[310px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "key_2",
    headName: "Key 2",
    filter: false,
    className: "w-[310px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "key_3",
    headName: "Key 3",
    filter: false,
    className: "w-[310px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "key_4",
    headName: "Key 4",
    filter: false,
    className: "w-[310px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "callback_url",
    headName: "callback_url",
    filter: false,
    className: "w-[300px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "active",
    headName: "Active",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
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
function PaymentGateWay() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [popup, setPopUp] = useState({
    isEdit: false,
    isDelete: false,
    isCreate: false,
  });

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllPayments()
      .then((response) => {
        dispatch(loaderSuccess());
        let res = response.data;
        // console.log(res, "--------------------");
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
      res.active = res.active ? "true" : "false";
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
    });
    // console.log("response", response);
    return response;
  }

  // function getActiveComponent(check) {
  //   return <>{check ? "true" : "false"}</>;
  // }

  function getIsDeleteComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  function getEditComponent(item) {
    // console.log("----------------", item);
    return (
      <div>
        <EditIcon onClick={() => handleEditButton(item)} />
      </div>
    );
  }

  function handleEditButton(item) {
    // console.log("Radhe Radhe", item);

    setActiveItem(item);
    setPopUp((prev) => ({ ...prev, isEdit: true }));
  }

  const handleEditCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isEdit: false }));

  function getDeleteComponent(item) {
    return (
      <div>
        <DeleteIcon onClick={() => handleDeleteButton(item)} />
      </div>
    );
  }

  const handleDeleteButton = (item) => {
    // console.log("Response", item);

    setActiveItem(item);
    setPopUp((prev) => ({ ...prev, isDelete: true }));
  };

  const handleCreateButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: true }));

  const handleCreateCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: false }));

  const handlePutRequest = (formData) => {
    // console.log("put request", formData);
    dispatch(loaderStart());
    updatePayment(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });

    // console.log("Radhe Radhe");
  };

  const handleDeleteRequest = () => {
    dispatch(loaderStart());
    deletePayment(activeItem.id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("Delete Success");
      })
      .catch((e) => dispatch(error(e?.response?.data?.error?.message)));
  };

  const handlePostRequest = (formData) => {
    // console.log("---------++++++++++++++", formData);
    dispatch(loaderStart());
    createPayment(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e));
      });
  };

  // console.log("activeItem", activeItem);
  // console.log("rows", rows);
  return (
    <>
      <div className="m-3">
        <PageHeader title="Payment Gateway" onClick={handleCreateButton} />
        {rows && (
          <Table
            rows={rows}
            columns={TABLE_COLUMNS}
            filter={false}
            pagiNationFilter={false}
          />
        )}
      </div>

      {popup.isEdit && (
        <Dialog
          closeModal={handleEditCloseButton}
          isOpen={popup.isEdit}
          title="Payment Gateway"
          childrenClass={
            "w-[50%] h-[75%]  p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <PaymentGateWayEditPopUp
            isEdit={popup.isEdit}
            close={handleEditCloseButton}
            editData={{
              id: activeItem.id,
              country_id: activeItem.country_id,
              name: activeItem.name,
              slug: activeItem.slug,
              sequence_no: activeItem.sequence_no,
              vendor_name: activeItem.vendor_name,
              pg_type: activeItem.pg_type,
              key_1: activeItem.key_1,
              key_2: activeItem.key_2,
              key_3: activeItem.key_3,
              key_4: activeItem.key_4,
              callback_url: activeItem.callback_url,
              active: activeItem.active === "true" ? 1 : 0,
            }}
            handleRequest={handlePutRequest}
            value="Update"
          />
        </Dialog>
      )}

      {popup.isDelete && (
        <DeletePopup
          deletedObj={{ name: activeItem?.name, slug: activeItem?.slug }}
          title="Payment Gateway"
          onDeleteList={handleDeleteRequest}
          setIsOpen={setPopUp}
        />
      )}

      {popup.isCreate && (
        <Dialog
          closeModal={handleCreateCloseButton}
          isOpen={popup.isCreate}
          createClick={popup.isCreate}
          title="Payment Gateway"
          childrenClass={
            "w-[50%] h-[75%] p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <PaymentGateWayEditPopUp
            isEdit={popup.isCreate}
            close={handleCreateCloseButton}
            editData={{
              country_id: "",
              name: "",
              slug: "",
              sequence_no: "",
              vendor_name: "",
              pg_type: "",
              key_1: "",
              key_2: "",
              key_3: "",
              key_4: "",
              callback_url: "",
              active: "",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            createClick={popup.isCreate}
          />{" "}
        </Dialog>
      )}
    </>
  );
}

export default PaymentGateWay;
