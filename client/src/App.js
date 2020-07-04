import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Notifications from 'react-notify-toast';
import Landing from './components/landing';
import Confirm from './components/confirm';
import Spinner from './components/spinner';
import { API_URL } from './config'
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  componentDidMount = () => {
    fetch(`${API_URL}/wake-up`)
      .then(res => res.json())
      .then(() => {
        this.setState({ loading: false })
      })
      .catch(err => console.log(err))
  }



  render() {
    const content = () => {

      // The server is still asleep, so provide a visual cue with the <Spinner /> 
      // component to give the user that feedback.
      if (this.state.loading) {
        return <Spinner size='8x' spinning='spinning' />
      }

      return (
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              {/* 
              the ':id' in this route will be the unique id the database 
              creates and is available on 'this.props' inside the <Confirm />
              component at this.props.match.params.id
            */}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path='/confirm/:id' component={Confirm} />
              <Route exact path='/confirm' component={Landing} />
              <Redirect from='*' to='/' />
              <PrivateRoute exact path="/" component={Dashboard} />
            </Switch>
          </BrowserRouter>
        </Provider>
      );
    }

    return (

      //  The 'container' class uses flexbox to position and center its three 
      // children: <Notifications />, <main> 
      <div className='wrapper fadein'>
         
        {/* <Notifications > component from 'react-notify-toast'. This is the 
        placeholder on the dom that will hold all the feedback toast messages 
        whenever notify.show('My Message!') is called. */}
        
        <Notifications />
        <main>
          {content()}
        </main>
      </div>
    );
  }
}
export default App;
