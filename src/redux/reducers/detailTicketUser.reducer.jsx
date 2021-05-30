import {GET_INFOR_DETAIL_TICKET_FAILED,GET_INFOR_DETAIL_TICKET_SUCCESS,GET_INFOR_DETAIL_TICKET_REQUEST} from "../constants/inforAccount.constant";
const initialState = {
    loading : null,
    ticket : [],
    error : null,
}

const detailTicketReducer =  (state = initialState, action ) => {
    let { type, payload } = action;
    switch (type) {

    case GET_INFOR_DETAIL_TICKET_REQUEST:
        state.loading = true;
        state.ticket = [];
        state.error = null;
        return { ...state}

    case GET_INFOR_DETAIL_TICKET_SUCCESS:
        state.loading = null;
        state.ticket = payload;
        state.error = null;
        return { ...state}

    case GET_INFOR_DETAIL_TICKET_FAILED:
        state.loading = null;
        state.ticket = [];
        state.error = payload;
        return { ...state}

    default:
        return state
    }
}

export default detailTicketReducer;