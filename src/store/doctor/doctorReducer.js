import {
    DOCTOR_GET_DATA_SUCCESS,
    DOCTOR_GET_DATA_ERROR,
} from "../constants";

const INIT_STATE = {
    doctorList: [],
    loading: false,
    error: "",
    success: "",
};
const doctorReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case DOCTOR_GET_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                doctorList: action.payload,
                error: "",
            };
        case DOCTOR_GET_DATA_ERROR:
            return {
                ...state,
                loading: false,
                // currentUser: null,
                error: "",
            };
        default:
            return state;
    }
};

export default doctorReducer;
