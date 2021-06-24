import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {bookingTicketAPI,resetReducerChair, stopTimeBooking} from "./../../redux/actions/booking.action";
import atm from "./../../assets/images/logoVNpay.png";
import Swal from "sweetalert2";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getInforAccountAPI } from "../../redux/actions/inforAccount.action";
import { payMoneyAPI } from "../../redux/actions/payMoney.action";


export default function InforBookChair(props) {
  const {info} = props;
  const history = useHistory();
  const chairBooking = useSelector((state) => state.chair.chairBooking);
  const statePay = useSelector(state => state.pay.response);
  const dispatch = useDispatch();
  // Mã lịch chiếu
  const { id } = useParams();
  const maLichChieu = id;
  // Lấy Id user
  const user_id = useSelector(state => state.account.account.id);
  const user_name = useSelector(state => state.account.account.name);
  const user_email = useSelector(state => state.account.account.email);
  //get value input radio
  const [inputValue, setinputValue] = useState({value : "VNPAY"})
  const changeHandle = (event) =>{
    const {value} = event.target;
    setinputValue({
      value : value
    })
  }
  // tính tổng tiền
  const tongTien = () =>{
    return (
        chairBooking.reduce((tongTien , gheDangDat) =>{
            return (tongTien += gheDangDat.giaVe)
        },0).toLocaleString()
    )
}
  //Tổng tiền
  let totalAmount = parseInt(tongTien());

  let amountTT = document.getElementById("tien")?.getAttribute("value");
  let dayCode = document.getElementById("codeDay")?.getAttribute("value");

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  const dateCode = dateTime.replace(/[^a-zA-Z0-9]/g, '')
  //get data form pay money
  const [dataPay, setDataPay] = useState({
    values : {
      order_type : "Vé xem phim",
      order_id: dayCode,
      amount: amountTT,
      order_desc: "",
      bank_code:"NCB",
      language : "vn",
    }
  })
  const handleChange = (event) => {
    const { name, value} = event.target;
    
    setDataPay ({
      values : {
      order_type : "Vé xem phim",
      order_id: dayCode,
      amount: amountTT,
      order_desc: value,
      bank_code:"NCB",
      language : "vn",
      }
   });
  }
  // console.log(dataPay)

  useEffect(() => {
    dispatch(getInforAccountAPI())
  },[])

  const rederInforBookingChair = () => {
    return chairBooking.map((item, index) => {
      return <p style={{color:"orangered"}} key={index}>{item.hang.concat(item.tenGhe)}</p>;
    });
  };


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

  //Submit API pay money
  let dataNew = dataPay.values;
  const dataForm = {
    dataBooking : {
    maLichChieu : maLichChieu,
    totalAmount : totalAmount,
    quantity : quantity,
    danhSachVe : danhSachVe,
    user_id : user_id,
    user_email : user_email,
    user_name : user_name,
  }, 
    dataNew
  };

  //save dataBooking sessionStorage
  sessionStorage.setItem("dataBooking",JSON.stringify(dataForm.dataBooking));
  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(payMoneyAPI(dataForm));
  }
  //save link localStorage
  localStorage.setItem("payLink",JSON.stringify(statePay));
  if(statePay){
    history.push("/pay");
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
                defaultChecked
                name="radioInput"
                id="ANPAY"
                defaultValue="VNPAY"
                onChange={changeHandle}
              />
                <div className="pay__figure">
                  <img src={atm} alt="ATM"/>
                <span className="pay__text">VNPAY</span>
                </div>
            </div>
            <div className="radio__item">
              <input
                className="radio__item--input"
                type="radio"
                name="radioInput"
                id="nhan"
                defaultValue="NHANHANG"
                onChange={changeHandle}
              />
                <div>
                <p style={{marginLeft:"1rem",lineHeight:"40px",paddingTop:"5px"}} className="pay__text">Thanh toán khi nhận vé</p>
                </div>
            </div>
        </div>
      </div>
      <button disabled={check} className="btn__booking mt-4" data-toggle="modal" data-target="#thanhtoan" 
        onClick={()=>inputValue.value === "NHANHANG" ? submitAPI() : ""}
      >THANH TOÁN</button>
      {/* Modal thanh toán */}
      {inputValue.value === "VNPAY" ? (
      <div className="modal fade" id="thanhtoan" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-weight-bold text-success" id="titleDonhang">TẠO MỚI ĐƠN HÀNG</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="text-danger">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="loaiHang" className="font-weight-bold text-success">Loại hàng hóa</label>
                  <input disabled onChange={handleChange} type="text" name="order_type" className="form-control" id="loaiHang" value="Vé xem phim"/>
                </div>
                <div className="row">
                  <div className="col-6  pl-0 form-group">
                    <label htmlFor="maBooking" className="font-weight-bold text-success">Mã đặt vé</label>
                    <input onChange={handleChange} disabled type="text" name="order_id" className="form-control" id="codeDay" value={dateCode}/>
                  </div>
                  <div className="col-6 pr-0 form-group">
                    <label htmlFor="tongTien" className="font-weight-bold text-success">Tổng tiền</label>
                    <input id="tien" onChange={handleChange} disabled type="text" name="amount" className="form-control" value={totalAmount*1000}/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="noiDung" className="font-weight-bold text-success">Nội dung thanh toán</label>
                  <textarea onChange={handleChange} name="order_desc" type="text" className="form-control" id="noiDung" placeholder="Mời bạn nhập nội dung cần thanh toán !"/>
                </div>
                <div className="form-group">
                  <label htmlFor="nganHang" className="font-weight-bold text-success">Ngân hàng</label>
                  <input disabled onChange={handleChange} name="bank_code" type="text" className="form-control" id="nganHang" value="NCB"/>
                </div>
                <div className="form-group">
                  <label htmlFor="ngonNgu" className="font-weight-bold text-success">Ngôn ngữ</label>
                  <input disabled onChange={handleChange} name="language" type="text" className="form-control" id="ngonNgu" value="Tiếng Việt"/>
                </div>
                <div>
                <button type="submit" className="btn btn-danger">ĐẶT VÉ
                </button>
                <a className="btn btn-success ml-2" data-dismiss="modal">ĐÓNG</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>):""}
    </div>
  ) 
}