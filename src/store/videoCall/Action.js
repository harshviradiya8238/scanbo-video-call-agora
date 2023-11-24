import {
    VIDEO_CALL_NOTIFICATION_SENT,
    VIDEO_CALL_RESOURCE_ID_RECEIVED,
    VIDEO_CALL_STARTED,
    VIDEO_CALL_FAILED, VIDEO_CALL_STOP_SUCCESS, VIDEO_CALL_STOP_FAILED
} from '../constants';
import API from "../../helper/API";

export const startVideoCallProcess = (senderId, receiverId) => async (dispatch) => {
    try {
        // Notify receiver about the call
        const notificationRes = await API.post('/call/SendwebVideoNotification', { sender_id: senderId, receiver_id: receiverId }, { headers: { "Content-Type": "multipart/form-data" } });

        // Check if the notification was successful
        if (notificationRes.data && notificationRes.data.success) {
            dispatch({
                type: VIDEO_CALL_NOTIFICATION_SENT
            });

            // Generate a random number for UID if needed or fetch from the response
            const randnumber = Math.floor(Math.random() * 900000) + 100000;

            // Get the resource ID from your server
            const resourceResponse = await API.post('/call/getResourceIdForAgora',
                {
                    channel: notificationRes.data.data.randnumber,
                    uid: randnumber
                }
                , { headers: { "Content-Type": "multipart/form-data" }, }
            );

            // Check if the resource ID was received successfully
            if (resourceResponse.data && resourceResponse.data.success) {
                dispatch({
                    type: VIDEO_CALL_RESOURCE_ID_RECEIVED,
                    payload: resourceResponse.data.data
                });

                // Start the video call with Agora
                await API.post('/call/startVideoForAgora', {
                    channel: notificationRes.data.data.randnumber,
                    uid: randnumber,
                    resource: resourceResponse.data.data.resourceId
                }, { headers: { "Content-Type": "multipart/form-data" }, }).then((startCallResponse) => {
                    const { data } = startCallResponse
                    if (data.data && data.success) {
                        dispatch({
                            type: VIDEO_CALL_STARTED,
                            payload: data.data
                        });
                    } else {
                        throw new Error('Failed to start video call');
                    }
                });

                // Check if the call started successfully

            } else {
                throw new Error('Failed to get resource ID');
            }
        } else {
            throw new Error('Failed to send notification');
        }
    } catch (error) {
        console.error("Error in video call process:", error);
        dispatch({
            type: VIDEO_CALL_FAILED,
            payload: error.message
        });
    }
};

export const stopRecording = (channel, uid, sid, resource, doctor_id, patient_id) => async (dispatch) => {

    try {
        const stopRecordingResponse = await API.post('/call/stopVideoForAgora', { channel, uid, sid, resource, doctor_id, patient_id }, { headers: { "Content-Type": "multipart/form-data" } });
        dispatch({
            type: VIDEO_CALL_STOP_SUCCESS,
            payload: stopRecordingResponse.data.data
        });
    } catch (error) {
        dispatch({
            type: VIDEO_CALL_STOP_FAILED,
            payload: error.message
        });
    }
}
