import axios from "axios";
import {GET_CINEMAS_FAILED,GET_CINEMAS_REQUEST,GET_CINEMAS_SUCCESS} from '../constants/cinemas.constant'



export const getCinemasListActionSuccess = (data) =>{
    return {
        type : GET_CINEMAS_SUCCESS,
        payload : data
    }
}
export const getCinemasListActionRequest = () =>{
    return {
        type : GET_CINEMAS_REQUEST,
    }
}
export const getCinemasListActionFailed = (error) =>{
    return {
        type : GET_CINEMAS_FAILED,
        payload : error,
    }
}

//Call API cụm rạp

export const getCinemasListAPI = (id) =>{
    return async(dispatch) => {
        dispatch(getCinemasListActionRequest());
        try {
            const res = await axios({
                    method : "GET",
                    url : `http://localhost:8000/api/theaterbranch`,
                })
                dispatch(getCinemasListActionSuccess(res.data))
        }
        catch (error) {
            dispatch(getCinemasListActionFailed(error));
        }
    }
}