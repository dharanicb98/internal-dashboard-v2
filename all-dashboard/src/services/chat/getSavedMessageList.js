import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const getSavedMessageList = async (data) => {
  try {
    const res = await ChatAxios.get(endPoints.getSavedMessageList(data));
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getSavedMessageList;
