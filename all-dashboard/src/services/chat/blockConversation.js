import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const blockConversation = async (data) => {
  try {
    const res = await ChatAxios.post(endPoints.blockConversation(), data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default blockConversation;
