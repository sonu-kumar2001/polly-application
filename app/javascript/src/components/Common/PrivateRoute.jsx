import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = props => {
  if (!props.condition) {
    return <Redirect to={props.redirectRoute} />;
  }
  return <Route path={props.path} component={props.component} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
};

export default PrivateRoute;
