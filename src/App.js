import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './Screens/Signin/index';
import Signup from './Screens/Signup/index';
import Header from './Layouts/Header/index';
import Home from './Screens/Home/index'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
