import { ACTION } from "../ActionType/actionType";

let initialState = {
    order: null
};

const reducer = (state = initialState, { type = "", payload = null}) => {
    switch (type) {
        case ACTION.GET_ORDER:
            state.order = payload;
            return { ...state };
        // case ACTION.ADD_ORDER:
        //     state.credentials = null;
        //     return { ...state };
        default: return state;
    }
}

export default reducer;