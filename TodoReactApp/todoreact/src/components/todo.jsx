import { React, axios, config } from "../Helpers/ImportHelper";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Label, Menu, Table } from "semantic-ui-react";

class Todos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refresh: ""
		};
	}

	handleClick = e => {
		if (e.target.name == "delete") {
			var ajax = axios({
				method: "post",
				url: config.apiUrl + "todoes/Deletetodo",
				data: {
					id: e.target.id,
					email: JSON.parse(localStorage.getItem("authenticationData")).email
				},
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					window.location.reload();
					return response.data;
				})
				.catch(error => {
					return error;
				});
		} else {
			this.props.onClick(e.target.name);
		}
	};
	render = () => {
		return (
			<Table.Row>
				<Table.Cell>
					<Label>{this.props.id}</Label>
				</Table.Cell>
				<Table.Cell>
					<Label>{this.props.description}</Label>
				</Table.Cell>
				<Table.Cell>
					<Button onClick={this.handleClick} id={this.props.id} name="edit">
						edit
					</Button>
					<Button onClick={this.handleClick} id={this.props.id} name="delete">
						delete
					</Button>
				</Table.Cell>
			</Table.Row>
		);
	};
}

export default Todos;
