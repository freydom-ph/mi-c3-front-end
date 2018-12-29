import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

import PeopleList from "./people/index.jsx";
import Accordion from "./people/accordion.jsx";
import Spinner from "./modal/spinner.jsx";

import { getList } from "../redux/actions/people.js";

import "./app.scss";

class App extends React.Component {
	componentDidMount() {
		this.props.getList();
	}

	render() {
		const { loading } = this.props;

		return (
			<div className="app-wrapper">
				<MediaQuery query="(min-width: 1024px)">
					<PeopleList />
				</MediaQuery>
				<MediaQuery query="(max-width: 1023px)">
					<Accordion />
				</MediaQuery>
				<Spinner loading={loading} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { people, app } = state;

	return {
		list: people.list,
		loading: app.loading
	};
};

const mapDispatchToProps = {
	getList
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
