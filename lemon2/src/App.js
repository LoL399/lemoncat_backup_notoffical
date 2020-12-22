import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import AdminPage from './pages/admin/layout/layout';
import Login from './pages/admin/layout/login';
import NoFound from './pages/Other/404';
import ClientPage from './pages/user/layout/layout';
import ServerError from './pages/Other/400';

function App() {
  return (

        <Switch>
          <Route path='/home' component={ClientPage}/>
          <Route path='/login' exact component={Login} />
          <Route path='/admin' component={AdminPage}/>
          <Route path='/404' exact component={NoFound} />
          <Route path='/400' exact component={ServerError} />
          <Redirect to='/404'/>
          {/* Private Route soon */}
      </Switch>



  );
}

export default App;
