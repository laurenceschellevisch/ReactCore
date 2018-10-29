class Auth {
    isLoggedIn(logout) {
        if (logout == "true" || !localStorage.getItem("authenticationData")) {
            localStorage.clear();
            sessionStorage.clear();
            return false;
        } else {
            return true;
        }
    }
}
export default new Auth();
