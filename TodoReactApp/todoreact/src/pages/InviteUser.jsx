import { React, axios, config } from "../Helpers/ImportHelper";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Button, Checkbox, Form, Grid, Segment, Dropdown } from "semantic-ui-react";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FileBase64 from "react-file-base64";
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

class InviteUser extends React.Component {
	constructor(props) {
		super(props);
		this.pond = React.createRef();
		this.state = {
			FirstName: "",
			LastName: "",
			Email: "",
			Phone: "",
	
		};
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
        this.previewFile();
		this.ajax(this.state);
	};

	ajax(state) {
		axios({
			method: "POST",
			url: config.apiUrl + "Users/register",
			data: {
				firstName: state.FirstName,
				lastName: state.LastName,
				email: state.Email,
				phone: state.Phone,
			},
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {});
	}
	
	render = () => {
        
		return (
			<Grid columns={3}>
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
									<br />
								</Form.Field>
								<Button type="submit">Submit</Button>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	};
}
export default InviteUser;
