import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DashboardPage, ProjectsPage, UsersPage, LoginPage } from '../Pages';
import ProtectedRoute from './ProtectedRoute';

const index = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />

          <ProtectedRoute path="/" component={DashboardPage} />
          <ProtectedRoute path="/projects" component={ProjectsPage} />
          <ProtectedRoute path="/users" component={UsersPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default index;
