// import API from "../../components/api/API";
import axios from "axios";
// import Router from "next/router";
import {
    PATEINT_GET_DATA_SUCCESS,
    PATEINT_GET_DATA_ERROR
} from "../constants";
// import Notification from "../../components/notification/Notification";
import API from "../../helper/API";

export const fetchPateintData = (id) => async (dispatch) => {
    try {
        const { data, status, code } = await API.post("/call/getWebPatients", {
            parent_user_id: id,
        });
        if (data?.success) {
            dispatch({
                type: PATEINT_GET_DATA_SUCCESS,
                payload: data?.data?.data,
            });
        }
    } catch (error) {
        dispatch({
            type: PATEINT_GET_DATA_ERROR,
        });
    }
};

