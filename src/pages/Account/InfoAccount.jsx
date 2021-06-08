import React from "react";

export default function InfoAccount(props) {
    // console.log(props.info)
    const info = props.info
  return (
    <div
      className="tab-pane fade show active"
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
          <button
            className="btn__avt mt-4"
            onClick={() => {
              window.location.reload();
            }}
          >
            Thay đổi
          </button>
        </div>
        <div className="col-8 info__user">
          <p>Tên : {info.name}</p>
          <p>Email : {info.email}</p>
          <p>SĐT : {!info.phone_number ? "Bạn có thể thêm vào !" : ""}</p>
          <p>Địa chỉ : {!info.address ? "Bạn có thể thêm vào !" : ""}</p>
          <button
            className="btn__info"
            onClick={() => {
            //   setstate({
            //     classList: "active",
            //   });
            }}
          >
            Thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
