import { GET_CINEMAS_FAILED,GET_CINEMAS_REQUEST,GET_CINEMAS_SUCCESS } from "../constants/cinemas.constant";

const initialState = {
    loading :false,
    cinemasList : [],
    error : null,
}

const cinemasReducer = (state = initialState, action) => {
    let {type,payload} = action;
    switch (type) {
    case GET_CINEMAS_REQUEST:
        state.loading = true;
        state.cinemasList = null;
        state.error = null;
        return { ...state}

    case GET_CINEMAS_SUCCESS:
        state.loading = false;
        state.cinemasList = payload;
        state.error = null;
        return { ...state}

    case GET_CINEMAS_FAILED:
        state.loading = false;
        state.cinemasList = null;
        state.error = payload;
        return { ...state}    

    default:
        return state
    }
}
export default cinemasReducer;