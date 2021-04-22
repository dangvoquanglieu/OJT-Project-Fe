import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from '../Redux/Reducer/userReducer';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  userReducer
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);