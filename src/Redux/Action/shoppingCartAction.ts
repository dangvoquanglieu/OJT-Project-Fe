import { dbData } from "../../Configs/request";
import { Dispatch } from "redux";
import { ACTION } from "../ActionType/actionType";

const ROOT_URL = "https://localhost:44381/api/order/";
const URL_NOTIFICATION = "https://localhost:44381/api/messager/notify";


export const createOrder = (data: any,notification:any) => {
  dbData(ROOT_URL)
    .createData(data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));

   dbData(URL_NOTIFICATION).createData(notification).catch(err=>console.log(err));
};

export const getOrder = (userName: any) => (dispatch: Dispatch) => {
  dbData(ROOT_URL + userName)
    .getData()
    .then((res) => {
      dispatch({
        type: ACTION.GET_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getListOrder = () => (dispatch: Dispatch) => {
  dbData(ROOT_URL)
    .getData()
    .then((res) => {
      dispatch({
        type: ACTION.GET_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const confirmOrder = (id: any, data: any) => (dispatch: Dispatch) => {
    console.log(id);
    dbData(ROOT_URL).updateData(id, data)   
        .then(res => {
            dispatch({
                type: ACTION.CONFIRM_ORDER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));

}
