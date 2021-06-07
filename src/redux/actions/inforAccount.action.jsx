import {
  GET_INFOR_ACCOUNT_FAILED,
  GET_INFOR_ACCOUNT_SUCCESS,
  GET_INFOR_ACCOUNT_REQUEST,
  GET_INFOR_DETAIL_TICKET_REQUEST,
  GET_INFOR_DETAIL_TICKET_SUCCESS,
  GET_INFOR_DETAIL_TICKET_FAILED,
  UPDATE_INFOR_REQUEST,
  UPDATE_INFOR_SUCCESS,
  UPDATE_INFOR_FAILED
} from "./../constants/inforAccount.constant";
import axios from "axios";

export const getInforAccountRequest = () => {
  return {
    type: GET_INFOR_ACCOUNT_REQUEST,
  };
};
export const getInforAccountSuccess = (account) => {
  return {
    type: GET_INFOR_ACCOUNT_SUCCESS,
    payload: account,
  };
};
export const getInforAccountFailed = (error) => {
  return {
    type: GET_INFOR_ACCOUNT_FAILED,
    payload: error,
  };
};

export const getInforAccountAPI = () => {
  return async (dispatch) => {
    dispatch(getInforAccountRequest());
    try {
      const user = JSON.parse(localStorage.getItem("userLogin"));
      const res = await axios({
        method: "GET",
        url: `https://cinemasummary.herokuapp.com/api/user`,
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      dispatch(getInforAccountSuccess(res.data));
    } catch (error) {
      dispatch(getInforAccountFailed(error));
    }
  };
};

export const getInforDetailTicketRequest = () => {
  return {
    type: GET_INFOR_DETAIL_TICKET_REQUEST,
  };
};
export const getInforDetailTicketSuccess = (account) => {
  return {
    type: GET_INFOR_DETAIL_TICKET_SUCCESS,
    payload: account,
  };
};
export const getInforDetailTicketFailed = (error) => {
  return {
    type: GET_INFOR_DETAIL_TICKET_FAILED,
    payload: error,
  };
};
export const getInforDetailTicketAPI = (urlListTicket) => {
  return async (dispatch) => {
    dispatch(getInforDetailTicketRequest());
    try {
      const res = await axios({
        method: "GET",
        url: `${urlListTicket}`,
      });
      dispatch(getInforDetailTicketSuccess(res.data));
    } catch (error) {
      dispatch(getInforDetailTicketFailed(error));
    }
  };
};

export const updateInforRequest = () => {
  return {
    type: UPDATE_INFOR_REQUEST,
  };
};
export const updateInforSuccess = (update) => {
  return {
    type: UPDATE_INFOR_SUCCESS,
    payload: update,
  };
};
export const updateInforFailed = (error) => {
  return {
    type: UPDATE_INFOR_FAILED,
    payload: error,
  };
};
export const updateInforAPI = () => {
  return async (dispatch) => {
    dispatch(updateInforRequest());
    try {
      const res = await axios({
        method: "GET",
        url: `https://cinemasummary.herokuapp.com/api/update_user`,
      });
      dispatch(updateInforSuccess(res.data));
    } catch (error) {
      dispatch(updateInforFailed(error));
    }
  };
};
