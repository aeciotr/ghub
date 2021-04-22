import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/repositories/:repository+/:page" component={Repository}/>
    <Route path="/starreds/:starred+/:page" component={Repository} />
  </Switch>
);

export default Routes;
