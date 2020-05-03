import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
function App() {
  return (
      <Router>
        <MainNavigation/>
        <main>
          <Switch>
            <Route exact path="/" component={Users}/>
            <Route exact path="/place/new" component={NewPlace}/>
            <Redirect to="/"/>
          </Switch>
        </main>
      </Router>
  );
}

export default App;
