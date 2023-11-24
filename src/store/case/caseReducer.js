// caseReducer.js
import { SET_CASE_OPEN, SET_CURRENT_CASE, CLEAR_CURRENT_CASE } from '../constants';

const initialState = {
    isCaseOpen: false,
    currentCaseId: null
};

const caseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CASE_OPEN:
            return {
                ...state,
                isCaseOpen: action.payload,
            };
        case SET_CURRENT_CASE:
            return {
                ...state,
                currentCaseId: action.payload,
                isCaseOpen: true // Set isCaseOpen to true when a case is set
            };
        case CLEAR_CURRENT_CASE:
            return {
                ...state,
                currentCaseId: null,
                isCaseOpen: false // Set isCaseOpen to false when a case is cleared
            };
        default:
            return state;
    }
};

export default caseReducer;
