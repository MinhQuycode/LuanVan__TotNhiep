import { GET_INFOR_ACCOUNT_FAILED,GET_INFOR_ACCOUNT_SUCCESS,GET_INFOR_ACCOUNT_REQUEST } from "../constants/inforAccount.constant";
const initialState = {
    loading : null,
    account : [],
    error : null,
}

const inforAcountReducer =  (state = initialState, action ) => {
    let { type, payload } = action;
    switch (type) {

    case GET_INFOR_ACCOUNT_REQUEST:
        state.loading = true;
        state.account = [];
        state.error = null;
        return { ...state}

    case GET_INFOR_ACCOUNT_SUCCESS:
        state.loading = null;
        state.account = payload;
        state.error = null;
        return { ...state}

    case GET_INFOR_ACCOUNT_FAILED:
        state.loading = null;
        state.account = [];
        state.error = payload;
        return { ...state}

    default:
        return state
    }
}

export default inforAcountReducer;