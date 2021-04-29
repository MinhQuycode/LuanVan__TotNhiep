import axios from 'axios';
import {GET_CHAIR_FAILED,GET_CHAIR_REQUEST,GET_CHAIR_SUCCESS,BOOK_TICKET} from "../constants/booking.constant";


export const getChairActionSuccess = (data) =>{
    return {
        type : GET_CHAIR_SUCCESS,
        payload : data
    }
}
export const getChairActionRequest = () =>{
    return {
        type : GET_CHAIR_REQUEST,
    }
}
export const getChairActionFailed = (error) =>{
    return {
        type : GET_CHAIR_FAILED,
        payload : error
    }
}

export const getChairListAPI = (maLichChieu) =>{
    return async(dispatch) => {
        dispatch(getChairActionRequest());
        try {
            const res = await axios({
                method : 'GET',
                url:`http://localhost:8000/api/room-seat/${maLichChieu}`
            })
            dispatch(getChairActionSuccess(res.data));
        } catch (error) {
            dispatch(getChairActionFailed(error))
        }
        
    }
}

export const bookChairAction = (maGhe,giaVe,tenGhe,hang) =>{
  return {
      type : BOOK_TICKET,
      payload : {
        maGhe,
        giaVe,
        tenGhe,
        hang
      }
  }
}


export const bookingTicketAPI = (maLichChieu, danhSachVe) => {
    return async (dispatch) => {
      try {
        const user = JSON.parse(localStorage.getItem("userLogin"));
        const res = await axios({
          method: "POST",
          url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
          data: {
            maLichChieu,    
            danhSachVe,
            taiKhoanNguoiDung: user.taiKhoan,
          },
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
