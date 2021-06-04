import {SEARCH_MOVIE_FAILED,SEARCH_MOVIE_SUCCESS,SEARCH_MOVIE_REQUEST} from "../constants/searchMovie.constant";
const initialState = {
    loading : null,
    movieSearch :[],
    error : null,
}

const movieSearch = (state = initialState, action) => {
    let {type,payload} = action;
    switch (type) {

    case SEARCH_MOVIE_REQUEST:
        state.loading = true;
        state.movieSearch = [];
        state.error = null;
        return { ...state}

    case SEARCH_MOVIE_SUCCESS:
        state.loading = null;
        state.movieSearch = payload;
        state.error = null;
        return { ...state}

    case SEARCH_MOVIE_FAILED:
        state.loading = null;
        state.movieSearch = [];
        state.error = payload;
        return { ...state}

    default:
        return state
    }
}
export default movieSearch;