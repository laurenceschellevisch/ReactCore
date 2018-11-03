import { React, axios, config } from "../Helpers/ImportHelper";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Label, Menu, Table, TextArea } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import FixedMenuLayout from "../components/layout";

class Addtodo extends React.Component {
	constructor() {
		super();
		this.state = {
			todo: "",
			redirect: false
		};
	}
	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	handleSubmit = () => {
		var ajax = axios({
			method: "post",
			url: config.apiUrl + "todoes/addtodo",
			data: { email: JSON.parse(localStorage.getItem("authenticationData")).email, todoDesc: this.state.todo },
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
				console.log(error);
				return error;
			});
		ajax.then(response => {
			this.setState({ redirect: true });
		});
	};
	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/Home" />;
		}
	};
	render = () => {
		return (
			<React.Fragment>
				<FixedMenuLayout>
					<Grid>
						{this.renderRedirect()}

						<Grid.Row>
							<Grid.Column>
								<Segment>
									<Form onSubmit={this.handleSubmit}>
										<Form.Field>
											<TextArea placeholder="Todo" label="Todo Description:" required name="todo" defaultValue={this.state.todo} onChange={this.handleInputChange} />
										</Form.Field>
										<Button type="submit">Submit</Button>
									</Form>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</FixedMenuLayout>
			</React.Fragment>
		);
	};
}
export default Addtodo;
