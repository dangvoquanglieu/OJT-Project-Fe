import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './Screens/Signin';
import Signup from './Screens/Signup';
import Header from './Layouts/Header';
import Home from './Screens/Home/'

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
