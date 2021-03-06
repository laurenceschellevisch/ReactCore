import { React, axios, config } from "../Helpers/ImportHelper";
import { Route, Redirect } from "react-router-dom";
import Auth from "../Auth";

const PrivateRoute = ({ component: Component, role, logout, parameter, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			//checks if you are logging out
			if (!Auth.isLoggedIn(logout)) {
				return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
			}

			if (JSON.parse(localStorage.getItem("authenticationData")) && Date.now() > Date.parse(JSON.parse(localStorage.getItem("authenticationData")).expiredate)) {
				// checks if you are still verified to login
				if (
					axios({
						method: "post",
						url: config.apiUrl + "Users/refreshAccessToken",
						data: { refreshToken: JSON.parse(localStorage.getItem("authenticationData")).refreshtoken },
						withCredentials: true,
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Content-Type": "application/json"
						}
					})
						.then(response => {
							console.log(response.status);
							localStorage.setItem("authenticationData", JSON.stringify(response.data));
							return true;
						})
						.catch(error => {
							console.log("error");
							error.response && error.response.data ? alert(error.response.data) : alert("there is an server error, please try again later!");
							error.response && error.response.data && error.response.status === 440 ? window.location.reload() : console.log();
							return false;
						})
				) {
					//ajax call returns true
					return <Component {...props} />;
				}
			} else if (
				JSON.parse(localStorage.getItem("authenticationData")).email &&
				JSON.parse(localStorage.getItem("authenticationData")).token &&
				JSON.parse(localStorage.getItem("authenticationData")).refreshtoken &&
				Date.now() < Date.parse(JSON.parse(localStorage.getItem("authenticationData")).expiredate) //checks if the localstorage is filled
			) {
				return <Component {...props} />;
			} else {
				// else redirects to the login page
				localStorage.clear();
				sessionStorage.clear();
				alert("uw sessie is verlopen!");
				return (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location }
						}}
					/>
				);
			}
		}}
	/>
);

export default PrivateRoute;
