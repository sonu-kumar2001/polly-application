import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { either, isEmpty, isNil } from "ramda";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { getFromLocalStorage } from "helpers/storage";
import PageLoader from "./components/PageLoader";
import { initializeLogger } from "common/logger";
import Dashboard from "./components/Dashboard";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import PrivateRoute from "components/Common/PrivateRoute";
import CreatePoll from "./components/Polls/CreatePoll";
import ShowPoll from "./components/Polls/ShowPoll";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute
          component={CreatePoll}
          condition={isLoggedIn}
          path="/polls/create"
          redirectRoute="/login"
        />
        <PrivateRoute
          component={ShowPoll}
          condition={isLoggedIn}
          path="/polls/:slug/show"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
