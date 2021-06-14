import { SIGN_UP_REQUEST,SIGN_UP_FAILED,SIGN_UP_SUCCESS,RESET_SIGN_UP} from "../constants/register.constant";
import axios from 'axios';


export const signUpActionRequest = () =>{
    return {
        type : SIGN_UP_REQUEST,
    }
};
export const signUpActionSuccess = (data) =>{
    return {
        type : SIGN_UP_SUCCESS,
        payload : data
    }
};
export const signUpActionFailed = (error) =>{
    return {
        type : SIGN_UP_FAILED,
        payload : error
    }
};

export const resetResponse = () =>{
    return {
        type : RESET_SIGN_UP,
    }
};

//Đăng ký

export const signUpAPI = (user,history) =>{
    return async(dispatch) =>{
        dispatch(signUpActionRequest());
        try {
            const res = await axios ({
                method :"POST",
                url:"https://cinemasummary.herokuapp.com/api/register",
                data : user,
            });
                dispatch(signUpActionSuccess(res.data));
        } catch(error){
            dispatch(signUpActionFailed(error));
           
    }}
}