import { message } from "antd";
import axios from "axios";
import { API_URL } from "config/constant";

export async function upload(endpointName: string, formData: FormData) {
  return axios
    .post(`${API_URL}/api/uploads/${endpointName}`, formData)
    .then((response) => {
      const { data } = response;
      if (data.success) {
        message.success(`File Uploaded Successfully!`);
      }
      return data.data;
    })
    .catch((err) => {
      message.error(`Failed to upload File!`);
      return err;
    });
}
