export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const IS_REQUESTING = "IS_REQUESTING";
export const IS_REQUESTING_END = "IS_REQUESTING_END";

export const toggleModal = showModal => {
	return {
		type: TOGGLE_MODAL,
		data: showModal
	};
};

export const isRequesting = () => {
	return {
		type: IS_REQUESTING
	};
};

export const isRequestingEnd = () => {
	return {
		type: IS_REQUESTING_END
	};
};
