import React, { useState, useEffect } from "react";
import {
  loaderStart,
  loaderSuccess,
  error,
} from "../../store/reducers/loaderSlice";
import { EditIcon, DeleteIcon } from "../../icons";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
} from "../../services/userServices";
import { useDispatch } from "react-redux";
import { formatDate, formatInput } from "../../utils/common";
import UsersForm from "../../components/forms/users";
import DeletePopup from "../../components/popup/deletePopup";
import PageHeader from "../../components/pageHeader";
import Table from "../../components/hkTable";
import Dialog from "../../ui/dialog";
import UserForm from "./userForm";
import { useNavigate } from "react-router-dom";
import { userTypesConstants } from "../../constants/userConstants";

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
    fieldName: "email",
    headName: "Email",
    filter: false,
    sort: false,
    className: "w-[180px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "dob",
    headName: "Date of birth",
    filter: false,
    sort: false,
    className: "w-[180px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "mobile",
    headName: "Mobile",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "user_role",
    headName: "User Role",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "username",
    headName: "UserName",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "gender",
    headName: "Gender",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "total_orders",
    headName: "Total Orders",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "total_checkouts",
    headName: "Total Checkouts",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "amount_paid",
    headName: "Amount Paid",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "login_attempts",
    headName: "Login Attempts",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "reset_attempts",
    headName: "Reset Attempts",
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

function Users() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const navigate = useNavigate();


  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [deletedObj, setDeleteObj] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [id, setId] = useState(null);

  const hideCreate = () => {
    setPop({ ...pop, isCreate: false });
  };
  const hideEdit = () => {
    setPop({ ...pop, isEdit: false });
  };

  const onDeleteList = async () => {
    dispatch(loaderStart());
    try {
      const response = await deleteUser(deletedObj.id);
      dispatch(loaderSuccess());
      setPageLoad((prev) => !prev);
    } catch (e) {
      console.log(e);
      dispatch(error(e?.response?.data?.error?.message));
    }
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllUsers()
      .then((response) => {
        dispatch(loaderSuccess());
        let res = response.data;
        let result = transformRows(res);
        setRows(result);
      })
      .catch((err) => {
        dispatch(error(err?.response?.data?.error?.message));
      });
  }

  function handleNavigate(res) {
    // console.log(res?.id?.props?.children);
    navigate(`/user/${res?.id?.props?.children}`, { state: { putID: res?.id?.props?.children } });
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

  function getFullName(res) {
    return (
      <div
      >
        {res?.fname + " " + res?.lname}
      </div>
    );
  }

  // function getGender(res) {
  //   return (
  //     <div
  //     >
  //       {res?.gender}
  //     </div>
  //   );
  // }


  function getPhoneNumber(res) {
    return (
      <div
      >
        {res?.mobile_ext + " " + res?.mobile}
      </div>
    );
  }

  function getUserRole(res) {

    const renderUserRole = () => {
      switch (res.user_role) {
        case userTypesConstants.USER_ROLE_ADMIN:
          return "Admin"
        case userTypesConstants.USER_ROLE_HOST:
          return "Host"
        case userTypesConstants.USER_ROLE_CO_HOST:
          return "Co-Host"
        case userTypesConstants.USER_ROLE_CUSTOMER:
          return "Customer"
        default:
          return "_"
      }
    }


    return (
      <div className="ml-3">
        {/* {res.user_role === userTypesConstants.USER_ROLE_ADMIN && 'Admin'}
        {res.user_role === userTypesConstants.USER_ROLE_HOST && 'Host'}
        {res.user_role === userTypesConstants.USER_ROLE_CO_HOST && 'Co-Host'}
        {res.user_role === userTypesConstants.USER_ROLE_CUSTOMER && 'Customer'} */}
        {renderUserRole()}
      </div>
    );
  }

  function transformRows(response) {
    response.forEach((res) => {
      res.edit = getEditComponent(res);
      res.id = getIdComponent(res);
      res.delete = getDeleteComponent(res);
      res.name = getFullName(res);
      // res.gender = getGender(res);
      res.dob = formatDate(res?.dob);
      res.user_role = getUserRole(res);
      res.mobile = getPhoneNumber(res);
      res.created_at = formatDate(res?.created_at);
      res.updated_at = formatDate(res?.updated_at);
    });
    return response;
  }
  function getEditComponent(item) {
    const { id, fname, lname, dob, mobile_ext, mobile, user_role, username, email, bio, gender } = item;

    return (
      <div
        onClick={() => {
          setId(id);
          setUpdatedData({ id, fname, lname, dob : formatInput(dob), mobile_ext, user_role, mobile, username, email, bio, gender });
          setPop((prev) => ({ ...prev, isEdit: true }));
        }}
      >
        <EditIcon />
      </div>
    );
  }
  function getDeleteComponent(item) {
    return (
      <div
        onClick={() => {
          setPop((prev) => ({ ...prev, isDelete: true }));
          // console.log(item);
          setDeleteObj({
            id: item?.id,
            firstName: item?.fname,
            LastName: item?.lname,
          });
        }}
      >
        <DeleteIcon />
      </div>
    );
  }

  const handleCreateButton = () => {
    setPop({ ...pop, isCreate: true });
  };

  const createApiHandler = async (formData) => {

    dispatch(loaderStart());
    try {
      const response = await createUser(formData);
      dispatch(loaderSuccess());
      setPageLoad((prev) => !prev);
    } catch (e) {
      console.log(e);
      dispatch(error(e?.response?.data?.error?.message));
    }
  };

  const editApiHandler = async (formData) => {
    dispatch(loaderStart());
    try {
      const response = await editUser(formData, id);

      dispatch(loaderSuccess());
      setPageLoad((prev) => !prev);
    } catch (e) {
      // console.log(e["message"] , e)
      dispatch(error(e?.response?.data?.error?.message));
    }
  };

  return (
    <>
      <PageHeader title="Users" onClick={handleCreateButton} />
      {rows && (
        <Table
          rows={rows}
          columns={TABLE_COLUMNS}
          filter={false}
          pagiNationFilter={false}
        />
      )}

      {pop.isCreate && (
        <Dialog
          closeModal={hideCreate}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title="User"
          childrenClass={
            "w-[60%] h-[75%] p-6 rounded-md no-scrollbar"
          }
        >
          <UserForm
            close={hideCreate}
            updateData={""}
            value="Create"
            isdisplay={true}
            handleRequest={createApiHandler}
            createClick={pop.isCreate}
            isEdit={pop.isCreate}
          />
        </Dialog>
      )}
      {pop.isEdit && (
        <Dialog
          closeModal={hideEdit}
          isOpen={pop.isEdit}
          title="User"
          childrenClass={
            "w-[60%] h-[75%]  p-6 rounded-md "
          }
        >
          <UserForm
            close={hideEdit}
            updateData={updatedData}
            isEdit={pop.isEdit}
            handleRequest={editApiHandler}
            value="Update"
          />
        </Dialog>
      )}
      {pop.isDelete && (
        <DeletePopup
          title="User"
          setIsOpen={setPop}
          deletedObj={deletedObj}
          onDeleteList={onDeleteList}
        />
      )}
    </>
  );
}

export default Users;
