import {
    UPDATE_INFOR_REQUEST,
    UPDATE_INFOR_SUCCESS,
    UPDATE_INFOR_FAILED
  } from "../constants/inforAccount.constant";

const initialState = {
    loading: null,
    update : [],
    error: null,
}
const updateInfoReducer =  (state = initialState,action) => {
    let { type, payload } = action;
    switch (type) {
        case UPDATE_INFOR_REQUEST:
            state.loading = true;
            state.update = [];
            state.error = null;
            return { ...state };
      
          case UPDATE_INFOR_SUCCESS:
            state.loading = null;
            state.update = payload;
            state.error = null;
            return { ...state };
      
          case UPDATE_INFOR_FAILED:
            state.loading = null;
            state.update = [];
            state.error = payload;
            return { ...state };

    default:
        return state
    }
}
export default updateInfoReducer;
