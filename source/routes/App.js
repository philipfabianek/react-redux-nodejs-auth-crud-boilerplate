import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./../components/landing-page/LandingPage";
import Register from "./../components/register/Register";
import Login from "./../components/login/Login";
import Dashboard from "./../components/dashboard/Dashboard";

import NotFound from "./../components/NotFound";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

export const App = () => (
    <Switch>
        <Route path="/" exact={true} component={LandingPage} />
        <Route path="/register" exact={true} component={Register} />
        <PublicRoute path="/login" exact={true} component={Login} />
        <PrivateRoute path="/dashboard" exact={true} component={Dashboard} />
        <Route component={NotFound} />
    </Switch>
);
