import { SET_USER_DETAILS, SET_USER_TICKETS } from "./types";

const INITIAL_STATE = {
    userName: '',
    mobile: '',
    myTickets: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                userName: action?.payload?.userName,
                mobile: action?.payload?.mobile
            }
        case SET_USER_TICKETS:
            return {
                ...state,
                myTickets: [...state.myTickets, action?.payload?.item],
            }
        default:
            return state;
    }
}

export default reducer;