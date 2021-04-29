import axios from "axios";
import { GET_MOVIE_LIST_SUCCESS,GET_MOVIE_LIST_REQUEST,GET_MOVIE_LIST_FAILED } from "../constants/movie.constant"

export const getMovieListActionSuccess = (movieList) =>{
    return {
        type : GET_MOVIE_LIST_SUCCESS,
        payload : movieList,
    }
};
export const getMovieListActionRequest = () =>{
    return {
        type : GET_MOVIE_LIST_REQUEST,
    }
};
export const getMovieListActionFailed = (error) =>{
    return {
        type : GET_MOVIE_LIST_FAILED,
        payload : error,
    }
};

export const getMovieListAPI = () =>{
    return async(dispatch) =>{
        dispatch(getMovieListActionRequest());
        try {
            const res = await axios({
                method :"GET",
                url :"http://localhost:8000/api/movies"
            });
            //Chuyển dữ liệu lên store
            dispatch(getMovieListActionSuccess(res.data));
        } catch(error){
            dispatch(getMovieListActionFailed(error));
        }
    }
}