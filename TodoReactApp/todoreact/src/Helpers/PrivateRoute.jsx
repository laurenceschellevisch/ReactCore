import { React, axios, config } from "../Helpers/ImportHelper";
import { Route, Redirect } from "react-router-dom";
import Auth from "../Auth";

const PrivateRoute = ({ component: Component, role, logout, parameter, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!Auth.isLoggedIn(logout)) {
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
            }

            if (
                JSON.parse(localStorage.getItem("authenticationData")) &&
                Date.now() > Date.parse(JSON.parse(localStorage.getItem("authenticationData")).expiredate)
            ) {
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
                            if (response.status === 200) {
                                localStorage.setItem("authenticationData", JSON.stringify(response.data));
                            }
                            return true;
                        })
                        .catch(error => {
                            error.response && error.response.data
                                ? alert(error.response.data)
                                : alert("there is an server error, please try again later!");
                            error.response && error.response.data && error.response.status === 440 ? window.location.reload() : console.log();
                            return false;
                        })
                ) {
                    //ajax call returns true
                    return <Component {...props} />;
                }
            } else if (
                JSON.parse(localStorage.getItem("authenticationData")) &&
                Date.now() < Date.parse(JSON.parse(localStorage.getItem("authenticationData")).expiredate)
            ) {
                return <Component {...props} />;
            } else {
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
