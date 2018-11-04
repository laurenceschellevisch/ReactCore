import { React, axios, config } from "../Helpers/ImportHelper";
import Todos from "../components/todo";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Label, Menu, Table, Modal } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import FixedMenuLayout from "../components/layout";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			todos: [],
			edittodo: false,
			addtodo: false,
			id: ""
		};
		this.onClick = this.handleClick.bind(this);
	}
	componentDidMount = () => {
		//get the todo do display in the homescreen
		var ajax = axios({
			method: "get",
			url: config.apiUrl + "todoes/Gettodos/" + JSON.parse(localStorage.getItem("authenticationData")).email,
			data: {},
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.data;
			})
			.catch(error => {
				return error;
			});
		ajax.then(data => {
			console.log(data);
			this.setState({
				todos: data //puts the todo data in the state
			});
		});
	};
	handleClick(event) {
		this.setState({
			[event.target.name]: true
		});
	}
	redirectAdd = () => {
		if (this.state.addtodo) {
			return <Redirect to="/addtodo" />;
		}
	};
	redirectEdit = () => {
		if (this.state.edittodo) {
			return <Redirect to={{ pathname: "/edittodo", state: { id: this.state.id } }} />;
		}
	};
	render() {
		const { open } = this.state;
		return (
			<React.Fragment>
				<FixedMenuLayout>
					{this.redirectEdit()}
					{this.redirectAdd()}
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Id</Table.HeaderCell>
								<Table.HeaderCell>Todo</Table.HeaderCell>
								<Table.HeaderCell>Edit</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						{this.state.todos.map(todo => {
							return (
								//loops tododata from the state
								<Todos
									id={todo["id"]}
									description={todo["description"]}
									onClick={result => {
										this.setState({ id: result, edittodo: true });
									}}
								/>
							);
						})}
					</Table>

					<Button name="addtodo" onClick={this.onClick}>
						Add
					</Button>
				</FixedMenuLayout>
			</React.Fragment>
		);
	}
}
export default Home;
