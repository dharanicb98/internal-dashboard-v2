import React, { useEffect, useState } from "react";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../../src/store/reducers/loaderSlice";
import { useDispatch } from "react-redux";
import { DeleteIcon, EditIcon } from "../../icons";
import DeletePopup from "../../components/popup/deletePopup";
import { formatDate, formatInput } from "../../utils/common";
import Table from "../../components/hkTable";
import PageHeader from "../../components/pageHeader";
import {
  createReservations,
  deleteReservations,
  getAllReservations,
  updateReservations,
} from "../../services/reservations";
import Dialog from "../../ui/dialog";
import ReservationsForm from "./reservationsForm";
import axios from "axios";

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
    fieldName: "listing_id",
    headName: "listing Id",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "checkin",
    headName: "Checkin",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "checkout",
    headName: "Checkout",
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
    fieldName: "payment_status",
    headName: "Payment Status",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "booked_by",
    headName: "Booked By",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
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
    fieldName: "host_id",
    headName: "Host Id",
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
    fieldName: "payment_type",
    headName: "Payment Type",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },

  {
    fieldName: "is_deleted",
    headName: "Deleted",
    filter: false,
    sort: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "created_by",
    headName: "Created By",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "updated_by",
    headName: "Updated By",
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
const Reservations = () => {
  const [updateData, setUpdateData] = useState({});
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
    const { id } = item;
    setDeleteDetails({ id });
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllReservations()
      .then((res) => {
        dispatch(loaderSuccess());
        let response = res.data;
        response = transformRows(response);
        // console.log(response);
        setRows(response);
      })
      .catch((e) => {
        dispatch(error("errr"));
      });
  }

  function transformRows(response) {
    response.forEach((res) => {
      // res.id = getIdComponent(res);
      res.edit = getEditComponent(res);
      res.delete = getDeleteComponent(res);
      res.is_deleted = getActiveComponent(res.is_deleted);
      res.created_at = formatDate(res.created_at);
      res.updated_at = formatDate(res.updated_at);
      res.checkin = formatDate(res.checkin);
      res.checkout = formatDate(res.checkout);
    });
    //   console.log(response);
    return response;
  }

  // const getIdComponent = (response) => {
  //   const { id } = response;
  // };

  function getActiveComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }
  // const showCommonPopup = ()=>setIsOpen(true)

  const hideCommonPopup = () => {
    // console.log("hideCommonPopup");
    setUpdateData(null);
    setPop({ ...pop, isEdit: false });
  };

  const hideCreatePopup = () => {
    setUpdateData("");
    setPop({ ...pop, isCreate: false });
  };

  function getEditComponent(item) {
    const {cancellation_reminder_dt , final_payment_reminder_dt} = item
    return (
      <div
        onClick={() => {
          setPop({ ...pop, isEdit: true });
          setUpdateData({...item , cancellation_reminder_dt : formatInput(cancellation_reminder_dt), final_payment_reminder_dt : formatInput(final_payment_reminder_dt)});
        }}
      >
        <EditIcon />
      </div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div onClick={() => handleOpen(item)}>
        <DeleteIcon />
      </div>
    );
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    // console.log(deletedObj.id);
    deleteReservations(deletedObj.id)
      .then((res) => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((err) => dispatch(error(err?.response?.data?.error?.message)));
  };

  const createCategory = () => {
    // console.log("create Category");
    setPop({ ...pop, isCreate: true });
  };

  const editApiHandler = async (formData) => {
    // console.log("editApi", formData);
    const {
      id,
      payment_status,
      booking_status,
      cancellation_reminder_dt,
      final_payment_reminder_dt,
    } = formData;
    // console.log(id,payment_status,booking_status,final_payment_reminder_dt,cancellation_reminder_dt)
    dispatch(loaderStart());
    try {
      const response = await updateReservations(
        {
          payment_status,
          booking_status,
          final_payment_reminder_dt,
          cancellation_reminder_dt,
        },
        id
      );
      // console.log(response);
      dispatch(loaderSuccess());
      setPageLoad((prev) => !prev);
    } catch (e) {
      // console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      dispatch(error(e?.response?.data?.error?.message));
    }
  };

  const createApiHandler = async (formData) => {
    console.log("createApi", formData);
    // console.log(formData);
    dispatch(loaderStart());
    try {
      // const response = await axios.post(
      //   `https://rentmyhotel.com/api/v2/reservations`,
      //   formData
      // );
      createReservations(formData);
      dispatch(loaderSuccess());

      setPageLoad((prev) => !prev);
    } catch (e) {
      dispatch(error(e?.response?.data?.error?.message));
    }
  };

  return (
    <>
      <PageHeader title="Reservations" onClick={createCategory} />
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
          title={"Reservation"}
          setIsOpen={setPop}
          deletedObj={deletedObj}
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && updateData && (
        <Dialog
          closeModal={hideCommonPopup}
          isOpen={pop.isEdit}
          title={"Reservation"}
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ReservationsForm
            close={hideCommonPopup}
            updateData={updateData}
            handleRequest={editApiHandler}
            value="Update"
          />
        </Dialog>
      )}
      {pop.isCreate && (
        <Dialog
          closeModal={hideCreatePopup}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title={"Reservation"}
          childrenClass={"w-[25%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <ReservationsForm
            close={hideCreatePopup}
            value="Create"
            handleRequest={createApiHandler}
            updateData={{}}
            createClick={pop.isCreate}
            isEdit={pop.isCreate}
          />
        </Dialog>
      )}
    </>
  );
};

export default Reservations;
