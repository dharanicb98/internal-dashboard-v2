import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const getScheduleMessageList = async (data) => {
  try {
    const res = await ChatAxios.get(endPoints.getScheduleMessageList(data));
    return res.data?.data || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getScheduleMessageList;
