import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from '../Redux/Reducer/userReducer';
import productReducer from '../Redux/Reducer/productReducer';
import shoppingCartReducer from '../Redux/Reducer/shoppingCartReducer';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    userReducer,
    productReducer,
    shoppingCartReducer
});

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>