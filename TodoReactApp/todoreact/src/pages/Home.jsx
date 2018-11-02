import { React, axios, config } from "../Helpers/ImportHelper";
import Todos from "../components/todo";
class Home extends React.Component {
	render() {
		return <Todos />;
	}
}
export default Home;
