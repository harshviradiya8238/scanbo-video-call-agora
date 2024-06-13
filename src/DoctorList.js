import React, { useEffect, useState } from 'react';
import { Card, CardContent, TextField, IconButton, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { fetchDoctorsData } from './store/doctor/Action';
import { startVideoCallProcess } from './store/videoCall/Action';
import VideoCallComponent from './components/VideoCallComponent';
import { useParams } from 'react-router-dom';
import { setId } from './store/urlId/Action';

const DoctorList = () => {

    // Replace with your state management and event handlers
    const [videoCallConfig, setVideoCallConfig] = useState(false);
    const [doctor_id, setDoctorId] = useState();
    const dispatch = useDispatch();

    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchDoctorsData(id));
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(setId(id)); // Dispatch action to set id in Redux store
        }
    }, [id, dispatch]);

    const [searchTerm, setSearchTerm] = React.useState('');
    const isCaseOpen = useSelector(state => state.caseReducer.isCaseOpen)
    const doctorList = useSelector((state) => state?.doctorReducer?.doctorList);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleVideoCallStart = (doctorId) => {
        console.log(doctorId, "=======");

        if (!isCaseOpen) {
            alert('Please open a case before starting the video call.');
            return;
        }
        setVideoCallConfig(true)
        setDoctorId(doctorId)
        // Proceed with the video call
        dispatch(startVideoCallProcess(id, doctorId));

    };


    const userRole = useSelector((state) => state?.doctorReducer?.doctorList);
    return (
        <div >
            {!videoCallConfig ? (
                <>
                    <div style={{ maxWidth: 345, margin: 'auto' }}>

                        <TextField
                            id="input-with-icon-textfield"
                            label="Search by Doctor's Name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        {doctorList.map((doctor) => (
                            <Card key={doctor.id} variant="outlined" style={{ marginBottom: 2, cursor: "pointer" }}
                                onClick={() => handleVideoCallStart(doctor.id)}
                            >
                                <CardContent style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
                                    <AccountCircleIcon style={{ fontSize: 40, marginRight: 16 }} />
                                    <div>{doctor.name}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </>

            ) :

                <VideoCallComponent
                    setVideoCallConfig={setVideoCallConfig}
                    doctor_id={doctor_id}
                />

            }
        </div >
    );
};

export default DoctorList;
