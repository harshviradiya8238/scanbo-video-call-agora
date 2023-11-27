import React from 'react'
import AgoraUIKit from 'agora-react-uikit';
import { useSelector, useDispatch } from "react-redux";
import { stopRecording } from '../store/videoCall/Action';


function VideoCallComponent({ setVideoCallConfig, doctor_id }) {

    const dispatch = useDispatch();

    const { uid, sid, resourceId } = useSelector((state) => state?.videoCallReducer?.callDetails);
    const cname = useSelector((state) => state?.videoCallReducer?.callDetails?.cname);


    const { currentCaseId } = useSelector((state) => state?.caseReducer);

    const callbacks = {
        EndCall: async () => {

            await dispatch(stopRecording(cname, uid, sid, resourceId, doctor_id, currentCaseId));
            setVideoCallConfig(false)
        },
    };
    const rtcProps = {
        appId: '85fd7235064249f0a0997a368d7a24d6',
        channel: cname ? cname : "", // your agora channel
        // uid: Number(callDetails?.uid),
        // enableVideo: true,
        // enableAudio: true,
        enableScreensharing: true,
        // dualStreamMode: true,
        // sid: callDetails?.sid,
        token: null // use null or skip if using app in testing mode
    };

    return (
        <div style={{ display: 'flex', width: '80vw', height: '80vh' }}>
            <AgoraUIKit
                rtcProps={rtcProps}
                callbacks={callbacks}
            // ...other props you need to pass to the AgoraUIKit
            /></div>
    )
}

export default VideoCallComponent