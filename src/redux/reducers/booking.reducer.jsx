import {
  STOP_TIME_BOOKING,
  GET_CHAIR_FAILED,
  GET_CHAIR_SUCCESS,
  RESET_BOOKING_CHAIR,
  GET_CHAIR_REQUEST,
  BOOK_TICKET,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAILED,
  BOOK_TICKET_REQUEST
} from "../constants/booking.constant";
const initialState = {
  loading: false,
  loading1: false,
  chairList: [],
  inforBooking: [],
  chairBooking: [],
  stopTimeBooking:null,
  response: [],
  error: null,
};

const chairListReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_CHAIR_REQUEST:
      state.loading = true;
      state.chairList = null;
      state.inforBooking = null;
      state.error = null;
      return { ...state };

    case GET_CHAIR_SUCCESS:
      state.loading = false;
      state.inforBooking = payload.thongTinPhim;
      state.chairList = payload.danhSachGhe;
      state.error = null;
      return { ...state };

    case GET_CHAIR_FAILED:
      state.loading = false;
      state.chairList = null;
      state.inforBooking = null;
      state.error = payload;
      return { ...state };

    case BOOK_TICKET:
      let chairBookingNew = [...state.chairBooking];
      let index = chairBookingNew.findIndex(
        (gheDangDat) => gheDangDat?.maGhe === payload.maGhe
      );
      //Ghế đang đặt đã có trong mảng khi click => remove
      if (index !== -1) {
        chairBookingNew.splice(index, 1);
      } else {
        chairBookingNew.push(payload);
      }
      state.chairBooking = chairBookingNew;
      return { ...state };

    case BOOK_TICKET_REQUEST:
      state.loading1 = true;
      state.response = null;
      state.error = null;
      return { ...state };

    case BOOK_TICKET_SUCCESS:
      state.loading1 = false;
      state.response = payload;
      state.error = null;
      return { ...state };

    case BOOK_TICKET_FAILED:
      state.loading1 = false;
      state.response = null;
      state.error = payload;
      return { ...state };

    case STOP_TIME_BOOKING:
      let newStop = "d-none"
      state.stopTimeBooking = newStop;
      return { ...state };
    case RESET_BOOKING_CHAIR:
      let responseNew = [];
      state.response = responseNew;
      let chairBookingNull = [];
      state.chairBooking = chairBookingNull;
      let newRun = "d-block";
      state.stopTimeBooking = newRun;
      return { ...state };
    default:
      return state;
  }
};
export default chairListReducer;
