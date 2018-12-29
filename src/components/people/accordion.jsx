import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat from "dateFormat";
import axios from "axios";

import { getFilteredList } from "../../redux/actions/people.js";
import { toggleModal } from "../../redux/actions/app.js";
import { isRequesting, isRequestingEnd } from "../../redux/actions/app";

import "./accordion.scss";

class Accordion extends Component {
	constructor() {
		super();

		this.state = {
			vehicles: [],
			vehicleData: []
		};

		this.generateList = this.generateList.bind(this);
		this.filterOnClickHanlder = this.filterOnClickHanlder.bind(this);
		this.filterKeyUpHandler = this.filterKeyUpHandler.bind(this);
		this.subAccordionClick = this.subAccordionClick.bind(this);
		this.accordionOnClick = this.accordionOnClick.bind(this);
		this.buildVehicleContents = this.buildVehicleContents.bind(this);
	}

	filterOnClickHanlder() {
		const {
			state: { filterValue },
			props: { getFilteredList }
		} = this;

		this.setState({ vehicles: {}, activeAccordion: null });
		getFilteredList(filterValue || "");
	}

	filterKeyUpHandler(event) {
		this.setState({
			filterValue: event.target.value
		});
	}

	subAccordionClick(event) {
		const { isRequesting, isRequestingEnd } = this.props;
		const vehicles = event.target.dataset.vehicles;
		const id = event.target.dataset.id;

		if (vehicles.length > 0) {
			let vehicleURLs = vehicles.split(",");

			let vehicleData = [];
			let promises = [];

			vehicleURLs.forEach(url => {
				isRequesting();
				promises.push(
					axios.get(url).then(response => {
						vehicleData.push(response.data);
					})
				);
			});

			Promise.all(promises).then(values => {
				isRequestingEnd();
				this.setState({ vehicles: { [id]: { vehicleData } } });
			});
		} else if (vehicles.length === 0) {
			this.setState({ vehicles: { [id]: { vehicleData: [] } } });
		}
	}

	accordionOnClick(event) {
		let id = event.target.dataset.id;
		// This will toggle the accordion
		if (this.state.activeAccordion === id) {
			id = null;
		}

		this.setState({ activeAccordion: id });
	}

	generateList() {
		const {
			props: { list },
			state: { activeAccordion },
			vehicleButtonOnClick,
			subAccordionClick,
			buildVehicleContents
		} = this;

		const activeIndex = parseInt(activeAccordion);

		return list.map((person, index) => {
			return (
				<div key={`accordion-${index}`} className="accordion">
					<div
						className="accordion-header"
						data-id={index}
						onClick={this.accordionOnClick}
					>
						<span className="name">{person.name}</span>
						<i
							className={`fas fa-chevron-right ${
								activeIndex === index ? "animate--down" : ""
							}`}
						/>
					</div>
					<div
						className={`details ${
							activeIndex === index ? "details--open" : ""
						}`}
					>
						<div className="detail-item">
							<span className="label">Height</span>
							<span>{person.height}</span>
						</div>
						<div className="detail-item">
							<span className="label">Mass</span>
							<span>{person.mass}</span>
						</div>
						<div className="detail-item">
							<span className="label">Gender</span>
							<span>{person.gender}</span>
						</div>
						<div className="detail-item">
							<span className="label">Edited</span>
							<span>
								{dateFormat(
									person.edited,
									"mmm d, yyyy, h:MM:ss TT"
								)}
							</span>
						</div>
						<div
							className="accordion-subheader"
							data-vehicles={person.vehicles}
							data-id={index}
							onClick={subAccordionClick}
						>
							<span className="label">Show Vehicles</span>
							<i className="fas fa-list" />
						</div>
						<div className="vehicle-list">
							{buildVehicleContents(index)}
						</div>
					</div>
				</div>
			);
		});
	}

	buildVehicleContents(index) {
		const data = this.state.vehicles[index];

		if (!data) {
			return;
		}

		const { vehicleData } = data;

		if (vehicleData.length === 0) {
			return (
				<div className="no-data-wrapper">
					<span className="no-data center">No Data</span>
				</div>
			);
		}

		return vehicleData.map((vehicle, index) => {
			return (
				<div key={`vehicle-${index}`} className="vehicle-wrapper">
					<div className="counter">
						<span>{index + 1}</span>
					</div>
					<div className="details-wrapper">
						<div className="detail-item">
							<span class="label">Name</span>
							<span>{vehicle.name}</span>
						</div>
						<div className="detail-item">
							<span class="label">Model</span>
							<span>{vehicle.model}</span>
						</div>
						<div className="detail-item">
							<span class="label">Manufacturer</span>
							<span>{vehicle.manufacturer}</span>
						</div>
						<div className="detail-item">
							<span class="label">Class</span>
							<span>{vehicle.vehicle_class}</span>
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		const {
			props: { showModal },
			state: { vehicles }
		} = this;

		return (
			<div className="people-list-container--accordion">
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
				<div className="accordion-list">{this.generateList()}</div>
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
	toggleModal,
	isRequesting,
	isRequestingEnd
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Accordion);
