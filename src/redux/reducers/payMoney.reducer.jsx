import {
  PAY_MONEY_FAILED,
  PAY_MONEY_REQUEST,
  PAY_MONEY_SUCCESS,
} from "./../constants/payMoney.constant";

const initialState = {
  loading: false,
  response: null,
  error: null,
};

const payMoneyReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case PAY_MONEY_REQUEST:
      state.loading = true; 
      state.response = null; 
      state.error = null;
      return { ...state };

    case PAY_MONEY_SUCCESS:
      state.loading = false; 
      state.response = payload; 
      state.error = null;
      return { ...state };

    case PAY_MONEY_FAILED:
      state.loading = false; 
      state.response = null; 
      state.error = payload;
      return { ...state };

    default:
      return state;
  }
};
export default payMoneyReducer;
