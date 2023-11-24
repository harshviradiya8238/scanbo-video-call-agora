
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
    TextField,
    InputAdornment,
    Chip
} from '@mui/material';
import { fetchPateintData } from './store/pateint/Action';
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CaseOpenIcon from '@mui/icons-material/AssignmentTurnedIn'; // Icon to indicate open case
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icon for the view button


import { useNavigate } from 'react-router-dom';
import CustomTextField from './components/CustomTextField';
const PateintList = () => {
    // Replace with your state management and event handlers
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPateintData());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = React.useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0); // Reset to the first page when the search term changes
    };

    const handlePatientClick = (id) => {
        // Navigate to the patient detail page with the patient's ID
        navigate(`/patient/${id}`);

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const pateintList = useSelector((state) => state?.pateintReducer?.pateintList);
    const { currentCaseId } = useSelector((state) => state.caseReducer);

    const filteredPatients = pateintList.filter(patient =>
        patient.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ margin: 'auto', height: "60vh", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "end" }}>
                {/* <span>Patient List</span> */}
                <CustomTextField
                    id="input-with-icon-textfield"
                    // label="Search by Pateint's Name"
                    value={searchTerm}
                    style={{ width: "30%", marginBottom: "20px" }}
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
            </div>
            <Paper
                sx={{
                    width: '100%', overflow: 'hidden', borderRadius: "20px", backgroundColor: "aliceblue"
                }}

            >

                <TableContainer sx={{ maxHeight: '60vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr.No</TableCell>
                                <TableCell>Profile</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                boxShadow: "4px 2px 8px 0px rgba(95, 157, 231, 0.48) inset, -4px -2px 8px 0px #FFF inset"
                            }}
                        >
                            {filteredPatients
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((patient, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={patient.id} >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <AccountCircleIcon style={{ fontSize: 40 }} />
                                        </TableCell>
                                        <TableCell>{patient.first_name}</TableCell>
                                        <TableCell>
                                            {patient.id === currentCaseId && (
                                                <Chip
                                                    icon={<CaseOpenIcon />}
                                                    label="Case Open"
                                                    color="primary"
                                                    size="small"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <VisibilityIcon onClick={() => handlePatientClick(patient.id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={pateintList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    );
};

export default PateintList;
