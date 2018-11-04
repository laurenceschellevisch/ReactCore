import { React, axios, config } from "../Helpers/ImportHelper";
import { Route, Redirect } from "react-router-dom";
import FixedMenuLayout from "../components/layout";

import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Label, Menu, Table, TextArea } from "semantic-ui-react";

class Edittodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: "",
			redirect: false
		};
	}
	componentDidMount = () => {
		//see api documentation
		var ajax = axios({
			method: "get",
			url: config.apiUrl + "Todoes/gettodo/" + this.props.location.state.id,
			data: {},
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
		ajax.then(data => {
			this.setState({
				todo: data[0].description
			});
		}).catch(response => {
			alert(response);
		});
	};

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	handleSubmit = event => {
		var ajax = axios({
			method: "post",
			url: config.apiUrl + "todoes/Edittodo",
			data: {
				email: JSON.parse(localStorage.getItem("authenticationData")).email,
				id: this.props.location.state.id,
				todoDesc: this.state.todo
			},
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
		ajax.then(response => {
			//checks if the data is updated and then get redirected
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
											<TextArea placeholder="Todo" label="Todo Description:" required name="todo" value={this.state.todo} onChange={this.handleInputChange} />
											{/* here  */}
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
export default Edittodo;
