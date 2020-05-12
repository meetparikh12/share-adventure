import React from 'react';
//{useState, useCallback} from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import Auth from './users/pages/Login';
import Register from './users/pages/Register';
import { USER_LOGIN } from './actions/actionTypes';
import jwt_decode from 'jwt-decode';
import setJwtToken from './shared/components/security-utils/setJwtToken';
import store from './store';
import ProtectedRoute from './shared/components/security-utils/ProtectedRoute';

const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJwtToken(jwtToken);
  const decoded_token = jwt_decode(jwtToken);
  //dispatch to our UserReducer
  store.dispatch({
    type: USER_LOGIN,
    payload: decoded_token
  });

  const currentTime = Date.now()/1000;
  console.log(currentTime);
  console.log(decoded_token.exp);
  if(decoded_token.exp < currentTime){
    localStorage.removeItem("jwtToken");
    setJwtToken(false);
    store.dispatch({
      type: USER_LOGIN,
      payload: {}
    });
    window.location.href ="/";
  }
}

function App() {
  return (
      <Router>
        <MainNavigation/>
          <main>
            <Switch>
              <Route exact path="/" component={Users}/>
              <Route exact path="/login" component={Auth}/>
              <Route exact path="/register" component={Register}/>
              <ProtectedRoute exact path="/place/new" component={NewPlace}/>
              <ProtectedRoute exact path="/place/:placeId" component={UpdatePlace}/>
              <Route exact path="/:userId/places" component={UserPlaces}/>
              <Redirect to="/"/>
            </Switch>
          </main>
      </Router>
  );
}

export default App;
