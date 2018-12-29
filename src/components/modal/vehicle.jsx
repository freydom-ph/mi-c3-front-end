import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { isRequesting, isRequestingEnd } from "../../redux/actions/app";

import Modal from "./index.jsx";

import "./vehicle.scss";

class VehicleModal extends Component {
	constructor() {
		super();

		this.state = {
			vehicleData: []
		};

		this.buildModalContents = this.buildModalContents.bind(this);
	}

	componentDidMount(prevProps) {
		const { vehicles, isRequesting, isRequestingEnd } = this.props;

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
				this.setState({ vehicleData });
			});
		}
	}

	buildModalContents() {
		const { vehicleData } = this.state;

		if (vehicleData.length === 0) {
			return (
				<tr>
					<td colSpan="4" className="no-data center">
						No data
					</td>
				</tr>
			);
		}

		return vehicleData.map((data, index) => {
			return (
				<tr key={`vehicle-modal-${index}`}>
					<td>{data.name}</td>
					<td className="center">{data.model}</td>
					<td className="center">{data.manufacturer}</td>
					<td className="center">{data.vehicle_class}</td>
				</tr>
			);
		});
	}

	render() {
		const {
			props: { showModal }
		} = this;

		return (
			<Modal showModal={showModal}>
				<table className="vehicle-list-table">
					<thead>
						<tr>
							<td>Name</td>
							<td>Model</td>
							<td>Manufacturer</td>
							<td>Class</td>
						</tr>
					</thead>
					<tbody>{this.buildModalContents()}</tbody>
				</table>
			</Modal>
		);
	}
}

const mapStateToProps = ({ app }) => {
	return {
		showModal: app.showModal
	};
};

const mapDispatchToProps = {
	isRequesting,
	isRequestingEnd
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VehicleModal);
