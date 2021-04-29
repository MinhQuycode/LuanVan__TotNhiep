import {GET_INFOR_MOVIE_LIST_SUCCESS,GET_INFOR_MOVIE_LIST_REQUEST,GET_INFOR_MOVIE_LIST_FAILED  } from "../constants/inforMovie.constant";

const initialState = {
    loading :false,
    inforMovie : [],
    error : null,
}

const inforMovieReducer = (state = initialState, action) => {
    let {type,payload} = action;
    switch (type) {
    case GET_INFOR_MOVIE_LIST_REQUEST:
        state.loading = true;
        state.inforMovie = null;
        state.error = null;
        return { ...state}

    case GET_INFOR_MOVIE_LIST_SUCCESS:
        state.loading = false;
        state.inforMovie = payload;
        state.error = null;
        return { ...state}

    case GET_INFOR_MOVIE_LIST_FAILED:
        state.loading = false;
        state.inforMovie = null;
        state.error = payload;
        return { ...state}    

    default:
        return state
    }
}
export default inforMovieReducer;