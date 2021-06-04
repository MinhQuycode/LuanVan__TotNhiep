import React from "react";

export default function ChangeAccount(props) {
  const {name,email} = props.info;
  return (
    <div
      className="tab-pane fade"
      id="list-profile"
      role="tabpanel"
      aria-labelledby="list-profile-list"
    >
      <p className="tiltle__content">Thay đổi tài khoản</p>
      <div className="changeAccount">
        <div className="row row--change">
          <div className="col-4">
            <p>
              Tên <b>*</b>
            </p>
            <input type="text" placeholder={name}/>
          </div>
          <div className="col-4">
            <p>
              Email <b>*</b>
            </p>
            <input type="email" placeholder={email}/>
          </div>
          <div className="col-4">
            <p>
              Mật khẩu cũ <b>*</b>
            </p>
            <input type="password" />
          </div>
          <div className="col-4">
            <p>
              Địa chỉ <b>*</b>
            </p>
            <input type="text" placeholder='Hồ Chí Minh'/>
          </div>
          <div className="col-4">
            <p>
              Số điện thoại <b>*</b>
            </p>
            <input type="text" placeholder="0987654321"/>
          </div>
        </div>
        <p className="ml-3 mt-4" style={{ color: "orangered" }}>
          Bạn có muốn thay đổi mật khẩu ?
        </p>
        <div className="row">
          <div className="col-4">
            <p>
              Mật khẩu mới <b>*</b>
            </p>
            <input type="password" />
          </div>
          <div className="col-4">
            <p>
              Nhập lại mật khẩu mới<b>*</b>
            </p>
            <input type="password" />
          </div>
          <div className="col-4 mt-4">
            <button className="btn__save">Lưu lại</button>
          </div>
        </div>
      </div>
    </div>
  );
}
