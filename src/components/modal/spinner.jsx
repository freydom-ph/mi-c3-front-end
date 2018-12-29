import React, { PureComponent } from "react";

import "./spinner.scss";

export default class Spinner extends PureComponent {
	render() {
		const { loading } = this.props;

		if (!loading) {
			return null;
		}

		return (
			<div className="modal-background">
				<div className="spinner-wrapper">
					<i className="fas fa-spinner" />
					<span>L O A D I N G</span>
				</div>
			</div>
		);
	}
}
