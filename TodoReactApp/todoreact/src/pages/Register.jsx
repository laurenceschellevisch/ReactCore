import { React, axios, config, NotificationManager } from "../Helpers/ImportHelper";

import { Button, Checkbox, Form, Grid, Segment, Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			FirstName: "",
			LastName: "",
			Email: "",
			password: "",
			password2: "",
			redirect: false
		};

		// this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.state.password === this.state.password2) {
			this.ajax(this.state);
		} else {
			alert("Wachtwoorden komen niet overeen");
		}
	};
	ajax(state) {
		// registers the user in the api that pushes the data to the database
		axios({
			method: "POST",
			url: config.apiUrl + "Users/register",
			data: {
				firstName: state.FirstName,
				lastName: state.LastName,
				email: state.Email,
				pass: state.password
			},
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				NotificationManager.success("sucessfull", "Sucess");

				this.setState({ redirect: true });
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				NotificationManager.error(error.response.data, "Error");
				this.setState({ redirect: false });
			});
	}
	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/login" />;
		}
	};

	render() {
		return (
			<Grid columns={3}>
				{this.renderRedirect()}
				<Grid.Row>
					<Grid.Column />
					<Grid.Column>
						<Segment>
							<Form onSubmit={this.handleSubmit}>
								<Form.Field>
									<Form.Input label="First Name:" required name="FirstName" type="text" defaultValue={this.state.FirstName} onChange={this.handleInputChange} />
									<br />
									<Form.Input label="Last Name:" required name="LastName" type="text" defaultValue={this.state.LastName} onChange={this.handleInputChange} />
									<br />
									<Form.Input label="Email:" required name="Email" type="text" defaultValue={this.state.Email} onChange={this.handleInputChange} />
									<br />
									<Form.Input label="Phone:" required name="Phone" type="text" defaultValue={this.state.Phone} onChange={this.handleInputChange} />
									<Form.Input label="Password:" required name="password" type="password" defaultValue={this.state.password} onChange={this.handleInputChange} />
									<Form.Input label="Repeat password:" required name="password2" type="password" defaultValue={this.state.password2} onChange={this.handleInputChange} />
									<br />
								</Form.Field>
								<Button type="submit">Submit</Button>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
export default Register;
