import React, { Fragment, useEffect } from "react";
import "./App.css";
//redux imports
import { Provider } from "react-redux";
import store from "./store";
//router imports
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";

//components import
import Login from "./components/auth/Login";
import Landing from "./components/ui/Landing";
import Alert from "./components/ui/Alert";
import Footer from "./components/ui/Footer";
import Routes from "./routes/Routes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
