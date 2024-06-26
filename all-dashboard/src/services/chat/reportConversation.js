import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const reportConversation = async (data) => {
  try {
    const res = await ChatAxios.post(endPoints.reportConversation(), data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default reportConversation;
