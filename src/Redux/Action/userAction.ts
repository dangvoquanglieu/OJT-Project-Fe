import { ACTION } from "../ActionType/actionType";
import { dbData } from "../../Configs/request";
import { Dispatch } from 'redux';

const ROOT_URL = "https://localhost:44381/api/customers/";

export const sendInforUserSignin = (data: any) => (dispatch: Dispatch) => {
    dbData(ROOT_URL + 'authenticate').createData(data)
        .then(res => {
            console.log(res)
            dispatch({
                type: ACTION.SIGNIN_USER,
                payload: res.data
            });
            //lưu lại thông tin trên localStorage
            localStorage.setItem('credentials', JSON.stringify(res.data));
        })
        .catch(err => console.log(err));
}

export const sendInforUserSignup = (data: any) => (dispatch: Dispatch) => {
    dbData(ROOT_URL).createData(data)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err));
}

export const logoutUser = () => (dispatch: Dispatch) => {
    dispatch({
        type: ACTION.LOGOUT_USER,
    });
    //xóa thông tin trên localStorage
    localStorage.removeItem('credentials');
}