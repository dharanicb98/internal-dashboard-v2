import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const createConversation = async ( payload ) => {
  try {
    const res = await ChatAxios.post(endPoints.createConversation(), payload);
    return res;
  } catch (error) {
    return null;
  }
};

export default createConversation;
