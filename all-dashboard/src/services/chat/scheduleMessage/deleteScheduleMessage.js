import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const deleteScheduleMessage = async (data) => {
  try {
    const res = await ChatAxios.delete(endPoints.postScheduleMessage(), {
      data,
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default deleteScheduleMessage;
