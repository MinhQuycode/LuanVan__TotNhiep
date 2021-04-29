import { GET_MOVIE_LIST_REQUEST,GET_MOVIE_LIST_SUCCESS,GET_MOVIE_LIST_FAILED } from "../constants/movie.constant";

const initialState = {
    loading :false,
    movieList : [],
    error : null,
}

const movieReducer = (state = initialState, action) => {
    let {type,payload} = action;
    switch (type) {
    case GET_MOVIE_LIST_REQUEST:
        state.loading = true;
        state.movieList = null;
        state.error = null;
        return { ...state}

    case GET_MOVIE_LIST_SUCCESS:
        state.loading = false;
        state.movieList = payload;
        state.error = null;
        return { ...state}

    case GET_MOVIE_LIST_FAILED:
        state.loading = false;
        state.movieList = null;
        state.error = payload;
        return { ...state}    

    default:
        return state
    }
}
export default movieReducer;