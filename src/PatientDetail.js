import React, { useState } from 'react'
import {
    Container, Grid, Paper, TextField, Button, Typography, Switch, Avatar, Card,
    CardActionArea, FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SelectServiceDialog from './SelectServiceDialog';
import CustomTextField from './components/CustomTextField';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { clearCurrentCase, setCurrentCase } from './store/case/Action';

const StyledCard = styled(Card)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(1),
}));
export default function PatientDetail() {

    const dispatch = useDispatch();

    const { id } = useParams();
    const currentCaseId = useSelector(state => state.caseReducer.currentCaseId);
    const pateintList = useSelector((state) => state?.pateintReducer?.pateintList);

    const patientDetails = pateintList.find(p => {
        return p.id === Number(id)
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedValue, setSelectedValue] = useState('without_vital');
    const isCaseOpen = currentCaseId === Number(id);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleToggleCase = () => {
        if (currentCaseId && currentCaseId !== Number(id)) {
            alert('Please close the previous case before opening a new one.');
        } else {
            if (isCaseOpen) {
                dispatch(clearCurrentCase());
            } else {
                handleOpenDialog(); // Open the dialog to choose case options
            }
        }
    };


    const handleDialogSubmit = () => {
        setOpenDialog(false);
        dispatch(setCurrentCase(Number(id))); // Set the current case in Redux
        alert('Your case is open. You can go to the video call tab.');
    };


    return (
        <div>
            <Container>
                <Paper sx={{
                    padding: 3,
                    background: "#e5edf5",
                    borderRadius: "20px",
                    boxShadow:
                        "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF inset",
                }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between" flexDirection="column">

                        <Grid item>
                            <Avatar variant="rounded" sx={{ backgroundColor: 'transparent', height: 100, width: 100, borderRadius: "50%" }}>
                                {/* Replace with your planet image */}
                                <img src="https://picsum.photos/200/300" alt="Planet" />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{patientDetails?.first_name}{patientDetails?.last_name}</Typography>
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                sx={{ mb: 4 }}
                                control={
                                    <Switch
                                        checked={isCaseOpen} // Controlled by the new state
                                        onChange={handleToggleCase}
                                        name="openCase"
                                        color="primary"
                                    />} label="Open Case"
                            />


                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="center">

                        {/* Form Fields */}
                        <Grid item xs={6}>
                            <CustomTextField

                                disabled placeholder="Mobile" fullWidth defaultValue="+91 8097117255" value={patientDetails?.mobile_no}
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField disabled placeholder="Email" fullWidth defaultValue="mayur@gmail.com" value={patientDetails?.email} />
                        </Grid>

                        {/* Repeat for each field */}
                        <Grid item xs={6}>
                            <CustomTextField disabled placeholder="Dob" fullWidth defaultValue="29" value={patientDetails?.date_of_birth} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField disabled placeholder="Age" fullWidth value={patientDetails?.age} />
                        </Grid>

                        {/* ... */}

                        <Grid item xs={12}>
                            <CustomTextField disabled placeholder="Address 1" fullWidth defaultValue="mumbai" value={patientDetails?.address_one} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField disabled placeholder="Address 2" fullWidth defaultValue="mumbai" value={patientDetails?.address_two} />
                        </Grid>

                        {/* ... */}

                        <Grid item xs={6}>
                            <CustomTextField disabled placeholder="Pincode" fullWidth defaultValue="400065" value={patientDetails?.pincode} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField disabled placeholder="City" fullWidth defaultValue="MUMBAI" value={patientDetails?.city} />
                        </Grid>

                        {/* ... */}

                        <Grid item xs={6}>
                            <CustomTextField disabled placeholder="State" fullWidth defaultValue="MAHARASHTRA" value={patientDetails?.state} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField disabled placeholder="Country" fullWidth defaultValue="INDIA" value={patientDetails?.country} />
                        </Grid>

                        {/* ... */}

                        <Grid item xs={4}>
                            <CustomTextField disabled placeholder="Gender" fullWidth defaultValue="M" value={patientDetails?.gender} />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField disabled placeholder="Weight" fullWidth defaultValue="89" value={patientDetails?.weight} />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField disabled placeholder="Height(cm)" fullWidth defaultValue="159" value={patientDetails?.height} />
                        </Grid>

                        {/* Submit Button */}
                        {/* <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button variant="contained" color="primary" >
                                Submit
                            </Button>
                        </Grid> */}
                    </Grid>

                    <SelectServiceDialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        selectedValue={selectedValue}
                        handleChange={handleChange}
                        onSubmit={handleDialogSubmit} // Pass the new submit handler

                    />
                </Paper>
            </Container>
        </div>
    )
}
