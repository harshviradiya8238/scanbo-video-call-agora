import React, { useEffect, useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import { useSelector, useDispatch } from "react-redux";
import { stopRecording } from '../store/videoCall/Action';
import AgoraRTC from 'agora-rtc-sdk-ng';

function VideoCallComponent({ setVideoCallConfig, doctor_id }) {
    const dispatch = useDispatch();

    const cname = useSelector((state) => state?.videoCallReducer?.resourceId?.cname);
    const sid = useSelector((state) => state?.videoCallReducer?.callDetails?.sid);
    const uid = useSelector((state) => state?.videoCallReducer?.resourceId?.uid);
    const resourceId = useSelector((state) => state?.videoCallReducer?.callDetails?.resourceId);
    const { currentCaseId } = useSelector((state) => state?.caseReducer);
    const [callActive, setCallActive] = useState(true);

    const handleEndCall = async () => {
        console.log("Ending call...");
        await dispatch(stopRecording(cname, uid, sid, resourceId, doctor_id, currentCaseId));
        setVideoCallConfig(false);
        setCallActive(false);
    };

    const callbacks = {
        EndCall: handleEndCall,
    };

    const rtcProps = {
        appId: '85fd7235064249f0a0997a368d7a24d6',
        channel: cname ? cname : "", // your agora channel
        enableScreensharing: true,
        token: null // use null or skip if using app in testing mode
    };

    useEffect(() => {
        const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

        const handleUserLeft = (user) => {
            console.log('Remote user left the channel', user);
            handleEndCall();
        };

        const handleUserOffline = (user, reason) => {
            console.log('Remote user went offline', user, 'Reason:', reason);
            handleEndCall();
        };

        client.on('user-left', handleUserLeft);
        client.on('user-offline', handleUserOffline);

        client.join(rtcProps.appId, rtcProps.channel, rtcProps.token, null).then((uid) => {
            console.log('Local user joined with uid:', uid);
        }).catch((err) => {
            console.error('Failed to join the channel', err);
        });

        return () => {
            // Cleanup event listeners on component unmount
            client.off('user-left', handleUserLeft);
            client.off('user-offline', handleUserOffline);
            client.leave().then(() => {
                console.log('Left the channel successfully');
            }).catch((err) => {
                console.error('Failed to leave the channel', err);
            });
        };
    }, [rtcProps.appId, rtcProps.channel, rtcProps.token]);

    return (
        <div style={{ display: 'flex', width: '80vw', height: '80vh' }}>
            {callActive && (
                <AgoraUIKit
                    rtcProps={rtcProps}
                    callbacks={callbacks}
                // ...other props you need to pass to the AgoraUIKit
                />
            )}
        </div>
    );
}

export default VideoCallComponent;
