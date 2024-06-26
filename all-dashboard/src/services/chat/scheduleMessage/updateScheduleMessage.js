import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const updateScheduleMessage = async (data) => {
  try {
    const res = await ChatAxios.put(endPoints.postScheduleMessage(), data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default updateScheduleMessage;
