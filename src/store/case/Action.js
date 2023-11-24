// actions.js
import { SET_CASE_OPEN, SET_CURRENT_CASE, CLEAR_CURRENT_CASE } from '../constants';

export const setCaseOpen = (isOpen) => {
    return {
        type: SET_CASE_OPEN,
        payload: isOpen,
    };
};

export const setCurrentCase = (caseId) => ({
    type: SET_CURRENT_CASE,
    payload: caseId
});

export const clearCurrentCase = () => ({
    type: CLEAR_CURRENT_CASE
});