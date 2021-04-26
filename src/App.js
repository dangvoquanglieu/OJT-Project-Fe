import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './Screens/Signin';
import Signup from './Screens/Signup';
import Header from './Layouts/Header';
import HeaderAdmin from './Layouts/HeaderAdmin';
import Home from './Screens/Home/';
import { getProduct } from "./Redux/Action/productAction";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from './Screens/ShoppingCart';
import Checkout from './Screens/Checkout';
import ManageProduct from './Screens/ManageProduct';
import { RootState } from "./Configs/store";
import ProductDetail from "./Components/ProductDetail";
import CreateProduct from "./Screens/CreateProduct";
import History from "./Screens/History"
import { getOrder } from './Redux/Action/shoppingCartAction';
function App() {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) => state.userReducer.credentials);
  let authen = {
    role: "",
    userName: "",
  }
  if(customer != null){
    authen = customer;
  }
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
    {authen.role === "Admin" ? <HeaderAdmin></HeaderAdmin> : <Header></Header>}
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/shoppingCart" exact component={ShoppingCart} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/manageProduct" exact component={ManageProduct} />
        <Route path="/productDetail" exact component={ProductDetail} />
        <Route path="/createProduct" exact component={CreateProduct} />
        <Route path="/history" exact component={History} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
