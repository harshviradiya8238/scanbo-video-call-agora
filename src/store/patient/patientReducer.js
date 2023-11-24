import {

  PATEINT_GET_DATA_SUCCESS,
  PATEINT_GET_DATA_ERROR,

} from "../constants";

const INIT_STATE = {
  patientList: [],
  loading: false,
  error: "",
  success: "",
};
const patientReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PATEINT_GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        patientList: action.payload,
        error: "",
      };
    case PATEINT_GET_DATA_ERROR:
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

export default patientReducer;
