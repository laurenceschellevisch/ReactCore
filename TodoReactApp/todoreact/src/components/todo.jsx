import { React, axios, config } from "../Helpers/ImportHelper";
class Todos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
	}
	componentDidMount = () => {
		console.log(JSON.parse(localStorage.getItem("authenticationData")));
		var ajax = axios({
			method: "Post",
			url: config.apiUrl + "todoes/Gettodo",
			data: { email: JSON.parse(localStorage.getItem("authenticationData")).email },
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response);
				return response.data;
			})
			.catch(error => {
				return error;
			});
		ajax.then(response => {
			this.setState({
				todos: response
			});
		});
	};

	render = () => {
		console.log(this.state.todos);
		return "";
	};
}

export default Todos;
