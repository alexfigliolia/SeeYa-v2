import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Login from 'Pages/Login';



export default class RestrictedRoute extends Component {

  static defaultProps = {
    path: '/',
    authenticated: false,
    component: null,
    fallback: Login
  }

  render() {
    const { authenticated, path, component, fallback } = this.props;
    if (!authenticated) {
      const Fallback = fallback;
      return <Fallback />;
    }
    const Comp = component;
    return (
      <Route
        path={path}
        component={Comp} />
    );
  }
}
