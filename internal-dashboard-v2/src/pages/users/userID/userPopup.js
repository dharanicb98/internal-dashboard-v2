import { useDispatch } from "react-redux";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../../store/reducers/loaderSlice";


import { editUser } from "../../../services/userServices";
import Button from "../../../components/button";
import { formatDate } from "../../../utils/common";

const UserPopup = ({ isOpen, close, value,putID, formData, data,setPageLoad }) => {
  const dispatch = useDispatch();
  // const params = useParams();
 

  const handleSubmit = () => {
    dispatch(loaderStart());
    putData();
    close();
  };

  const putData = () => {
    dispatch(loaderStart());
    editUser(formData, putID)
      .then(() => {
        dispatch(loaderSuccess());
        setPageLoad((prev) => !prev);
        // console.log("success");
      })
      .catch((e) => {
        dispatch(error(e.response.data.error.message));
      });
  };

  return (
    <div>
      {isOpen && (
          <>
          <div className="flex justify-around items-center">
            <div className="flex flex-col max-w-[40%]  overflow-x-auto">
              {Object.keys(formData).map((eachItem, index) => (
                <p key={index} >
                  {data !== undefined
                    ? ["checkin_dt", "checkout_dt"].includes(eachItem)
                      ? formatDate(data[eachItem])
                      : data[eachItem]
                    : ""}
                </p>
              ))}
            </div>
            <div className="flex flex-col max-w-[40%] overflow-auto">
              {Object.keys(formData).map((eachItem, index) => (
                <p key={index} >{eachItem && formData[eachItem]}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-10 py-5  bottom-0'">
            <Button
              type="outline"
              value="Cancel"
              onClick={() => close()}
              className="animeBtn"
            />
            <Button
              onClick={handleSubmit}
              value={value}
              type = "secondary"
              className="animeBtn"
            />
          </div>
          </>
      )}
    </div>
  );
};

export default UserPopup;
