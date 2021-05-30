import axios from "axios";
import {POST_DATE_REDUCER,GET_SHOWTIMES_FAILED,POST_DATE_CHOOSED,GET_SHOWTIMES_REQUEST,GET_SHOWTIMES_SUCCESS,POST_ID_THEATER_CHOOSE,POST_THEATERGROUP_CHOOSED} from "../constants/showtimes.constant";

export const getShowTimesActionSuccess = (data) => {
    return {
        type :GET_SHOWTIMES_SUCCESS,
        payload : data,
    }
}
export const getShowTimesActionRequest = () => {
    return {
        type :GET_SHOWTIMES_REQUEST,
    }
}
export const getShowTimesActionError = (error) => {
    return {
        type :GET_SHOWTIMES_FAILED,
        payload : error,
    }
}

export const postShowTimesChoose = (idTheaterChoosed) => {
    return {
        type :POST_ID_THEATER_CHOOSE,
        payload : idTheaterChoosed,
    }
}

export const postTheaterGroup = (maHeThongRap,logo) =>{
    return {
        type : POST_THEATERGROUP_CHOOSED,
        payload : {
            maHeThongRap, 
            logo
        }
    }
}

export const postDateGroup = (date,index) =>{
    return {
        type : POST_DATE_CHOOSED,
        payload : {
            date, 
            index
        }
    }
}
export const postDateReducer = (date) =>{
    return {
        type : POST_DATE_REDUCER,
        payload : date,
        
    }
}
// Call API lấy thời gian chiếu
export const getShowTimeAPI = (id) =>{
    return async(dispatch) => {
        dispatch(getShowTimesActionRequest())
        try {
            const res = await axios ({
                method : 'GET',
                url : `https://cinemasummary.herokuapp.com/api/showtimes`,
            })
            dispatch(getShowTimesActionSuccess(res.data));
        } catch (error) {
            dispatch(getShowTimesActionError(error));
        }
    }
}