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
//import {AuthContext} from './shared/components/context/Auth-Context';

// const App = () => {
  
//   const[isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = useCallback(
//     () => {
//       setIsLoggedIn(true);
//     },
//     [],
//   )

//   const logout = useCallback(
//     () => {
//       setIsLoggedIn(false);
//     },
//     [],
//   )

function App() {
  return (
   // <AuthContext.Provider value = {{ isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <Router>
        <MainNavigation/>
          <main>
            <Switch>
              <Route exact path="/" component={Users}/>
              <Route exact path="/login" component={Auth}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/place/new" component={NewPlace}/>
              <Route exact path="/place/:placeId" component={UpdatePlace}/>
              <Route exact path="/:userId/places" component={UserPlaces}/>
              <Redirect to="/"/>
            </Switch>
          </main>
      </Router>
  //  </AuthContext.Provider>
  );
}

export default App;
