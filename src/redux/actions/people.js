import axios from "axios";
import { isRequesting, isRequestingEnd } from "./app.js";

export const UPDATE_LIST = "UPDATE_LIST";

const fetchList = dispatch => {
	dispatch(isRequesting());
	return axios.get("https://swapi.co/api/people/");
};

const fetchFilteredList = (filter, dispatch) => {
	dispatch(isRequesting());
	return axios.get(`https://swapi.co/api/people/?search=${filter}`);
};

const updateList = list => {
	return {
		type: UPDATE_LIST,
		data: list
	};
};

export const getList = () => {
	return dispatch => {
		fetchList(dispatch).then(response => {
			if (response && response.data && response.data.results) {
				dispatch(updateList(response.data.results));
				dispatch(isRequestingEnd());
			}
		});
	};
};

export const getFilteredList = filter => {
	return dispatch => {
		fetchFilteredList(filter, dispatch).then(response => {
			if (response && response.data && response.data.results) {
				dispatch(updateList(response.data.results));
				dispatch(isRequestingEnd());
			}
		});
	};
};
