// import API from "../../components/api/API";
import axios from "axios";
// import Router from "next/router";
import {
    DOCTOR_GET_DATA_SUCCESS,
    DOCTOR_GET_DATA_ERROR
} from "../constants";
// import Notification from "../../components/notification/Notification";
import API from "../../helper/API";

export const fetchDoctorsData = (id) => async (dispatch) => {
    try {
        const { data, status, code } = await API.post("/call/getWebDoctors", {
            parent_user_id: id,
        });
        if (data?.success) {
            dispatch({
                type: DOCTOR_GET_DATA_SUCCESS,
                payload: data?.data?.data,
            });
        }
    } catch (error) {
        dispatch({
            type: DOCTOR_GET_DATA_ERROR,
        });
    }
};

