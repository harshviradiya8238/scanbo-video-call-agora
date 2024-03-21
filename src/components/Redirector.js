// src/Redirector.js
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setId } from '../store/urlId/Action';
// import { setId } from '.'; // Assuming you have this action

const Redirector = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(setId(id)); // Dispatch action to set id in Redux store
        }
    }, [id, dispatch]);

    return <Navigate to={`/patient/${id}`} />;
};

export default Redirector;
