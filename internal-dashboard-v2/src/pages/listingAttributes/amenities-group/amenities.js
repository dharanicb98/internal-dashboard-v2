import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import AmenitiesForm from "../../../components/forms/listingAttributes/amenitiesForm";
import { useDispatch } from "react-redux";
import { DeleteIcon, EditIcon } from "../../../icons";
import {
  deleteAmenties,
  getAmenties,
  updateAmenties,
  getAmenitiesGroup
} from "../../../services/amenities";
import {
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";
import DeletePopup from "../../../components/popup/deletePopup";
import Dialog from "../../../ui/dialog";
import PageHeader from "../../../components/pageHeader";

const Amenities = () => {
  const { id } = useParams();
  const location = useLocation();
  const [updateData, setUpdateData] = useState();
  const dispatch = useDispatch();
  const [deletedObj, setDeleteDetails] = useState(null);
  const [errorInApi, setErrorInApi] = useState(false);
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [pageLoad, setPageLoad] = useState(false);
  const [amenities, setAmenities] = useState([]);

  const hideCreatePopup = () => {
    setUpdateData("");
    setPop({ ...pop, isCreate: false });
  };

  const hideEditPopup = () => {
    setUpdateData("");
    setPop({ ...pop, isEdit: false });
  };

  const getData = async () => {
    dispatch(loaderStart());
    try {
      const response = await getAmenitiesGroup();
      dispatch(loaderSuccess());
      console.log("this is ameties checking", response.data.data);
      setAmenities(response.data.data[id]);
    } catch (error) {
      dispatch(error(error?.response?.data?.error?.message))
    }
  };

  const createAmenties = () => {
    setPop({ ...pop, isCreate: true });
  };

  const deleteAmenities = async () => {
    //  console.log(id);
    const { id } = deletedObj;
    try {
      await deleteAmenties(id);
      dispatch(loaderSuccess());
      setPageLoad((prev) => !prev);
    } catch (error) {
      dispatch(error(error?.response?.data?.error?.message));
    }
  };

  useEffect(() => {
    getData();
  }, [pageLoad]);
  // console.log(location);
  return (
    <div className="h-screen">
      <div className="m-8">
        <PageHeader title="Amenities" onClick={createAmenties} />
      </div>

        <div className="text-start md:ml-[110px]">
           <h2 className="text-xl font-semibold m-3">{location?.state?.name && location?.state?.name}</h2>
        </div>
      <div className="flex flex-col items-center">
        <div className="bg-white drop-shadow-md w-[80%] p-2 rounded-md flex flex-col gap-2">
          {amenities?.map((el, index) => (
            <div key={el.id} className="flex justify-between">
              <div className="flex gap-4">
                <span><img src={`${process.env.REACT_APP_CDN_URL}${el.icon_path}`} alt={`${el.name}`} className="w-[20px]"/></span>
                <span>{el.name}</span>
              </div>

              <div className="flex justify-between gap-2">
                <EditIcon
                  // className="!text-black !font-[1000]"
                  onClick={() => {
                    setPop((prev) => ({ ...prev, isEdit: true }));
                    setUpdateData((prev) => ({
                      ...prev,
                      id: el.id,
                      name: el.name,
                      slug: el.slug,
                      icon_path: el.icon_path,
                    }));
                  }}
                />
                <DeleteIcon
                  // className="!text-black !font-[1000]"
                  onClick={() => {
                    setPop((prev) => ({ ...prev, isDelete: true }));
                    setDeleteDetails({
                      id: el.id,
                      name: el.name,
                      slug: el.slug,
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {pop.isDelete && (
        <DeletePopup
          title={"delete"}
          onDeleteList={deleteAmenities}
          deletedObj={deletedObj}
          setIsOpen={setPop}
        />
      )}

      {pop.isCreate && (
        <Dialog
          closeModal={hideCreatePopup}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title="Amenities"
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AmenitiesForm
            name={location.state.name}
            id={location.state.id}
            hidePopup={hideCreatePopup}
            updateData={{ name: "", parent_id: id, parent_type: "amenities-group", }}
            btn={pop}
            setPageLoad={setPageLoad}
            createClick={pop.isCreate}
            isEdit={pop.isCreate}
          />
        </Dialog>
      )}
      {pop.isEdit && (
        <Dialog
          closeModal={hideEditPopup}
          isOpen={pop.isEdit}
          title="Amenities"
          childrenClass={"w-[50%]  p-6 rounded-md no-scrollbar dark-scrollbar"}
        >
          <AmenitiesForm
            name={location.state.name}
            id={id}
            hidePopup={hideEditPopup}
            updateData={{ ...updateData, parent_id: id, parent_type: "amenities-group" }}
            btn={pop}
            setPageLoad={setPageLoad}
            isEdit={pop.isEdit}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Amenities;