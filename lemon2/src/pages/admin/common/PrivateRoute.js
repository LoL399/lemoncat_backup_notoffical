
import React, { Component } from 'react';
import {Route, Redirect } from 'react-router-dom'
import NoAuth from '../../Other/401';
import Login from '../layout/login';

export default function PrivateRoute ({component: Component, authed, ...rest}) {

    return (
        <Route
        {...rest}
        render={(props) => authed === false
            ? <Component {...props} />
            : <Route to="/401" component={NoAuth}/>}
        />
    )
}