import { SIGN_IN_REQUEST,SIGN_IN_FAILED,SIGN_IN_SUCCESS,LOG_OUT } from "../constants/login.constant";

const initialState = {
    loading :false,
    userSignin : null,
    error :null,
}

const loginReducer = (state = initialState,action) => {
    const { type, payload } = action;
    switch (type) {
    case SIGN_IN_REQUEST:
        state.loading = true;
        state.userSignin = null;
        state.error = null;
        return {...state};

    case SIGN_IN_SUCCESS:
        state.loading = false;
        state.userSignin = payload;
        state.error = null;
        return {...state};

    case SIGN_IN_FAILED:
        state.loading = false;
        state.userSignin = null;
        state.error = payload;
        return {...state};
    
    case LOG_OUT:
        localStorage.removeItem("userLogin");
        localStorage.clear();
        return { ...initialState,loading:false};    

    default:
        return state
    }
}
export default loginReducer;