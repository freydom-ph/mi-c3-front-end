import { combineReducers, applyMiddleware } from "redux";

import people from "../reducers/people.js";
import app from "../reducers/app.js";

export default combineReducers({
	people,
	app
});
