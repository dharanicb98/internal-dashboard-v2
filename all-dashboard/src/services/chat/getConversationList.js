import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";
import serializeQueryParams from "utils/common/serializeQueryParams";

const getConversationList = async (filters) => {
  try {
    const queryString = serializeQueryParams(filters);
    const res = await ChatAxios.get(endPoints.getConversationList(queryString));

    return res?.data?.data || {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default getConversationList;
