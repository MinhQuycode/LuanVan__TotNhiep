import React, {useState} from "react";

export default function HistoryBooking(props) {
  const ticket = props.ticket;
  console.log(ticket)
  const [state, setState] = useState({
    display1 : "",
    display2 : "d-none",
    ticketCode: "",
    values: 1,
  });
  
  // Hiển thị sản phẩm theo số lượng
  const newTicket = [...ticket];
  if (newTicket.length > state.values) {
    newTicket.length = state.values;
  }
  const listTicketUser = () => {
    if(newTicket !== []){
    return newTicket.map((ticket, index) => {
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
                    display1 : "d-none",
                    display2 : ""
                  });
                }}
              >
                Chi tiết
              </button>
            </td>
          </tr>
        </tbody>
      );
    })
  }else{
      <tbody>
        <tr scope="row">
          <td>Không có vé để hiển thị</td>
        </tr>
      </tbody>
  }
  };
  const ticketItem = newTicket.filter(
    (item) => item.MaBooking === state.ticketCode
  );

  const handleChange = (event) => {
    let value = event.target.value;
    setState({
      ...state,
      values: value,
    });
  };
  //Detail
  let bookingCode = ticketItem.map((item) => item.MaBooking);
  const listTicketUserDetail = () => {
    return ticketItem.map((ticket, index) => {
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
              <th>
                <form>
                  <span>Hiển thị</span>
                  <select onChange={handleChange} value={state.values}>
                    {ticket?.map((item, index) => {
                      return (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      );
                    })}
                  </select>
                </form>
              </th>
            </tr>
          </thead>
          {listTicketUser()}
        </table>
      </div>
      <div className={`detail ${state.display2}`}>
      <p className="tiltle__content">Mã đặt vé - #{bookingCode}</p>
      <div className="detail_tick">
        <p className="content__tick">
          Ngày mua hàng : Ngày 22 tháng 2 năm 2021
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
              onClick={()=>{
                setState({
                  ...state,
                    ticketCode: ticket.MaBooking,
                    display1 : "",
                    display2 : "d-none"
                })
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
