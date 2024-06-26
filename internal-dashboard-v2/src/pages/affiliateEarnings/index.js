import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../store/reducers/loaderSlice";
import {
  editAffiliateEarnings,
  postAffiliateEarnings,
  deleteAffiliateEarnings,
  getAffiliateEarnings,
} from "../../services/affiliateEarningsServices";
import { DeleteIcon, EditIcon } from "../../icons";
import { formatDate } from "../../utils/common";
import DeletePopup from "../../components/popup/deletePopup";
import PageHeader from "../../components/pageHeader";
import Table from "../../components/hkTable";
import Dialog from "../../ui/dialog";
import AffiliateForm from "../../components/forms/affiliateEarningsForm";
import { AffiliateEarningsBookingStatus } from "../../constants";


const TABLE_COLUMNS = [
  {
    fieldName: "id",
    headName: "ID",
    sort: false,
    filter: false,
    className: "w-[100px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "customer_id",
    headName: "Customer Id",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "customer_email",
    headName: "Customer Email",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "ref_code",
    headName: "Ref Code",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "ref_owner_id",
    headName: "Ref Owner Id",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "ref_amount",
    headName: "Ref Amount",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "ref_currency",
    headName: "Ref Currency",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "checkout_id",
    headName: "Checkout Id",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "reservation_id",
    headName: "Reservation Id",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "booking_amount",
    headName: "Booking Amount",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "booking_currency",
    headName: "Booking Currency",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "booking_status",
    headName: "Booking Status",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "created_at",
    headName: "Created At",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "updated_at",
    headName: "Updated At",
    filter: false,
    sort: false,
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

function AffiliateEarnings() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [putID, setPutID] = useState(null);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [deletedObj, setDeletedObj] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleOpen = (item) => {
    const { id, customer_email } = item;
    setDeletedObj({ ID: id, Customer_Email: customer_email });
    setPop({ ...pop, isDelete: true });
  };
  const handleClose = () => {
    setPop({ ...pop, isDelete: false });
  };

  const handleEditOpen = (item) => {
    const {  id,
      customer_id,
      customer_email,
      ref_code,
      ref_owner_id,
      ref_amount,
      ref_currency,
      checkout_id,
      reservation_id,
      booking_amount,
      booking_currency,
      booking_status, } = item;
    setPutID(id);
    setEditData({
      customer_id,
      customer_email,
      ref_code,
      ref_owner_id,
      ref_amount,
      ref_currency,
      checkout_id,
      reservation_id,
      booking_amount,
      booking_currency,
      booking_status,
    });
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
    console.log("put request");
    dispatch(loaderStart());
    editAffiliateEarnings(putID,formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log(formData)
    dispatch(loaderStart());
    postAffiliateEarnings(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        dispatch(error(e.response.data.error.message));
      });
    console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteAffiliateEarnings(deletedObj.ID)
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
    getAffiliateEarnings()
      .then((response) => {
        console.log(response);
        dispatch(loaderSuccess());
        let res = response.data;
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
      res.booking_status = getBookingFormat(res.booking_status);
      res.created_at = formatDate(res.created_at);
      res.updated_at = formatDate(res.updated_at);
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

  const getBookingFormat = (bookingStatusValue) => {
    let { key } = AffiliateEarningsBookingStatus.find(
      (each) => each.value === bookingStatusValue
    );
    return key;
  };


  return (
    <div className="m-3">
      <PageHeader title="Affiliate Earnings" onClick={handleCreateOpen} />
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
          title="Affiliate Earnings"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Affiliate Earnings"
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AffiliateForm
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
          title="Affiliate Earnings"
          childrenClass={"w-[50%] h-[75%] overflow-auto  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AffiliateForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              customer_id: "",
              customer_email: "",
              ref_code: "",
              ref_owner_id: "",
              ref_amount: "",
              ref_currency: "",
              checkout_id: "",
              reservation_id: "",
              booking_amount: "",
              booking_currency: "",
              booking_status: "",
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

export default AffiliateEarnings;
