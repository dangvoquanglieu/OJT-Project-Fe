import { ACTION } from "../ActionType/actionType.ts";
import { dbData } from "../../Configs/request.ts";

const ROOT_URL = "https://localhost:44381/api/customers/";

export const sendInforUserSignin = (data) => dispath => {
    dbData(ROOT_URL + 'authenticate').createData(data)
        .then(res => {
            console.log(res)
            dispath({
                type: ACTION.SIGNIN_USER,
                payload: res.data
            });
            //lưu lại thông tin trên localStorage
            localStorage.setItem('credentials', JSON.stringify(res.data));
        })
        .catch(err => console.log(err));
}

export const sendInforUserSignup = (data) => dispath => {
    dbData(ROOT_URL).createData(data)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err));
}

export const logoutUser = () => dispath => {
    dispath({
        type: ACTION.LOGOUT_USER,
    });
    //xóa thông tin trên localStorage
    localStorage.clear('credentials');
}