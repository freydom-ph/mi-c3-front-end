import React, { Component } from "react";
import { connect } from "react-redux";

import { toggleModal } from "../../redux/actions/app.js";

import "./index.scss";

class Modal extends Component {
	constructor() {
		super();

		this.state = {
			isOpen: false
		};

		this.closeModal = this.closeModal.bind(this);
	}

	closeModal() {
		const { toggleModal, onClose } = this.props;

		toggleModal(false);

		if (onClose) {
			onClose();
		}
	}

	render() {
		const {
			props: { children, showModal, label },
			state: { isOpen },
			closeModal
		} = this;

		if (!showModal) {
			return null;
		}

		return (
			<div className="modal-background">
				<div className="modal">
					<div className="modal-header">
						<div className="modal-header-label">{label}</div>
						<div className="close-button-wrapper">
							<i className="fas fa-times" onClick={closeModal} />
						</div>
					</div>
					<div className="modal-content">{children}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ app }) => {
	return {
		showModal: app.showModal
	};
};

const mapDispatchToProps = {
	toggleModal
};

Modal.defaultProps = {
	label: "Vehicle/s"
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Modal);
