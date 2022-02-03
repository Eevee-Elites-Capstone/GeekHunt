import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import { useAuthContext } from './hooks/useAuthContext';
import EditProfile from './components/EditProfile';
import Dashboard from './components/Dashboard/Dashboard';
import OnlineUsers from './components/Users/OnlineUsers';
import CreateProject from './components/Dashboard/CreateProject';
import AllProjects from './components/Dashboard/AllProjects';
import SingleProject from './components/Dashboard/SingleProject';
import MessagingPage from './components/Messaging/MessagingPage'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="min-h-max">
      {/* <div>
      <Navbar />
      </div> */}
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
              <Route exact path="/editprofile">
                <EditProfile />
              </Route>
              <Route exact path="/home">
                {user ? <Home /> : <Redirect to="/signin" />}
              </Route>
              <Route path="/home" component={Home} />
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                {user ? <Redirect to="/" /> : <SignUp />}
              </Route>
              <Route path="/dashboard">
                <Dashboard />
                {user && <OnlineUsers />}
              </Route>
              <Route path="/createproject">
                {!user && <Redirect to="/login" />}
                {user && <CreateProject />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <SingleProject />}
              </Route>
              <Route path="/messages">
                <MessagingPage />
                {user}
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
