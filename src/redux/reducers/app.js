import { TOGGLE_MODAL, IS_REQUESTING, IS_REQUESTING_END } from "../actions/app.js";

const initialState = {
    showModal: false,
    loading: false,
}

export default (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {
        case IS_REQUESTING: {
            return {
                ...state,
                loading: true
            }
        }
        case IS_REQUESTING_END: {
            return {
                ...state,
                loading: false
            }
        }
        case TOGGLE_MODAL: {
            return {
                ...state,
                showModal: data
            }
        }
        default: {
            return state
        }
    }
}