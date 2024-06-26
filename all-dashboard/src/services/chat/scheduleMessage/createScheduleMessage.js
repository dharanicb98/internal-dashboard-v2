import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const createScheduleMessage = async (data) => {
  try {
    const res = await ChatAxios.post(endPoints.postScheduleMessage(), data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default createScheduleMessage;
