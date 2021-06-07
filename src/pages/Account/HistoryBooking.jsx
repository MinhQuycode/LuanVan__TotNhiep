import React, { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {getInforDetailTicketAPI} from "./../../redux/actions/inforAccount.action";

export default function HistoryBooking(props) {
  const ticket = useSelector((state) => state.ticket.ticket);
  const dispatch = useDispatch();
  console.log(ticket);
  const info = useSelector((state) => state.account.account);
  console.log(info)
  const [state, setState] = useState({
    display1: "",
    display2: "d-none",
    ticketCode: "",
    values: 1,
  });
  const [stateUrl, setstateUrl] = useState(
    {
      urlDetailTicket : `https://cinemasummary.herokuapp.com/api/list-ticket/${info.id}`
    }
  );
    console.log(stateUrl.urlDetailTicket)
  useEffect(() => {
      dispatch(getInforDetailTicketAPI(stateUrl.urlDetailTicket));
  }, [stateUrl.urlDetailTicket]);

  // Hiển thị sản phẩm theo số lượng
  const newTicket = ticket.data;
  const listTicketUser = () => {
    if (newTicket !== []) {
      return newTicket?.map((ticket, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td scope="row">{ticket.TenPhim}</td>
              <td>
                <img className="img_movie" src={ticket.HinhAnh} alt="anhPhim" />
              </td>
              <td>{ticket.TenRap}</td>
              <td>{ticket.Phong}</td>
              <td>{ticket.Ghe}</td>
              <td>{ticket.total_amount}</td>
              <td>
                <button
                  className="btn__ticket"
                  onClick={() => {
                    setState({
                      ...state,
                      ticketCode: ticket.MaBooking,
                      display1: "d-none",
                      display2: "",
                    });
                  }}
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          </tbody>
        );
      });
    } else {
      <tbody>
        <tr scope="row">
          <td>Không có vé để hiển thị</td>
        </tr>
      </tbody>;
    }
  };
  const ticketItem = newTicket?.filter(
    (item) => item.MaBooking === state.ticketCode
  );

  //Detail
  let bookingCode = ticketItem?.map((item) => item.MaBooking);
  const listTicketUserDetail = () => {
    return ticketItem?.map((ticket, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td scope="row">{ticket.TenPhim}</td>
            <td>
              <img className="img_movie" src={ticket.HinhAnh} alt="anhPhim" />
            </td>
            <td>{ticket.TenRap}</td>
            <td>{ticket.Phong}</td>
            <td>{ticket.NgayChieu}</td>
            <td>{ticket.GioChieu}</td>
            <td>{ticket.Ghe}</td>
            <td>{ticket.total_amount}</td>
          </tr>
        </tbody>
      );
    });
  };
  let active__null1 = " ";
  let active__null2 = " ";
  if(!ticket.prev_page_url){
    active__null1 = "active__null"
  }
  if(!ticket.next_page_url){
    active__null2 = "active__null"
  }
  let check1;
  !ticket.prev_page_url ? check1 = true : check1 = false;
  let check2;
  !ticket.next_page_url ? check2 = true : check2 = false;
  return (
    <div
      className="tab-pane fade"
      id="list-messages"
      role="tabpanel"
      aria-labelledby="list-messages-list"
    >
      <div className={`history ${state.display1}`}>
        <p className="tiltle__content">Lịch sử giao dịch</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Tên phim</th>
              <th>Hình ảnh</th>
              <th>Tên Rạp</th>
              <th>Phòng</th>
              <th>Ghế</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          {listTicketUser()}
        </table>
        <nav className="navigation">
          <ul className="navigation__ticket">
            <li className="page__item">
              <button disabled={check1} className={`page__link ${active__null1}`}
                onClick={()=>{
                setstateUrl({
                  urlDetailTicket : ticket.prev_page_url
                })
            }}>
                <span>«</span>
              </button>
            </li>
            <li className="page__item" style={{color:"orangered",fontWeight:"bold",fontSize:"17px"}}>
              {ticket.current_page}
            </li>
            <li className="page__item">
              <button disabled={check2} className={`page__link ${active__null2}`} 
              onClick={()=>{
              setstateUrl({
                urlDetailTicket : ticket.next_page_url
              })
            }}>
                <span>»</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`detail ${state.display2}`}>
        <p className="tiltle__content">Mã đặt vé - #{bookingCode}</p>
        <div className="detail_tick">
          <p className="content__tick">
            Ngày mua hàng : Ngày 22 tháng 5 năm 2021
          </p>
          <div className="tick__item row ">
            <div className="col-5">
              <b>Thông tin thanh toán</b>
              <p>Phạm Minh Quý</p>
              <p>23 Bàu Cát, Tân Bình, HCM</p>
              <p>SĐT : 03298492304</p>
            </div>
            <div className="col-5">
              <b>Phương thức thanh toán</b>
              <p>VNPAY</p>
            </div>
            <div className="col-2">
              <button
                className="btn__back"
                onClick={() => {
                  setState({
                    ...state,
                    ticketCode: ticket.MaBooking,
                    display1: "",
                    display2: "d-none",
                  });
                }}
              >
                Quay lại
              </button>
            </div>
          </div>
          <div className="tick__item1">
            <p className="tic__detail">THÔNG TIN VÉ</p>
            <table className="table__custom table table-striped">
              <thead>
                <tr>
                  <th>Tên phim</th>
                  <th>Hình ảnh</th>
                  <th>Tên Rạp</th>
                  <th>Phòng</th>
                  <th>Ngày chiếu</th>
                  <th>Giờ chiếu</th>
                  <th>Ghế</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              {listTicketUserDetail()}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
