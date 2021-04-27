import { ACTION } from "../ActionType/actionType";

let initialState = {
    order: [] as any
};

const reducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case ACTION.GET_ORDER:
            state.order = payload;
            return { ...state };
        case ACTION.CONFIRM_ORDER:
            return { ...state, order: state.order.map((ord: any) => ord.id === payload.id ? payload : ord) }
        default: return state;
    }
}

export default reducer;