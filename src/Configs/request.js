import axios from "axios";
export const dbData = (url) => {
  return {
    getData: () => axios.get(url),
    createData: (data) => axios.post(url, data),
    updateData: (id, data) => axios.put(url + id, data),
    deleteData: (id) => axios.delete(url + id)
  };
}