import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../store/reducers/loaderSlice";
import { DeleteIcon, EditIcon } from "../../icons";
import { formatDate } from "../../utils/common";
import {
  deleteCheckout,
  getAllCheckout,
  postCheckout,
  putCheckout,
} from "../../services/checkoutServices";
import { useNavigate } from "react-router-dom";
import Table from "../../components/hkTable";
import PageHeader from "../../components/pageHeader";
import Dialog from "../../ui/dialog";
import CheckoutCreateForm from "../../components/forms/checkout";
import Button from "../../components/button";

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
    fieldName: "eid",
    headName: "E-ID",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "listing_id",
    headName: "Listing ID",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "fname",
    headName: "First name",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "lname",
    headName: "Last name",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "number",
    hideColumn: false,
  },
  {
    fieldName: "email",
    headName: "Email",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "mobile",
    headName: "Mobile",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  
  {
    fieldName: "checkin_dt",
    headName: "checkin Date",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "checkout_dt",
    headName: "Checkout Date",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "adults",
    headName: "Adults",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "childrens",
    headName: "Childrens",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "pets",
    headName: "Pets",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "booking_id",
    headName: "Booking ID",
    filter: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "host_id",
    headName: "Host ID",
    filter: false,
    className: "w-[200px]",
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
    fieldName: "created_by",
    headName: "Created By",
    filter: false,
    className: "w-[200px]",
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
  // {
  //   fieldName: "edit",
  //   headName: "Edit",
  //   filter: false,
  //   className: "w-[100px]",
  //   filterFormat: "string",
  //   inputType: "text",
  //   // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
  //   hideColumn: false,
  // },
  // {
  //   fieldName: "delete",
  //   headName: "Delete",
  //   filter: false,
  //   className: "w-[100px]",
  //   filterFormat: "string",
  //   inputType: "text",
  //   // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
  //   hideColumn: false,
  // },
];
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const { id, fname, lname, email } = item;
    setDeletedObj({
      ID: id,
      FullName: `${
        fname && lname ? fname && fname + "  " + lname && lname : " "
      }`,
      Email: `${email ? email && email : " "}`,
    });
    setPop({ ...pop, isDelete: true });
  };
  // const handleClose = () => {
  //   setPop({ ...pop, isDelete: false });
  // };

  const handleEditOpen = (item) => {
    const {
      id,
      fname,
      lname,
      email,
      listing_id,
      mobile,
      nights,
      adults,
      childres,
      pets,
      checkin_dt,
      checkout_dt,
    } = item;
    setPutID(id);
    setEditData({
      fname,
      lname,
      email,
      listing_id,
      mobile,
      nights,
      adults,
      childres,
      pets,
      checkin: checkin_dt,
      checkout: checkout_dt,
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
    // console.log("put request");
    dispatch(loaderStart());
    putCheckout(formData, putID)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        // console.log("========================", e);
        dispatch(error(e.response.data.error.message));
      });
  };

  function handlePostRequest(formData) {
    // console.log(formData)
    dispatch(loaderStart());
    postCheckout(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e.response.data.error.message));
      });
    // console.log("post req");
  }

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteCheckout(deletedObj.ID.props.children)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        console.log(e);
        dispatch(error(e.response.data.error.message));
      });
    // console.log("deleted");
  };


  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllCheckout()
      .then((response) => {
        // console.log(response);
        dispatch(loaderSuccess());
        let res = response.data;
        let result = transformRows(res);
        setRows(result);
      })
      .catch((err) => {
        dispatch(error(err?.response?.data?.error?.message));
      });
  }

  function getPhoneNumber(res) {
    return (
      <div
      >
        {res?.mobile ? res?.phone_ext + " " + res?.mobile : ""}
      </div>
    );
  }

  // function getDeleteComponent(item) {
  //   return (
  //     <div>
  //       <DeleteIcon onClick={() => handleOpen(item)} />
  //     </div>
  //   );
  // }

  function transformRows(response) {
    response.forEach((res) => {
      res.id = getIdComponent(res);
      // res.edit = getEditComponent(res);
      // res.delete = getDeleteComponent(res);
      res.created_at = formatDate(res.created_at);
      res.updated_at = formatDate(res.updated_at);
      res.checkin_dt = formatDate(res.checkin_dt);
      res.checkout_dt = formatDate(res.checkout_dt);
      res.mobile = getPhoneNumber(res)
      res.is_active = getActiveComponent(res.is_active);
      res.is_deleted = getIsDeleteComponent(res.is_deleted);
    });
    return response;
  }

  function handleNavigate(res) {
    // console.log(res?.id?.props?.children);
    navigate(`/checkout/${res?.eid}`, { state: { putID: res?.id?.props?.children } });
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

  // function getEditComponent(item) {
  //   return (
  //     <div onClick={() => handleEditOpen(item)}>
  //       <EditIcon />
  //     </div>
  //   );
  // }
  // function getDeleteComponent(item) {
  //   return (
  //     <div>
  //       <DeleteIcon onClick={() => handleOpen(item)} />
  //     </div>
  //   );
  // }

  function getActiveComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  function getIsDeleteComponent(check) {
    return <>{check ? "true" : "false"}</>;
  }

  return (
    <div className="m-3">
      <PageHeader title="Checkout" onClick={handleCreateOpen} />
      <div className="flex text-[16px] m-3">
        <Button value="Completed"  className={"border-[#D9D9D9] text-center  leading-[19.36px] py-[10px] px-[20px] border-[1px] rounded-l-md"}/>
        <Button value="Pending"  className={"border-[#D9D9D9] text-center  leading-[19.36px] py-[10px] px-[20px] border-[1px] border-l-[0px]"}/>
        <Button value="Empty"  className={"border-[#D9D9D9] text-center  leading-[19.36px] py-[10px] px-[20px] border-[1px] rounded-r-md border-l-[0px]"}/>
      </div>
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
          filter={false}
          pagiNationFilter={false}
        />
      )}
{/* 
      {pop.isDelete && deletedObj !== null && (
        <DeletePopup
          deletedObj={deletedObj}
          setIsOpen={setPop}
          title="Checkout"
          onDeleteList={onDeleteList}
        />
      )} */}

      {/* {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Checkout"
          childrenClass={"w-[50%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <CheckOutForm
            isEdit={pop.isEdit}
            close={handleEditClose}
            editData={editData}
            handleRequest={handlePutRequest}
            value="Update"
          />
        </Dialog>
      )} */}
      {pop.isCreate && (
        <Dialog
          closeModal={handleCreateClose}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title="Checkout"
          childrenClass={"w-[50%] h-[75%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <CheckoutCreateForm
            isCreate={pop.isCreate}
            isClose={handleCreateClose}
            setPageLoad={(item)=> setPageLoad(item)}
            // value={"Next"}
            // createClick={pop.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
}

export default Checkout;
