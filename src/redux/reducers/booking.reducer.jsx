import {GET_CHAIR_FAILED,GET_CHAIR_SUCCESS,RESET_BOOKING_CHAIR,MSG_BOOKING,GET_CHAIR_REQUEST,BOOK_TICKET} from "../constants/booking.constant";
const initialState = {
    loading :false,
    chairList : [],
    inforBooking : [],
    chairBooking : [],
    error : null,
    response : [],
}

const chairListReducer = (state = initialState, action) => {
    let {type,payload} = action;
    switch (type) {
    case GET_CHAIR_REQUEST:
        state.loading = true;
        state.chairList = null;
        state.inforBooking = null;
        state.error = null;
        return { ...state}

    case GET_CHAIR_SUCCESS:
        state.loading = false;
        state.inforBooking = payload.thongTinPhim;
        state.chairList = payload.danhSachGhe;
        state.error = null;
        return { ...state}

    case GET_CHAIR_FAILED:
        state.loading = false;
        state.chairList = null;
        state.inforBooking = null;
        state.error = payload;
        return { ...state} 

    case BOOK_TICKET:
        let chairBookingNew = [...state.chairBooking]; 
        // console.log(payload.maGhe)
        let index = chairBookingNew.findIndex(gheDangDat => gheDangDat?.maGhe===payload.maGhe);
        //Ghế đang đặt đã có trong mảng khi click => remove
        if(index !== -1){ 
            chairBookingNew.splice(index,1);
        }else {
            chairBookingNew.push(payload)
        }
        state.chairBooking = chairBookingNew;
        return { ...state} 
    
    case MSG_BOOKING : 
        state.response = payload;
        return {...state}
    case RESET_BOOKING_CHAIR : 
         let responseNew = [];
        state.response = responseNew;
        let chairBookingNull = [];
        state.chairBooking = chairBookingNull;
        return {...state}
    default:
        return state
    }
}
export default chairListReducer;