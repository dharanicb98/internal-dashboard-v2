import endPoints from "services/endpoints";
import { ChatAxios } from "utils/axios";

const updateMessageBooking = async (data) => {
  try {
    const res = await ChatAxios.patch(endPoints.getMessageList(), data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default updateMessageBooking;
