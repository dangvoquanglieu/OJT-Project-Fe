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

export const createProduct = (data: any) => (dispatch: Dispatch) => {
    dbData(ROOT_URL).createData(data)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ACTION.CREATE_PRODUCT,
                payload: res.data
            })
            
        })
        .catch(err => console.log(err));
}


export const updateProduct = (id: any, data: any) => (dispatch: Dispatch) => {
    console.log(id);
    dbData(ROOT_URL).updateData(id, data)
        .then(res => {
            dispatch({
                type: ACTION.UPDATE_PRODUCT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));

}

export const deleteProduct = (id: any) => (dispatch: Dispatch) => {
    dbData(ROOT_URL).deleteData(id)
        .then(res => {
            dispatch({
                type: ACTION.DELETE_PRODUCT,
                payload: id
            })
        })
        .catch(err => console.log(err));
}
