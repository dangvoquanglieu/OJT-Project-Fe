import { ACTION } from "../ActionType/actionType";

let initialState = {
    credentials: null
};

const reducer = (state = initialState, { type = "", payload = null}) => {
    switch (type) {
        case ACTION.SIGNIN_USER:
            state.credentials = payload;
            return { ...state };
        case ACTION.LOGOUT_USER:
            state.credentials = null;
            return { ...state };
        default: return state;
    }
}

export default reducer;