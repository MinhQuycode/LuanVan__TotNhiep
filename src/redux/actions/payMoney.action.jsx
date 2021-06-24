import axios from "axios";
import { 
  PAY_MONEY_FAILED,
  PAY_MONEY_SUCCESS,
  PAY_MONEY_REQUEST
 } from "./../constants/payMoney.constant";

export const payMoneyRequest = () => {
    return {
      type: PAY_MONEY_REQUEST,
    };
  };
  export const payMoneySuccess = (response) => {
    return {
      type: PAY_MONEY_SUCCESS,
      payload: response,
    };
  };
  export const payMoneyFailed = (error) => {
    return {
      type: PAY_MONEY_FAILED,
      payload: error,
    };
  };

  export const payMoneyAPI = (dataForm) => {
    return async (dispatch) => {
      dispatch(payMoneyRequest()); 
      try {
        const res = await axios({ 
          method: "POST",
          url: `https://cinemasummary.herokuapp.com/api/postpayment`,
          data: dataForm
        });
        dispatch(payMoneySuccess(res.data));
      } catch (error) {
        dispatch(payMoneyFailed(error));
      }
    };
  };