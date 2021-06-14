import axios from "axios";
import Swal from "sweetalert2";
import { RESET_ID_BOOKING,SIGN_IN_REQUEST,SIGN_IN_SUCCESS,SIGN_IN_FAILED,LOG_OUT,LOGIN_BOOKING} from "../constants/login.constant";

//Đăng nhập
export const signInActionRequest = () =>{
    return {
        type : SIGN_IN_REQUEST,
    }
};
export const signInActionSuccess = (user) =>{
    return {
        type : SIGN_IN_SUCCESS,
        payload : user,
    }
};
export const signInActionFailed = (error) =>{
    return {
        type : SIGN_IN_FAILED,
        payload : error,
    }
};

export const signInAPI = (user,history,id) =>{
    return async(dispatch) =>{
        dispatch(signInActionRequest());
        try {
            const res = await axios ({
                method :"POST",
                url:"https://cinemasummary.herokuapp.com/api/login",
                data : user,
            });
            //Gửi data lên store
            dispatch(signInActionSuccess(res.data));
            //Lưu trên localstrorage
            localStorage.setItem("userLogin",JSON.stringify(res.data));
            id ? history.push({pathname:`/booking/${id}`}) : history.goBack();
        } catch(error){
            dispatch(signInActionFailed(error));
        }
    }
}

//Đăng xuất
export const actLogout = (event,history) => {
    return (dispatch) => {
      event.persist();
      Swal.fire({
        title: "Bạn có chắc muốn đăng xuất?",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đăng xuất!",
        cancelButtonText: "Hủy",
      }).then((result) => {
        window.location.reload();
        if (result.value) {
          Swal.fire("Đã đăng xuất", "Thành công");
          dispatch({ type: LOG_OUT });
          history.push({ pathname: `/` });
        } else {
          event.preventDefault();
        }
      });
    };
  };
//Redirect booking page 
export const redirectBookingPage = (idBooking) =>{
  return {
      type : LOGIN_BOOKING,
      payload : idBooking,
  }
};
export const resetIdBooking = () =>{
  return{
    type : RESET_ID_BOOKING,
    payload : null,
  }
}



