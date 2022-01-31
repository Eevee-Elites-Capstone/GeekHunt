import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import HunterForm from './components/Auth/HunterForm';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      <div>
      <Navbar />
      </div>
      <div>
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
            <LandingPage />
            </Route>
            <Route exact path="/landing">
              <LandingPage />
            </Route>
            <Route exact path="/home">
              {user ? <Home /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              {user ? <Redirect to="/"/> : <SignUp />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
      </div>
    </div>
  );
}

export default App;
