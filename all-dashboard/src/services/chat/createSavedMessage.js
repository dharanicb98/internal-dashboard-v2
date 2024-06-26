import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const createSavedMessage = async (data) => {
  try {
    const res = await ChatAxios.post(endPoints.postSavedMessage(), data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default createSavedMessage;
