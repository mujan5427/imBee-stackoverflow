import React, {
  useState, useEffect
} from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom';
import './App.scss';
import './zh-tw';
import moment from 'moment';

import Home from './pages/home/Home';

function App() {
  useEffect(() => {
    moment.locale('zh-tw');
  }, []);

  return (
    <Router>
      <div className="page">
        <Switch>
          <Route
            exact
            path="/"
          >
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;