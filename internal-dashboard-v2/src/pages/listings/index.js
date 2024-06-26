/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../store/reducers/loaderSlice";
import { useDispatch } from "react-redux";
import { DeleteIcon, EditIcon } from "../../icons";
import { formatCurrency, formatDate } from "../../utils/common";
import {
  deleteListings,
  getAllListings,
  updateListings,
} from "../../services/listingsServices";
import CreateListings from "../../components/forms/createListings";
import Table from "../../components/hkTable";
import PageHeader from "../../components/pageHeader";
import Dialog from "../../ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import ListingsForm from "./listingsForm";
import DeletePopup from "../../components/popup/deletePopup";


const TABLE_COLUMNS = [
  {
    fieldName: "listing_id",
    headName: "ID",
    sort: false,
    filter: false,
    className: "w-[150px]",
    filterFormat: "array",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "title",
    headName: "Title",
    filter: false,
    sort: false,
    className: "w-[250px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "base_price",
    headName: "Base price",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "weekend_price",
    headName: "Weekend price",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "security_deposit",
    headName: "Security Deposit",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "currency",
    headName: "Currency",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
    hideColumn: false,
  },
  {
    fieldName: "currency_symbol",
    headName: "Currency symbol",
    filter: false,
    sort: false,
    className: "w-[200px]",
    filterFormat: "string",
    inputType: "text",
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
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
  {
    fieldName: "delete",
    headName: "Delete",
    filter: false,
    className: "w-[150px]",
    filterFormat: "string",
    inputType: "text",
    // selectData: [{ New: 1 }, { Completed: 2 }, { Empty: 0 }],
    hideColumn: false,
  },
];
const Listings = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [pageLoad, setPageLoad] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [popup, setPopUp] = useState({
    isEdit: false,
    isDelete: false,
    isCreate: false
  })

  const navigate = useNavigate()


  useEffect(() => {
    getData();
  }, [pageLoad]);

  function getData() {
    dispatch(loaderStart());
    getAllListings()
      .then((response) => {
        dispatch(loaderSuccess());
        let res = response.data.data;
        let result = transformRows(res);
        setRows(result);
      })
      .catch((err) => {
        //dispatch(error(err))
      });
  }

  const getBasePrice = (currency, amount) => (
    <div>{formatCurrency(currency, amount)}</div>
  )

  const getTitleLink = (res) => (
    <div className="text-blue-500 hover:underline  cursor-pointer">
      <a href={`${process.env.REACT_APP_WEBSITE_URL}/listing/${res.permalink}`} target="_blank">{res?.title}</a>
    </div>
  )


  function transformRows(response) {
    response.forEach((res) => {
      res.listing_id = getListingDetail(res.listing_id)
      res.title = getTitleLink(res)
      res.createdAt = formatDate(res?.createdAt);
      res.updatedAt = formatDate(res?.updatedAt);
      res.edit = getEditComponent(res.listing_id);
      res.delete = getDeleteComponent(res);
      res.base_price = getBasePrice(res?.currency, res?.basic_pricing.base_price);
      res.weekend_price = getBasePrice(res?.currency, res?.basic_pricing.weekend_price);
      res.security_deposit = getBasePrice(res?.currency, res?.basic_pricing.security_deposit);
    });
    return response;
  }



  function getListingDetail(id) {
    return (
      <Link to={`/listings/${id}`} className="text-blue-500 cursor-pointer">{id}</Link>
    )
  }

  function getEditComponent(item) {
    // console.log("Radhe Radhe", item);
    return (
      <div>
        <EditIcon onClick={() => handleEditButton(item)} />
      </div>
    );
  }

  function getDeleteComponent(item) {
    return (
      <div>
        <DeleteIcon onClick={() => handleDeleteButton(item)} />
      </div>
    );
  }

  function handleEditButton(item) {
    setActiveItem({ ...item, listing_id: item?.props?.children });
    setPopUp((prev) => ({ ...prev, isEdit: true }));
  }

  const handleEditCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isEdit: false }));

  const handleDeleteButton = (item) => {
    // console.log("Response", item);

    setActiveItem(item);
    setPopUp((prev) => ({ ...prev, isDelete: true }));
  };

  const handlePutRequest = (formData) => {
    console.log("put request", formData);
    dispatch(loaderStart());
    updateListings(formData?.listing_id, {status: formData.status})
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e.message));
      });
  };

  const handleDeleteRequest = () => {
    dispatch(loaderStart());
    deleteListings(activeItem.listing_id)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("Delete Success");
      })
      .catch((e) => dispatch(error(e)));
  };

  //handle create
  const handleCreate = () => {
    navigate(`/listings/create`)
  };

  console.log('rows', rows)
  return (
    <>
      <div className="m-3">
        <PageHeader title="Listings" onClick={handleCreate} />

        {rows && (
          <Table
            rows={rows}
            columns={TABLE_COLUMNS}
            filter={false}
            pagiNationFilter={false}
          />
        )}

        {popup.isEdit && (
          <Dialog
            closeModal={handleEditCloseButton}
            isOpen={popup.isEdit}
            title="Listings"
            childrenClass={
              "w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"
            }
          >
            <ListingsForm
              isEdit={popup.isEdit}
              close={handleEditCloseButton}
              editData={{
                listing_id: activeItem.listing_id,
                status: activeItem.status,
              }}
              handleRequest={handlePutRequest}
              value="Update"
            />
          </Dialog>
        )}

        {popup.isDelete && (
          <DeletePopup
            deletedObj={{ name: activeItem?.title }}
            title="Listings"
            onDeleteList={handleDeleteRequest}
            setIsOpen={setPopUp}
          />
        )}
      </div>
    </>
  );
};
export default Listings;
