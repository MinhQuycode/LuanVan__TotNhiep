import { SIGN_UP_REQUEST,SIGN_UP_FAILED,SIGN_UP_SUCCESS,RESET_SIGN_UP} from "../constants/register.constant";

const initialState = {
    loading :false,
    userRegister : [],
    error :null
}

const registerReducer = (state = initialState,action) => {
    const { type, payload } = action;
    switch (type) {
    case SIGN_UP_REQUEST:
        state.loading = true;
        state.userRegister = null;
        state.error = null;
        return {...state};

    case SIGN_UP_SUCCESS:
        state.loading = false;
        state.userRegister = payload;
        state.error = null;
        return {...state};

    case SIGN_UP_FAILED:
        state.loading = false;
        state.userRegister = null;
        state.error = [];
        return {...state};
    case RESET_SIGN_UP:
        state.userRegister = null;
        return {...state}
    default:
        return state
    }
}
export default registerReducer;