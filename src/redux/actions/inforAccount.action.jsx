import {GET_INFOR_ACCOUNT_FAILED,GET_INFOR_ACCOUNT_SUCCESS,GET_INFOR_ACCOUNT_REQUEST} from "./../constants/inforAccount.constant";
import axios from "axios";

export const getInforAccountRequest = () =>{
    return {
        type:GET_INFOR_ACCOUNT_REQUEST,
    }
}
export const getInforAccountSuccess = (account) =>{
    return {
        type:GET_INFOR_ACCOUNT_SUCCESS,
        payload :account,
    }
}
export const getInforAccountFailed = (error) =>{
    return {
        type:GET_INFOR_ACCOUNT_FAILED,
        payload : error,
    }
}

export const getInforAccountAPI = (account) =>{
    return async(dispatch) =>{
        dispatch(getInforAccountRequest())
        try {
            const res = await axios({
                method:'POST',
                url:`https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
                data:account,
            })
            dispatch(getInforAccountSuccess(res.data))
        } catch (error) {
            dispatch(getInforAccountFailed(error))
        }
    }
}