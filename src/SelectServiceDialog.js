// SelectServiceDialog.jsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from '@mui/material';

const SelectServiceDialog = ({ open, onClose, selectedValue, handleChange, onSubmit }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Service</DialogTitle>
            <DialogContent>
                <DialogContentText>Do You want to Start case</DialogContentText>
                <RadioGroup name="caseType" value={selectedValue} onChange={handleChange}>
                    <FormControlLabel value="without_vital" control={<Radio />} label="Without Vital" />
                    <FormControlLabel value="with_vital_package" control={<Radio />} label="With Vital and Package" />
                    <FormControlLabel value="independent_vital" control={<Radio />} label="Independent Vital" />
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">CANCEL</Button>
                <Button onClick={onSubmit} color="primary">OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SelectServiceDialog;
