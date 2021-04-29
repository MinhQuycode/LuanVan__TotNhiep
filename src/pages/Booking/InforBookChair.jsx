import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {bookingTicketAPI} from "./../../redux/actions/booking.action";
import visa from "./../../assets/images/visa_mastercard.png";
import atm from "./../../assets/images/ATM.png";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";
import { useParams } from "react-router-dom";


export default function InforBookChair(props) {
  const history = useHistory();
  const chairBooking = useSelector((state) => state.chair.chairBooking);
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(chairBooking);


  const rederInforBookingChair = () => {
    return chairBooking.map((item, index) => {
      // console.log(item)
      return <p key={index}>{item.hang.concat(item.tenGhe)}</p>;
    });
  };
// tính tổng tiền
  const tongTien = () =>{
      return (
          chairBooking.reduce((tongTien , gheDangDat) =>{
              return (tongTien += gheDangDat.giaVe)
          },0).toLocaleString()
      )
  }
  //Kiểm tra trước khi đặt vé 
  let check;
  chairBooking.length > 0 ? check = false : check = true;
  // console.log(chairBooking.length)
// console.log(check);
  return (
    <div className="infor__booking">
      <p className="price">{tongTien()} Đ</p>
      <div className="line"></div>
      <p style={{ fontWeight: "600" }}>{props.info?.tenPhim}</p>
      <div className="line"></div>
      <div className="title__booking">
        <p>Ngày giờ chiếu</p>
        <p className="ml-5">
          {props.info?.ngayChieu} - {props.info?.gioChieu}
        </p>
      </div>
      <div className="line"></div>
      <div className="title__booking">
        <p>Cụm rạp:</p>
        <p className="ml-5">{props.info?.tenCumRap}</p>
      </div>
      <div className="line"></div>
      <div className="title__booking">
        <p>Rạp:</p>
        <p>{props.info?.tenRap}</p>
      </div>
      <div className="line"></div>
      <div className="title__booking">
        <p>Thường : 85.000Đ</p>
        <p>Vip : 110.000Đ</p>
      </div>
      <div className="line"></div>
      <div className="title__booking">
        <p>Ghế được chọn :</p>
        {rederInforBookingChair()}
      </div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="title__booking1">
          <p>Hình thức thanh toán</p>
          <div className="radio-selection">
            <div className="radio__item">
              <input
                className="radio__item--input"
                type="radio"
                name="howtopay"
                id="ATM"
                defaultValue="ATM"
              />
                <div className="pay__figure">
                  <img src={atm} alt="ATM" />
                </div>
                <p className="pay__text">Thẻ ATM nội địa</p>
            </div>
            <div className="radio__item">
              <input
                className="radio__item--input"
                type="radio"
                name="howtopay"
                id="VISA"
                defaultValue="VISA"
                defaultChecked
              />
                <div className="pay__figure">
                  <img src={visa} alt="VISA" />
                </div>
                <p className="pay__text">Visa, Master, JCB</p>
            </div>
        </div>
      </div>
      <button disabled={check} className="btn__booking mt-4" onClick={()=>{
            Swal.fire({
                title: "Bạn muốn đặt vé ?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
              }).then((result) => {
                if (result.value) {
                  history.push({ pathname: `/` });
                  window.location.reload();
                  Swal.fire("Đã đặt vé thành công");
                  dispatch(bookingTicketAPI(id,chairBooking));
                }
              });
      }}>THANH TOÁN</button>
    </div>
  ) 
}
 