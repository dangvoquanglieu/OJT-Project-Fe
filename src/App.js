import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './Screens/Signin';
import Signup from './Screens/Signup';
import Header from './Layouts/Header';
import Home from './Screens/Home/';
import { getProduct } from "./Redux/Action/productAction";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import ShoppingCart from './Screens/ShoppingCart';
import Checkout from './Screens/Checkout';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const credentialsStr = localStorage.getItem("credentials");
    if (credentialsStr) {
      console.log(JSON.parse(credentialsStr));
      dispatch({
        type: "SIGNIN_USER",
        payload: JSON.parse(credentialsStr),
      })
    }

    dispatch(getProduct());
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/shoppingCart" exact component={ShoppingCart} />
        <Route path="/checkout" exact component={Checkout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
