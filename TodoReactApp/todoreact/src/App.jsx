import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Helpers/PrivateRoute";
import 'semantic-ui-css/semantic.min.css';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";



import InviteUser from "./pages/InviteUser";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            {/* authentication pages */}
            <Route exact path="/" component={Login} />
            <Route exact path="/register" render={props => <Register {...props} />}/>
            <Route exact path="/login" component={Login} />
            <PrivateRoute logout="true" path="/logout" component={Login} />
            <PrivateRoute parameter="homepage" path="/home" component={Home} />

            <Route render={props => <h1>Not Found</h1>} />
          </Switch>
        </BrowserRouter>

        <NotificationContainer/>
      </React.Fragment>
    );
  }
}

export default App;
