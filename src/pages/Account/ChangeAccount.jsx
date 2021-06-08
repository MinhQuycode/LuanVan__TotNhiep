import React, { useState } from "react";

export default function ChangeAccount(props) {
  const { name, email, phone_number, address, birthday, gender } = props.info;
  const [infoChange, setinfoChange] = useState({
    values: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
      birthday: "",
      gender: "",
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    errors: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
      birthday: "",
      gender: "",
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    // console.log(value);
    let newValue = { ...infoChange.values, [name]: value };
    let newError = { ...infoChange.errors };

    // check Password
    if (name === "current_password") {
      if (value.length >= 8) {
        newError[name] = "";
      } else {
        newError[name] = "*Mật khẩu có tối thiểu 8 ký tự !";
      }
    }
    //check Email
    if (type === "email") {
      const regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(value)) {
        newError[name] = "*Vui lòng nhập đúng email !";
      } else {
        newError[name] = "";
      }
    }
    //check SĐT
    if (name === "phone_number") {
      const parternSodt = /((09|03|07|08|05)+([0-9]{8})\b)/;
      if (!parternSodt.test(value)) {
        newError[name] = "* VD: 0364567890";
      } else {
        newError[name] = "";
      }
    }
    setinfoChange ({
      values :newValue,
      errors :newError,
   });
  };
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
              Tên
            </p>
            <input onChange={handleChange} type="text" name="name" placeholder={name} />
          </div>
          <div className="col-4">
            <p>
              Email
            </p>
            <input onChange={handleChange} type="email" name="email" placeholder={email}/>
            <p className="text text-danger">{infoChange.errors.email}</p>
          </div>
          <div className="col-4">
            <p>
              Địa chỉ
            </p>
            <input onChange={handleChange} type="text" name="address" placeholder="Hồ Chí Minh"/>
          </div>
          <div className="col-4">
            <p>
              Số điện thoại
            </p>
            <input onChange={handleChange} name="phone_number" placeholder="0987654321"/>
            <p className="text text-danger">{infoChange.errors.phone_number}</p>
          </div>
          <div className="col-4">
            <p>
              Ngày sinh
            </p>
            <input onChange={handleChange} type="date" id="birthday" name="birthday" style={{color:"gray"}} />
          </div>
          <div className="col-4">
            <p>
              Giới tính
            </p>
            <div>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                defaultValue="nam"
              />
              <label className="mx-1">Nam</label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                defaultValue="nu"
              />
              <label className="mx-1">Nữ</label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                defaultValue="khac"
              />
              <label className="mx-1">Khác</label>
            </div>
          </div>
          <div className="col-4">
            <p>
              Mật khẩu cũ <b>*</b>
            </p>
            <input onChange={handleChange} type="password" name="current_password"/>
            <p className="text text-danger">{infoChange.errors.current_password}</p>
          </div>
        </div>
        <div className="mt-3 ml-3">
          <label
            style={{ color: "black", fontWeight: "bold", marginRight: "5px" }}
          >
            Bạn có muốn thay đổi mật khẩu ?
          </label>
          <button className="btn__change" data-toggle="collapse" data-target="#change">Đổi</button>
        </div>
        <div className="row collapse multi-collapse" id="change" >
          <div className="col-4">
            <p>
              Mật khẩu mới <b>*</b>
            </p>
            <input type="password" name="new_password"/>
          </div>
          <div className="col-4">
            <p>
              Nhập lại mật khẩu mới<b>*</b>
            </p>
            <input type="password" name="confirm_password"/>
          </div>
        </div>
        <div className="row mt-3 ml-2">
            <button className="btn__save" type="submit">Lưu lại</button>
        </div>
      </div>
    </div>
  );
}
