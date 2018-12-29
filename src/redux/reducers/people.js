import { UPDATE_LIST } from "../actions/people.js";

const initialState = {
	list: []
};

export default (state = initialState, action) => {
	const { type, data } = action;

	switch (type) {
		case UPDATE_LIST: {
			return {
				...state,
				loading: false,
				list: [...data]
			};
		}
		default:
			return state;
	}
};
