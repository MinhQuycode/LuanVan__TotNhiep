import {
  GET_INFOR_ACCOUNT_FAILED,
  GET_INFOR_ACCOUNT_SUCCESS,
  GET_INFOR_ACCOUNT_REQUEST,
  CHANGE_ACTIVE,
} from "../constants/inforAccount.constant";
const initialState = {
  loading: null,
  account: [],
  active : {activeCLass:"",nonActive:"active"},
  error: null,
};

const inforAcountReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_INFOR_ACCOUNT_REQUEST:
      state.loading = true;
      state.account = [];
      state.error = null;
      return { ...state };

    case GET_INFOR_ACCOUNT_SUCCESS:
      state.loading = null;
      state.account = payload;
      state.error = null;
      return { ...state };

    case GET_INFOR_ACCOUNT_FAILED:
      state.loading = null;
      state.account = [];
      state.error = payload;
      return { ...state };
    case CHANGE_ACTIVE :
      let newActive = "active";
      state.active.activeCLass = newActive ;
      state.active.nonActive ="";
      return {...state};
    default:
      return state;
  }
};

export default inforAcountReducer;
