import {GET_THEATER_LIST_FAILED,GET_THEATER_LIST_REQUEST,GET_THEATER_LIST_SUCCESS} from "../constants/theater.constant";
const initialState = {
    loading : false,
    listTheater : [],
    error : null
}

const theaterReducer = (state = initialState, action) => {
    let {type,payload} = action;
    switch (type) {
    case GET_THEATER_LIST_REQUEST :
        state.loading = true;
        state.listTheater = [];
        state.error = null;
        return { ...state}

    case GET_THEATER_LIST_SUCCESS :
        state.loading = false;
        state.listTheater = payload;
        state.error = null;
        return { ...state}

    case GET_THEATER_LIST_FAILED :
        state.loading = false;
        state.listTheater = [];
        state.error = payload;
        return { ...state}

    default:
        return state
    }
}

export default theaterReducer;