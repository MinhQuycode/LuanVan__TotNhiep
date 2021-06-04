import {GET_INFOR_ACCOUNT_FAILED,GET_INFOR_ACCOUNT_SUCCESS,GET_INFOR_ACCOUNT_REQUEST,GET_INFOR_DETAIL_TICKET_REQUEST,GET_INFOR_DETAIL_TICKET_SUCCESS,GET_INFOR_DETAIL_TICKET_FAILED} from "./../constants/inforAccount.constant";
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

export const getInforAccountAPI = () =>{
    return async(dispatch) =>{
        dispatch(getInforAccountRequest())
        try {
            const user = JSON.parse(localStorage.getItem("userLogin"));
            const res = await axios({
                method:'GET',
                url:`http://cinemasummary.herokuapp.com/api/user`,
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                  },
            })
            dispatch(getInforAccountSuccess(res.data))
        } catch (error) {
            dispatch(getInforAccountFailed(error))
        }
    }
}

export const getInforDetailTicketRequest = () =>{
    return {
        type:GET_INFOR_DETAIL_TICKET_REQUEST,
    }
}
export const  getInforDetailTicketSuccess = (account) =>{
    return {
        type:GET_INFOR_DETAIL_TICKET_SUCCESS,
        payload :account,
    }
}
export const  getInforDetailTicketFailed = (error) =>{
    return {
        type:GET_INFOR_DETAIL_TICKET_FAILED,
        payload : error,
    }
}
export const getInforDetailTicketAPI = (idUser) =>{
    return async(dispatch) =>{
        dispatch(getInforDetailTicketRequest())
        try {
            const res  = await axios({
                method:"GET",
                url:`http://cinemasummary.herokuapp.com/api/list-ticket/${idUser}`
            })
            dispatch(getInforDetailTicketSuccess(res.data))
        } catch (error) {
            dispatch(getInforDetailTicketFailed(error))
        }
    }
}
