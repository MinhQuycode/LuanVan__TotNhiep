import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {bookingTicketAPI,resetReducerChair, stopTimeBooking} from "./../../redux/actions/booking.action";
import atm from "./../../assets/images/logoVNpay.png";
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
                checked
                name="howtopay"
                id="ATM"
                defaultValue="ATM"
              />
                <div className="pay__figure">
                  <img src={atm} alt="ATM" />
                <span className="pay__text">VNPAY</span>
                </div>
            </div>
        </div>
      </div>
      <button disabled={check} className="btn__booking mt-4" data-toggle="modal" data-target="#thanhtoan" 
        onClick={()=>{{submitAPI()}}}
      >THANH TOÁN</button>
      {/* Modal thanh toán */}
      {/* <div className="modal fade" id="thanhtoan" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-weight-bold text-success" id="titleDonhang">TẠO MỚI ĐƠN HÀNG</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="text-danger">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="loaiHang" className="font-weight-bold text-success">Loại hàng hóa</label>
                  <input type="text" className="form-control" id="loaiHang" placeholder="Vé xem phim"/>
                </div>
                <div className="row">
                  <div className="col-6  pl-0 form-group">
                    <label htmlFor="maBooking" className="font-weight-bold text-success">Mã đặt vé</label>
                    <input type="text" className="form-control" id="maBooking" placeholder="657"/>
                  </div>
                  <div className="col-6 pr-0 form-group">
                    <label htmlFor="tongTien" className="font-weight-bold text-success">Tổng tiền</label>
                    <input type="text" className="form-control" id="tongTien" placeholder="100000"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="noiDung" className="font-weight-bold text-success">Nội dung thanh toán</label>
                  <textarea type="text" className="form-control" id="noiDung" placeholder="Thanh toán vì đam mê"/>
                </div>
                <div className="form-group">
                  <label htmlFor="nganHang" className="font-weight-bold text-success">Ngân hàng</label>
                  <input type="text" className="form-control" id="nganHang" placeholder="Không chọn"/>
                </div>
                <div className="form-group">
                  <label htmlFor="ngonNgu" className="font-weight-bold text-success">Ngôn ngữ</label>
                  <input type="text" className="form-control" id="ngonNgu" placeholder="Tiếng việt"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal">ĐÓNG</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal"
                  onClick={()=>{{submitAPI()}}}
              >ĐẶT VÉ</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  ) 
}