import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const getScheduleMessageTemplates = async () => {
  try {
    const res = await ChatAxios.get(endPoints.getScheduleMessageTemplates());
    return res.data?.data || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getScheduleMessageTemplates;
