import axios from "axios";
import {
  STOP_TIME_BOOKING,
  GET_CHAIR_FAILED,
  GET_CHAIR_REQUEST,
  RESET_BOOKING_CHAIR,
  GET_CHAIR_SUCCESS,
  BOOK_TICKET,
  BOOK_TICKET_FAILED,
  BOOK_TICKET_REQUEST,
  BOOK_TICKET_SUCCESS
} from "../constants/booking.constant";

export const getChairActionSuccess = (data) => {
  return {
    type: GET_CHAIR_SUCCESS,
    payload: data,
  };
};
export const getChairActionRequest = () => {
  return {
    type: GET_CHAIR_REQUEST,
  };
};
export const getChairActionFailed = (error) => {
  return {
    type: GET_CHAIR_FAILED,
    payload: error,
  };
};

export const getChairListAPI = (maLichChieu) => {
  return async (dispatch) => {
    dispatch(getChairActionRequest());
    try {
      const res = await axios({
        method: "GET",
        url: `https://cinemasummary.herokuapp.com/api/room-seat/${maLichChieu}`,
      });
      dispatch(getChairActionSuccess(res.data));
    } catch (error) {
      dispatch(getChairActionFailed(error));
    }
  };
};

//action reset reducer chọn ghế
export const resetReducerChair = () => {
  return {
    type: RESET_BOOKING_CHAIR,
  };
};
export const bookChairAction = (maGhe, giaVe, tenGhe, hang) => {
  return {
    type: BOOK_TICKET,
    payload: {
      maGhe,
      giaVe,
      tenGhe,
      hang,
    },
  };
};
export const bookingTicketRequest = () => {
  return {
    type: BOOK_TICKET_REQUEST,
  };
};
export const bookingTicketSuccess = (response) => {
  return {
    type: BOOK_TICKET_SUCCESS,
    payload: response,
  };
};
export const bookingTicketFailed = (error) => {
  return {
    type: BOOK_TICKET_FAILED,
    payload: error,
  };
};
export const stopTimeBooking = () => {
  return {
    type: STOP_TIME_BOOKING,
  };
};
export const bookingTicketAPI = (
  maLichChieu,
  totalAmount,
  quantity,
  danhSachVe,
  user_id,
  user_email,
  user_name
) => {
  return async (dispatch) => {
    // dispatch(bookingTicketRequest())
    try {
      const res = await axios({
        method: "POST",
        url: "https://cinemasummary.herokuapp.com/api/booking",
        data: {
          maLichChieu,
          totalAmount,
          quantity,
          danhSachVe,
          user_id,
          user_email,
          user_name,
        },
      });
      dispatch(bookingTicketSuccess(res.data));
    } catch (error) {
      dispatch(bookingTicketFailed(error))
    }
  };
};
