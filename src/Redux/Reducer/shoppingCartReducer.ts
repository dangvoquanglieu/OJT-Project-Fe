
import { ACTION } from "../ActionType/actionType"

let initialState = {
    cart: [] as any,
    totalCartItem: 0,
    totalAmount: 0,
};

const reducer = (state = initialState, { type = "", payload = {cart: [], total: 0, totalCartItem : 0}}) => {
    switch (type) {
        case ACTION.ADD_CART:
            return { ...state, cart: payload.cart, totalAmount: payload.total, totalCartItem: payload.totalCartItem };
        case ACTION.DELETE_CART:
            return { ...state, cart: payload.cart, totalAmount: payload.total, totalCartItem: payload.totalCartItem }
        case ACTION.INCREASE_PRODUCT:
            return { ...state, cart: payload.cart, totalAmount: payload.total, totalCartItem: payload.totalCartItem }
        case ACTION.DECREASE_PRODUCT:
            return { ...state, cart: payload.cart, totalAmount: payload.total, totalCartItem: payload.totalCartItem }
        default:
            return state;
    }
};

export default reducer;