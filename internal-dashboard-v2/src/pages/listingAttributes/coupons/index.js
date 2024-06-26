/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DeletePopup from "../../../components/popup/deletePopup";
import { formatDate } from "../../../utils/common";
import { DeleteIcon, EditIcon } from "../../../icons";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import CouponsCreateAndEditPopUp from "./couponsCreateAndEditPopUp";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "../../../services/couponServices";
import PageHeader from "../../../components/pageHeader";
import Table from "../../../components/hkTable";
import Dialog from "../../../ui/dialog";

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
    fieldName: "discount_type",
    headName: "Discount Type",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "discount_amount",
    headName: "Discount Amount",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "expiry_date",
    headName: "Expiry Date",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "select",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "max_usage",
    headName: "Max Usage",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "usage_count",
    headName: "Usage Count",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "min_amount",
    headName: "Min Amount",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "min_amount",
    headName: "Min Amount",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
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
function Coupons() {
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
    getAllCoupons()
      .then((response) => {
        dispatch(loaderSuccess());
        let res = response.data.data;
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
      res.createdAt = formatDate(res.createdAt);
      res.updatedAt = formatDate(res.updatedAt);
      res.is_active = res.is_active ? "true" : "false";
      res.is_deleted = res.is_deleted ? "true" : "false";
    });
    // console.log("response", response);
    return response;
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
    updateCoupon(formData)
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
    deleteCoupon(activeItem.id)
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
    createCoupon(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  // console.log("activeItem", activeItem);
  // console.log("rows", rows);
  return (
    <>
      <div className="m-3">
        <PageHeader title="Coupons" onClick={handleCreateButton} />
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
          title="Coupon"
          childrenClass={
            "w-[50%] h-[75%]  p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <CouponsCreateAndEditPopUp
            isEdit={popup.isEdit}
            close={handleEditCloseButton}
            editData={{
              id: activeItem.id,
              country_supported: activeItem.country_supported,
              name: activeItem.name,
              slug: activeItem.slug,
              discount_type: activeItem.discount_type,
              discount_amount: activeItem.discount_amount,
              expiry_date: activeItem.expiry_date,
              max_usage: activeItem.max_usage,
              min_amount: activeItem.min_amount,
              max_amount: activeItem.max_amount,
            }}
            handleRequest={handlePutRequest}
            value="Update"
          />
        </Dialog>
      )}

      {popup.isDelete && (
        <DeletePopup
          deletedObj={{ name: activeItem?.name, slug: activeItem?.slug }}
          title="Coupons"
          onDeleteList={handleDeleteRequest}
          setIsOpen={setPopUp}
        />
      )}

      {popup.isCreate && (
        <Dialog
          closeModal={handleCreateCloseButton}
          isOpen={popup.isCreate}
          createClick={popup.isCreate}
          title="Coupon"
          childrenClass={
            "w-[50%] h-[75%] p-6 rounded-md no-scrollbar dark-scrollbar"
          }
        >
          <CouponsCreateAndEditPopUp
            isEdit={popup.isCreate}
            close={handleCreateCloseButton}
            editData={{
              country_supported: [],
              name: "",
              slug: "",
              discount_type: "",
              discount_amount: "",
              expiry_date: "",
              max_usage: "",
              min_amount: "",
              max_amount: "",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            createClick={popup.isCreate}
          />
        </Dialog>
      )}
    </>
  );
}

export default Coupons;
