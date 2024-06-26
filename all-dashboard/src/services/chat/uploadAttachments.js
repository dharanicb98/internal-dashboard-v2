import { ChatAxios } from "utils/axios";
import endPoints from "services/endpoints";

const uploadAttachment = async (data) => {
  try {
    const formData = new FormData();
    formData.append("image", data);
    const res = await ChatAxios.post(endPoints.uploadAttachment(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      url: res.data.data.image || "",
      err: false,
    };
  } catch (e) {
    console.log(e);
    return {
      url: "",
      err: true,
    };
  }
};

export default uploadAttachment;
