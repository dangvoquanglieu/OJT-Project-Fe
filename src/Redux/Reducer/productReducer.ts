import { ACTION } from "../ActionType/actionType";

let initialState = {
    productList: [] as any,
};

const reducer = (state = initialState, { type = "", payload = {id: ""} }) => {
    switch (type) {
        case ACTION.GET_PRODUCT:
            state.productList = payload;
            return { ...state };
        case ACTION.CREATE_PRODUCT:
            return { ...state, productList: [...state.productList, payload] };
        case ACTION.UPDATE_PRODUCT:
            return { ...state, productList: state.productList.map((pd: any) => pd.id === payload.id ? payload : pd) }
        case ACTION.DELETE_PRODUCT:
            return { ...state, productList: state.productList.filter((pd: any) => pd.id != payload) }
        default:
            return state;
    }
}

export default reducer;