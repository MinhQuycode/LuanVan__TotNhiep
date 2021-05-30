import { SIGN_UP_REQUEST,SIGN_UP_FAILED,SIGN_UP_SUCCESS } from "../constants/register.constant";
import axios from 'axios';

export const signUpActionRequest = () =>{
    return {
        type : SIGN_UP_REQUEST,
    }
};
export const signUpActionSuccess = (user) =>{
    return {
        type : SIGN_UP_SUCCESS,
        payload : user
    }
};
export const signUpActionFailed = (error) =>{
    return {
        type : SIGN_UP_FAILED,
        payload : error
    }
};
//Đăng ký

export const signUpAPI = (user,history) =>{
    return async(dispatch) =>{
        dispatch(signUpActionRequest());
        try {
            const res = await axios ({
                method :"POST",
                url:"http://localhost:8000/api/register",
                data : user,
            });
            dispatch(signUpActionSuccess(res));
            // history.push("/login");
            //Chuyển về trang đăng nhập khi đăng ký thành công
        } catch(error){
            dispatch(signUpActionFailed(error));
        }
    }
}