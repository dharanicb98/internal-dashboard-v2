import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../store/reducers/loaderSlice";
import {
  getAllReferrals,
  deleteReferral,
  postReferral,
  putReferral,
} from "../../services/affiliateReferralServices";
import { DeleteIcon, EditIcon } from "../../icons";
import { formatDate } from "../../utils/common";
import DeletePopup from "../../components/popup/deletePopup";
import PageHeader from "../../components/pageHeader";
import Table from "../../components/hkTable";
import Dialog from "../../ui/dialog";
import AffliateReferrelsForm from "./affliateReferrelsForm";

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
    fieldName: "user_id",
    headName: "User Id",
    filter: false,
    sort: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "ref_code",
    headName: "Referral Code",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "valid_till",
    headName: "Valid Till",
    filter: false,
    className: "w-[200px]",
    filterFormat: "array",
    inputType: "date",
    hideColumn: false,
  },
  {
    fieldName: "customer_discount",
    headName: "Customer Discount",
    filter: false,
    className: "w-[200px]",
    filterFormat: "range",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "affiliate_comission",
    headName: "Affiliate Comission",
    filter: false,
    className: "w-[200px]",
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

const AffiliateReferral = () => {
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
      const response = await getAllReferrals();
      dispatch(loaderSuccess());
      // console.log(response);
      const result = response.data;
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

  function transformRows(response) {
    response.forEach((res) => {
      res.edit = getEditComponent(res);
      res.delete = getDeleteComponent(res);
      res.created_at = formatDate(res.created_at);
      res.updated_at = formatDate(res.updated_at);
      res.is_active = res.is_active ? "true" : "false";
      res.is_deleted = res.is_deleted ? "true" : "false";
      res.valid_till = formatDate(res.valid_till);
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
    putReferral(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
  };

  const onDeleteList = () => {
    dispatch(loaderStart());
    deleteReferral(activeData.id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        dispatch(error(e?.response?.data?.error?.message));
      });
    console.log("deleted");
  };

  const handlePostRequest = (formData) => {
    // console.log(formData)
    dispatch(loaderStart());
    postReferral(formData)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        console.log("success");
      })
      .catch((e) => {
        console.log(e);
        dispatch(error(e?.response?.data?.error?.message));
      });
    // console.log("post req");
  };

  return (
    <div className="m-3">
      <PageHeader title="Affliate Referrals" onClick={handleCreateOpen} />
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
            "User Id": activeData.user_id,
            Commission: activeData.affiliate_comission,
          }}
          close={handleClose}
          title="Affliate Referral"
          onDeleteList={onDeleteList}
        />
      )}

      {pop.isEdit && (
        <Dialog
          closeModal={handleEditClose}
          isOpen={pop.isEdit}
          title="Affliate Referral"
          childrenClass={"w-[45%] p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AffliateReferrelsForm
            isEdit={pop.isEdit}
            close={handleEditClose}
            editData={{
              user_id: activeData.user_id,
              id: activeData.id,
              ref_code: activeData.ref_code,
              is_active: activeData.is_active === "true" ? 1 : 0,
              customer_discount: activeData.customer_discount,
              affiliate_comission: activeData.affiliate_comission,
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
          title="Affliate Referral"
          childrenClass={"w-[45%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AffliateReferrelsForm
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              user_id: "",
              ref_code: "",
              is_active: "",
              customer_discount: "",
              affiliate_comission: "",
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

export default AffiliateReferral;
