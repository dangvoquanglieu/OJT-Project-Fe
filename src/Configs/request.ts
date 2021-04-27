import axios from "axios";

export const dbData = (url:any) => {
  return {
    getData: () => axios.get(url),
    createData: (data:any) => axios.post(url, data),
    updateData: (id:any, data:any) => axios.put(url + id, data),
    deleteData: (id:any) => axios.delete(url + id),
  };
}