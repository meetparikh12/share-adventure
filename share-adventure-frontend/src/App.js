import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import Auth from './users/pages/Auth';
function App() {
  return (
      <Router>
        <MainNavigation/>
        <main>
          <Switch>
            <Route exact path="/" component={Users}/>
            <Route exact path="/auth" component={Auth}/>
            <Route exact path="/place/new" component={NewPlace}/>
            <Route exact path="/place/:placeId" component={UpdatePlace}/>
            <Route exact path="/:userId/places" component={UserPlaces}/>
            <Redirect to="/"/>
          </Switch>
        </main>
      </Router>
  );
}

export default App;
