import React, { useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import Swal from 'sweetalert2';
import { resetUpdate, updateInforAPI } from "../../redux/actions/inforAccount.action";
import LoadingUpdate from "./LoadingUpdate";

export default function ChangeAccount(props) {
  const dispatch = useDispatch();
  const error = useSelector(state => state.update.error);
  const success = useSelector(state => state.update.update);
  const loading = useSelector((state) => state.update.loading);
  
  const { name, email, phone_number, address, birthday, gender } = props.info;
  const [infoChange, setinfoChange] = useState({
    values: {
      name: name ? name : "",
      phone_number: phone_number ? phone_number : "",
      address: address ? address : "",
      birthday: birthday ? birthday : "",
      gender: gender ? gender : "Nam",
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    errors: {
      phone_number: "",
      birthday: "",
      new_password: "",
      confirm_password: "",
    },
  });
  console.log(infoChange.values);
  const handleChange = (event) => {
    const { name, value} = event.target;
    let newValue = { ...infoChange.values, [name]: value };
    let newError = { ...infoChange.errors };

    // Check new_password
    if(name === "new_password"){
      const parterPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if(!parterPass.test(value)){
        newError[name] = "Mật khẩu ít nhất 8 ký tự, 1 số, 1 chữ hoa, 1 thường và 1 ký tự đặc biệt !"
      } else{
        newError[name]= "";
      }
      if(value ===""){
        newError[name] = "";
      }
    }
    //Ckeck comfirm
    if(name === 'confirm_password'){
      if(value === newValue['new_password']){
        newError[name] = '';
      } else {
        newError[name] = '*Mật khẩu nhập lại chưa đúng !';
      }
    }
    //check SĐT
    if (name === "phone_number") {
      const parternSodt = /((09|03|07|08|05)+([0-9]{8})\b)/;
      if (!parternSodt.test(value)) {
        newError[name] = "* VD: 0364567890";
      }else {
        newError[name] = '';
      }
      if(value ===""){
        newError[name] = "";
      }
    }
    
    // Check birthday
    if(name === "birthday") {
      const parternBirthday = /([12]\d{3}[\/](0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01]))/;
      if(!parternBirthday.test(value)){
        newError[name] = "* VD: 1999/12/28";
      } else {
        newError[name]= "";
      }
      if(value ===""){
        newError[name] = "";
      }
    }

    setinfoChange ({
      values :newValue,
      errors :newError,
   });
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    let {errors} = infoChange;
    let valid = true;

    for(const key in errors){
      if(errors[key] !== ""){
        valid = false;
      }
    }
    if(!valid){
      Swal.fire({
        title: 'Lỗi!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'Dữ liệu chưa hợp lệ !',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    } else {
      dispatch(updateInforAPI(infoChange.values));
    }
  }

  if(success?.status === "success"){
      Swal.fire({
        title: 'Thành công !',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        text: 'Cập nhật thành công !',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result)=>{
        if(result.value){
           window.location.reload();
        }else{
          window.location.reload();
        }
      })
    }else if(error){
      Swal.fire({
      title: 'Lỗi!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      text: 'Vui lòng nhập đúng mật khẩu !',
      icon: 'error',
      confirmButtonText: 'Ok'
    }).then((result)=>{
      if(result.value){
        dispatch(resetUpdate());
      }else{
        dispatch(resetUpdate());
      }
    })
  }
  const stringBirthday = `${birthday?.substring(8, 11) +birthday?.substring(4, 8) +birthday?.substring(0, 4)}`
  return (
    <div
      className={`tab-pane fade`}
      id="list-profile"
      role="tabpanel"
      aria-labelledby="list-profile-list"
    >
      <p className="tiltle__content">Thay đổi tài khoản</p>
      {loading ? (<LoadingUpdate/>) : (
      <form className="changeAccount form-group" noValidate autoComplete="on" onSubmit={handleSubmit}>
        <div className="row row--change">
          <div className="col-sm-6 col-md-4">
            <p>Tên</p>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder={name}
            />
          </div>
          <div className="col-sm-6 col-md-4">
            <p>Email</p>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={email}
            />
            <p className="text text-danger">{infoChange.errors.email}</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <p>Địa chỉ</p>
            <input
              onChange={handleChange}
              type="text"
              name="address"
              placeholder={address}
            />
          </div>
          <div className="col-sm-6 col-md-4">
            <p>Số điện thoại</p>
            <input
              onChange={handleChange}
              name="phone_number"
              placeholder={phone_number}
            />
            <p className="text text-danger">{infoChange.errors.phone_number}</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <p>Ngày sinh</p>
            <input
              onChange={handleChange}
              name="birthday"
              placeholder={!birthday ? "": stringBirthday}
            />
            <p className="text text-danger">{infoChange.errors.birthday}</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <p>Giới tính</p>
            <select name="gender" defaultValue={gender} onChange={handleChange}>
              <option disabled>{gender?gender:"Chọn"}</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="col-sm-6 col-md-4">
            <p>
              Mật khẩu cũ <b>*</b>
            </p>
            <input
              onChange={handleChange}
              type="password"
              name="current_password"
            />
          </div>
        </div>
        <div className="mt-3 ml-3">
          <label
            style={{ color: "black", fontWeight: "bold", marginRight: "5px" }}
          >
            Bạn có muốn thay đổi mật khẩu ?
          </label>
          <input
            className="btn__change"
            type="checkbox"
            data-toggle="collapse"
            data-target="#change"
            style={{ cursor: "pointer" }}
          ></input>
        </div>
        <div className="row collapse multi-collapse" id="change">
          <div className="col-sm-6 col-md-4">
            <p>
              Mật khẩu mới <b>*</b>
            </p>
            <input
              onChange={handleChange}
              type="password"
              name="new_password"
            />
            <p className="text text-danger mr-5">{infoChange.errors.new_password}</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <p>
              Nhập lại mật khẩu mới<b>*</b>
            </p>
            <input
              onChange={handleChange}
              type="password"
              name="confirm_password"
            />
            <p className="text text-danger">
              {infoChange.errors.confirm_password}
            </p>
          </div>
        </div>
        <div className="row mt-3 ml-2">
          <button className="btn__save" type="submit">
            Lưu lại
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
