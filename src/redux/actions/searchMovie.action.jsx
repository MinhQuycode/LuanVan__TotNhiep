import {SEARCH_MOVIE_FAILED,SEARCH_MOVIE_SUCCESS,SEARCH_MOVIE_REQUEST} from "./../constants/searchMovie.constant";
import axios from "axios";
import Swal from 'sweetalert2';

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
                method : "GET",
                url : `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09&tenPhim=${tenPhim}`
            })
            history.push({ pathname: `/detail/${res.data[0].maPhim}` })
            dispatch(getMovieSearchSuccess(res.data));
        }catch (error) {
            dispatch(getMovieSearchFailed(error));
            return Swal.fire({
                title: "Không có phim này !!!",
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
              });
        }
    }
}