import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const getMessageList = async (chatId) => {
  try {
    const res = await ChatAxios.post(endPoints.getMessageList(), {
      conversationId: chatId,
    });
    return { data: res?.data?.data || {}, isBlocked: res?.data?.isBlocked || false };
  } catch (error) {
    return {};
  }
};

export default getMessageList;
