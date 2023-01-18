import { SET_USER_DETAILS, SET_USER_TICKETS } from "./types";

export const setUserDetails = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: SET_USER_DETAILS,
            payload: payload
        })
    }
};

export const setMyTicket = (payload) => {
    return async (dispatch) => {
        dispatch({
            type: SET_USER_TICKETS,
            payload: payload
        })
    }
};