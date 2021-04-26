import { dbData } from "../../Configs/request";
import { Dispatch } from 'redux';
import { ACTION } from "../ActionType/actionType";

const ROOT_URL = "https://localhost:44381/api/order/";

export const createOrder = (data: any) => {
    dbData(ROOT_URL).createData(data)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
}

export const getOrder = (userName: any) => (dispatch: Dispatch) => {
    dbData(ROOT_URL + userName).getData()
        .then(res => {
            console.log(res.data)
            dispatch({
                type: ACTION.GET_ORDER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}