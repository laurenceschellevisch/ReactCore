import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Helpers/PrivateRoute";
import "semantic-ui-css/semantic.min.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Addtodo from "./components/addtodo";
import Edittodo from "./components/edittodo";
import Home from "./pages/Home";

class App extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<BrowserRouter>
					<Switch>
						{/* authentication pages */}
						<Route exact path="/" component={Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" render={props => <Register {...props} />} />
						<PrivateRoute logout="true" path="/logout" component={Login} />
						<PrivateRoute path="/Home" component={Home} />
						<PrivateRoute exact path="/addtodo" component={Addtodo} />
						<PrivateRoute exact path="/edittodo" component={Edittodo} />} />
						<Route render={props => <h1>Not Found</h1>} />
					</Switch>
				</BrowserRouter>
				<NotificationContainer />
			</React.Fragment>
		);
	}
}

export default App;
