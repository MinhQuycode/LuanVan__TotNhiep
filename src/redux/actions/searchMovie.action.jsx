import {SEARCH_MOVIE_FAILED,SEARCH_MOVIE_SUCCESS,SEARCH_MOVIE_REQUEST} from "./../constants/searchMovie.constant";
import axios from "axios";

export const getMovieSearchSuccess = (movieItem) =>{
    return {
        type : SEARCH_MOVIE_SUCCESS,
        payload : movieItem
    }
}
export const getMovieSearchRequest = () =>{
    return {
        type : SEARCH_MOVIE_REQUEST,
    }
}
export const getMovieSearchFailed = (error) =>{
    return {
        type : SEARCH_MOVIE_FAILED,
        payload : error
    }
}

export const getMovieSearchAPI = (tenPhim,history) =>{
    return async(dispatch) => {
        dispatch(getMovieSearchRequest);
        try{
            const res = await axios({
                method : "POST",
                url : `https://cinemasummary.herokuapp.com/api/search/${tenPhim}`
            })
            if(res.data.length === 1){
                history.push({pathname:`/detail/${res.data[0].id}`})
            }else{
                history.push("/search");
            }
            dispatch(getMovieSearchSuccess(res.data));
        }catch (error) {
            dispatch(getMovieSearchFailed(error));
        }
    }
}