import axios from "axios";
import {GET_THEATER_LIST_FAILED,GET_THEATER_LIST_SUCCESS,GET_THEATER_LIST_REQUEST} from '../constants/theater.constant'

export const getTheaterListActionSuccess = (listTheater) =>{
    return {
        type  : GET_THEATER_LIST_SUCCESS,
        payload : listTheater,
    }
}
export const getTheaterListActionFailed = (listTheater) =>{
    return {
        type  : GET_THEATER_LIST_FAILED,
        payload : listTheater,
    }
}
export const getTheaterListActionRequest = () =>{
    return {
        type  : GET_THEATER_LIST_REQUEST,
    }
}

export const getTheaterListAPI = () =>{
    return async(dispatch) =>{
        dispatch(getTheaterListActionRequest());
        try{
            const res = await axios({
                method : "GET",
                url : "http://localhost:8000/api/theaters"
            })
            //Đẩy lên store
            dispatch(getTheaterListActionSuccess(res.data));
        }
        catch(error) {
            dispatch(getTheaterListActionFailed(error));
        }
    }
}