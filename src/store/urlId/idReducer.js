import { SET_ID } from './Action';

const initialState = {
    id: localStorage.getItem('id') || null,
};

const idReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                id: action.payload
            };
        default:
            return state;
    }
};

export default idReducer;
