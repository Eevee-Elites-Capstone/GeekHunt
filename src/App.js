import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import GeekForm from './components/Auth/GeekForm';
import Home from './components/Home';
import HunterForm from './components/Auth/HunterForm';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      <div>
   git 
      </div>
      <div>
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {/* {user ? <Home /> : <Redirect to="/signin"/>} */}
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              {user ? <Redirect to="/"/> : <SignUp />}
            </Route>
            <Route path="/hunter">
              {HunterForm}
            </Route>
            <Route exact path="/signup/geek">
              {user ? <Redirect to="/"/> : <GeekForm />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
      </div>
    </div>
  );
}

export default App;
