import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat from "dateFormat";

import VehicleModal from "../modal/vehicle.jsx";

import { getFilteredList } from "../../redux/actions/people.js";
import { toggleModal } from "../../redux/actions/app.js";

import "./index.scss";

class PeopleList extends Component {
	constructor() {
		super();

		this.state = {
			vehicles: []
		};

		this.generateList = this.generateList.bind(this);
		this.filterOnClickHanlder = this.filterOnClickHanlder.bind(this);
		this.filterKeyUpHandler = this.filterKeyUpHandler.bind(this);
		this.vehicleButtonOnClick = this.vehicleButtonOnClick.bind(this);
	}

	filterOnClickHanlder() {
		const {
			state: { filterValue },
			props: { getFilteredList }
		} = this;

		getFilteredList(filterValue || "");
	}

	filterKeyUpHandler(event) {
		this.setState({
			filterValue: event.target.value
		});
	}

	vehicleButtonOnClick(event) {
		this.props.toggleModal(true);

		this.setState({
			vehicles: event.target.dataset.vehicles
		});
	}

	generateList() {
		const {
			props: { list },
			vehicleButtonOnClick
		} = this;

		return list.map((person, index) => {
			return (
				<tr key={`person-${index}`}>
					<td>{person.name}</td>
					<td className="center">{person.height}</td>
					<td className="center">{person.mass}</td>
					<td className="center">{person.gender}</td>
					<td className="center">
						{dateFormat(person.edited, "mmm d, yyyy, h:MM:ss TT")}
					</td>
					<td className="center view-vehicles">
						<a
							href="#"
							onClick={vehicleButtonOnClick}
							data-vehicles={person.vehicles}
							className="button"
						>
							View
						</a>
					</td>
				</tr>
			);
		});
	}

	render() {
		const {
			props: { showModal },
			state: { vehicles }
		} = this;

		return (
			<div className="people-list-container">
				<div className="filter-container">
					<input
						type="text"
						placeholder="Filter"
						onKeyUp={this.filterKeyUpHandler}
					/>
					<i
						className="fas fa-search"
						onClick={this.filterOnClickHanlder}
						placeholder="Filter"
					/>
				</div>
				<table>
					<thead>
						<tr>
							<td className="wide center">Name</td>
							<td className="narrow center">Height</td>
							<td className="narrow center">Mass</td>
							<td className="narrow center">Gender</td>
							<td className="wide center">Edited</td>
							<td className="narrow center">Vehicle/s</td>
						</tr>
					</thead>
					<tbody>{this.generateList()}</tbody>
				</table>
				{showModal && (
					<VehicleModal showModal={showModal} vehicles={vehicles} />
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ people, app }) => {
	return {
		list: people.list,
		showModal: app.showModal
	};
};

const mapDispatchToProps = {
	getFilteredList,
	toggleModal
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PeopleList);
