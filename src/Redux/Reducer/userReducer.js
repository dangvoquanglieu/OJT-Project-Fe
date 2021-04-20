import { ACTION } from "../ActionType/index";

let initialState = {
    credentials: null
};

const reducer = (state = initialState, { type, payload }) => {
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