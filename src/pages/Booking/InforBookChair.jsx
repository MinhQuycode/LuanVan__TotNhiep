import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {bookingTicketAPI,resetReducerChair, stopTimeBooking} from "./../../redux/actions/booking.action";
import visa from "./../../assets/images/visa_mastercard.png";
import atm from "./../../assets/images/ATM.png";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { getInforAccountAPI } from "../../redux/actions/inforAccount.action";


export default function InforBookChair(props) {
  const {info} = props;
  const history = useHistory();
  const chairBooking = useSelector((state) => state.chair.chairBooking);
  const dispatch = useDispatch();
  // Mã lịch chiếu
  const { id } = useParams();
  const maLichChieu = id;
console.log(typeof maLichChieu)
  // Lấy Id user
  const user_id = useSelector(state => state.account.account.id);
  const user_name = useSelector(state => state.account.account.name);
  const user_email = useSelector(state => state.account.account.email);
  useEffect(() => {
    dispatch(getInforAccountAPI())
  },[])

  const rederInforBookingChair = () => {
    return chairBooking.map((item, index) => {
      return <p style={{color:"orangered"}} key={index}>{item.hang.concat(item.tenGhe)}</p>;
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
  //Tổng tiền okee
  let totalAmount = parseInt(tongTien());
  //Danh sach vé
  const danhSachVe = chairBooking.map((ve) => (
    {
        giaVe : ve.giaVe,
        maGhe : ve.maGhe
    }
  ))
  //Sô lượng
  if(danhSachVe && danhSachVe.length > 0){
    var quantity = null,
    quantity = danhSachVe.length;
  }
  // Lấy message từ API booking
  const message = useSelector(state => state.chair.response);
  var resMessage = message?.status;
  //Submit 
  const submitAPI = () =>{
    Swal.fire({
      title: "Bạn muốn đặt vé ?",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result)=>{
      if(result.value){
         dispatch(bookingTicketAPI(maLichChieu,totalAmount,quantity,danhSachVe,user_id,user_email,user_name));
         dispatch(stopTimeBooking());
      }
    })
}
console.log(maLichChieu,totalAmount,quantity,danhSachVe,user_id,user_email,user_name);
useEffect(() => {
  if(resMessage === "fails"){
    Swal.fire({
      title: `${message?.msg}`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đặt tiếp",
      cancelButtonText: "Hủy",
    }).then((result)=>{
      if(result.value){
         window.location.reload();
      }else{
          history.push({ pathname: `/home` });
          dispatch(resetReducerChair())
      }
    })
  }else if(resMessage === "success"){
    Swal.fire({
      title: `Đặt vé thành công, bạn có thể kiểm tra email của mình !`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Home",
      cancelButtonText: "Xem danh sách vé đã đặt",
    }).then((result)=>{
      if(result.value){
        history.push({ pathname: `/home` });
        dispatch(resetReducerChair())
      }else{
        history.push({pathname:`/account`})
        dispatch(resetReducerChair())
      }
    })
  }
}, [resMessage,message])
//Kiểm tra trước khi đặt vé 
  let check;
  chairBooking.length > 0 ? check = false : check = true;
  return (
    <div className="infor__booking">
      <p className="price">{tongTien()} Đ</p>
      <div className="line"></div>
      <div className="title__booking">
        <p>Ngày giờ chiếu</p>
        <p className="ml-5" style={{color:"green"}}>
          {info?.ngayChieu} - {info?.gioChieu}
        </p>
      </div>
      <div className="line"></div>
      <div className="title__booking">
        <p>Cụm rạp:</p>
        <p className="ml-5" style={{color:"green"}}>{info?.tenCumRap}</p>
      </div>
      <div className="line"></div>
      <div className="title__booking">
        <p>Rạp:</p>
        <p style={{color:"green"}}>{info?.tenRap}</p>
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
           {submitAPI()}
      }}>THANH TOÁN</button>
    </div>
  ) 
}