import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './Screens/Signin/index.tsx';
import Signup from './Screens/Signup';
import Header from './Layouts/Header';
import Home from './Screens/Home/index.tsx';
import Chat from './Screens/Chat/index.tsx';


function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/chat" exact component={Chat} />
      </Switch>    
    </BrowserRouter>
    </div>
  );
}

export default App;
