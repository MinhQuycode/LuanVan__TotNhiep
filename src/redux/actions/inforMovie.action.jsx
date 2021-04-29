import axios from "axios";
import {GET_INFOR_MOVIE_LIST_FAILED,GET_INFOR_MOVIE_LIST_REQUEST,GET_INFOR_MOVIE_LIST_SUCCESS} from "../constants/inforMovie.constant"

export const getInforMovieListActionSuccess = (inforMovieList) =>{
    return {
        type : GET_INFOR_MOVIE_LIST_SUCCESS,
        payload : inforMovieList,
    }
};
export const getInforMovieListActionRequest = () =>{
    return {
        type : GET_INFOR_MOVIE_LIST_REQUEST,
    }
};
export const getInforMovieListActionFailed = (error) =>{
    return {
        type : GET_INFOR_MOVIE_LIST_FAILED,
        payload : error,
    }
};

export const getInforMovieListAPI = (id) =>{
    return async(dispatch) =>{
        dispatch(getInforMovieListActionRequest());
        try {
            const res = await axios({
                method :"GET",
                url :`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
            });
            //Chuyển dữ liệu lên store
            dispatch(getInforMovieListActionSuccess(res.data));
        } catch(error){
            dispatch(getInforMovieListActionFailed(error));
        }
    }
}