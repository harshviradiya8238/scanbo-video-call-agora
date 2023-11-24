// Define action types
export const SET_ID = 'SET_ID';

// Action creator for setting the id
export const setId = id => ({
    type: SET_ID,
    payload: id
});
