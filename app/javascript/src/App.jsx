import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import initializeLogger from "./common/logger";

const App = () => {
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    logger.info("Log from js-logger");
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <h1>Home</h1>} />
        <Route exact path="/about" render={() => <h1>About</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
