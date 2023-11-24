// reducer.js
import { VIDEO_CALL_NOTIFICATION_SENT, VIDEO_CALL_RESOURCE_ID_RECEIVED, VIDEO_CALL_STARTED, VIDEO_CALL_FAILED, VIDEO_CALL_STOP_SUCCESS, VIDEO_CALL_STOP_FAILED } from '../constants';

const initialState = {
    notificationSent: false,
    resourceId: null,
    callDetails: null,
    error: null,
};

export default function videoCallReducer(state = initialState, action) {
    switch (action.type) {
        case VIDEO_CALL_NOTIFICATION_SENT:
            return { ...state, notificationSent: true };
        case VIDEO_CALL_RESOURCE_ID_RECEIVED:
            return { ...state, resourceId: action.payload };
        case VIDEO_CALL_STARTED:
            return { ...state, callDetails: action.payload };
        case VIDEO_CALL_STOP_SUCCESS:
            return { callDetails: action.payload };
        case VIDEO_CALL_STOP_SUCCESS:
            return initialState;

        case VIDEO_CALL_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
