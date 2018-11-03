import React from "react";
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class FixedMenuLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			home: false,
			logout: false
		};
		this.onClick = this.handleClick.bind(this);
	}
	handleClick = event => {
		event.target.text == "logout" ? this.setState({ logout: true }) : this.setState({ home: true });
	};
	renderRedirect = () => {
		if (this.state.home) {
			return <Redirect to="/Home" />;
		}
	};
	renderLogout = () => {
		if (this.state.logout) {
			return <Redirect to="/logout" />;
		}
	};
	render = () => {
		return (
			<React.Fragment>
				{this.renderRedirect()}
				{this.renderLogout()}
				<Menu fixed="top" inverted>
					<Container>
						<Menu.Item as="a" name="home" onClick={this.onClick} header>
							React Todo List
						</Menu.Item>
						<Menu.Item as="a" name="home" onClick={this.onClick}>
							Home
						</Menu.Item>
						<Menu.Item as="a" name="logout" onClick={this.onClick}>
							logout
						</Menu.Item>
					</Container>
				</Menu>

				<Container text style={{ marginTop: "7em" }}>
					<Header as="h1">Hi {JSON.parse(localStorage.getItem("authenticationData")).email}!</Header>
					{this.props.children}
				</Container>

				<Segment
					inverted
					vertical
					style={{
						margin: "5em 0em 0em",
						padding: "5em 0em",
						position: "fixed",
						left: "0",
						bottom: "0",
						width: "100%"
					}}
				>
					<Container textAlign="center">
						<Divider inverted section />
						<List horizontal inverted divided link>
							<List.Item as="a" href="#">
								Contact Us
							</List.Item>
							<List.Item as="a" href="#">
								Terms and Conditions
							</List.Item>
							<List.Item as="a" href="#">
								Privacy Policy
							</List.Item>
						</List>
					</Container>
				</Segment>
			</React.Fragment>
		);
	};
}

export default FixedMenuLayout;
