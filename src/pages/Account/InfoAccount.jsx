import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { changeClassActive } from "../../redux/actions/inforAccount.action";

export default function InfoAccount(props) {
  const dispatch = useDispatch();
  const {name,email,phone_number,address,birthday} = props.info;
  return (
    <div
      className={`tab-pane fade show active`}
      id="list-home"
      role="tabpanel"
      aria-labelledby="list-home-list"
    >
      <p className="tiltle__content">Thông tin tài khoản</p>
      <div className="user__content row">
        <div className="col-4 avt__user">
          <img
            src="https://source.unsplash.com/random/200x200?sig=1"
            alt="avatar"
          />
          {/* <button
            className="btn__avt mt-4"
            onClick={() => {
              window.location.reload();
            }}
          >
            Thay đổi
          </button> */}
        </div>
        <div className="col-8 info__user">
          <p>Tên : {name}</p>
          <p>Email : {email}</p>
          <p>SĐT : {!phone_number ? "Bạn có thể thêm vào !" : phone_number}</p>
          <p>Địa chỉ : {!address ? "Bạn có thể thêm vào !" : address}</p>
          <p>Ngày sinh :{birthday?.substring(8,11)}-{birthday?.substring(5,8)}{birthday?.substring(0,4)}</p>
          {/* <button
            className="btn__info"
            onClick={() => {
              dispatch(changeClassActive());
            }}
          >
            Thay đổi
          </button> */}
        </div>
      </div>
    </div>
  );
}
