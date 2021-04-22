import { ACTION } from "../ActionType/actionType";
import { dbData } from "../../Configs/request";
import { Dispatch } from 'redux';

const ROOT_URL = "https://localhost:44381/api/product/";

export const getProduct = () => (dispatch: Dispatch) => {
    dbData(ROOT_URL).getData()
        .then(res => {
            console.log(res)
            dispatch({
                type: ACTION.GET_PRODUCT,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}
