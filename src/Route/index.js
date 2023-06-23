import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {DashboardPage, ProjectsPage, UsersPage, LoginPage} from '../Pages';
import ProtectedRoute from './ProtectedRoute';

const index = () => {
    return (<>
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={LoginPage}/>

                <ProtectedRoute path="/" component={DashboardPage} exact/>
                <ProtectedRoute path="/projects" component={ProjectsPage} exact/>
                <ProtectedRoute path="/users" component={UsersPage} exact/>
            </Switch>
        </BrowserRouter>
    </>);
};

export default index;
