import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const deleteSavedMessage = async (data) => {
  try {
    const res = await ChatAxios.delete(endPoints.postSavedMessage(), { data });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default deleteSavedMessage;
