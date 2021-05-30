import React,{useState} from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { actLogout } from "../../redux/actions/login.action";
import { useDispatch} from "react-redux";
import {getMovieSearchAPI} from "./../../redux/actions/searchMovie.action";

function Header(props) {
  const [state, setstate] = useState({nameMovie:''});
  const dispatch = useDispatch();
  const history = useHistory();

  // const movieSearch = useSelector(state => state.movieSearch.movieSearch);
  // console.log(movieSearch)

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(actLogout(event,history));
  };

  const handleChange = (event) =>{
    setstate({nameMovie : event.target.value});
  }
  let placeholder = "Tìm tên phim muốn xem..."
  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(getMovieSearchAPI(state.nameMovie,history));
  }

  return (
    <header>
      <nav className="navbar navbar--header navbar-expand-lg navbar-dark">
        <NavLink className="ml-3 navbar-brand" to="/">
          <img className="img-fluid logoWeb" src={logo} alt="logo" />
        </NavLink>

        <form className="search__header1 input-group" onSubmit={handleSubmit}>
          <div className=" input-group-prepend">
            <button className="input--header input-group-text" id="basic-addon1" type="submit">
              <i className="fas fa-search"/>
            </button>
          </div>
          <input
            onChange={handleChange}
            type="text"
            className="input--header form-control"
            placeholder="Tìm tên phim muốn xem..."
            aria-label="Username"
            name="nameMovie"
            aria-describedby="basic-addon1"
          />
        </form>

        <button
          className="navbar-toggler mr-3"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="font-weight-bold navbar-toggler-icon btn--menu" />
        </button>
        <div className="myMenu collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#slide__movie">
                Lịch chiếu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#cumrap">
                Cụm rạp
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#new">
                Tin tức
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ungdung">
                Ứng dụng
              </a>
            </li>
            {props.credential ? (
              <>
                <li className="nav-item user__account">
                  <NavLink className="nav-link" style={{
                    maxWidth:'105px',
                    maxHeight:'48px',
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color:'black'
                  }}  to="">
                    Hi, {props.credential.name}
                  </NavLink>
                  <NavLink className="account" to="/account">Tài khoản</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{color:"black"}} to="/" onClick={handleLogout}>
                    Đăng xuất
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    activeStyle={{
                      backgroundColor: "white",
                      color: "orangered",
                    }}
                    style={{color:"black"}}
                    className="nav-link handle"
                    to="/login"
                  >
                    Đăng nhập
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeStyle={{
                      backgroundColor: "white",
                      color: "orangered",
                    }}
                    style={{color:"black"}}
                    className="nav-link handle"
                    to="/register"
                  >
                    Đăng ký
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <form className="mb-5 d-none search__header input-group" onSubmit={handleSubmit}>
                <div className=" input-group-prepend">
                  <button
                    className=" input--header input-group-text"
                    id="basic-addon2"
                    type="submit"
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
                <input
                  type="text"
                  onChange={handleChange}
                  name='nameMovie'
                  className="input--header form-control"
                  placeholder={placeholder}
                  aria-label="Username"
                  aria-describedby="basic-addon2"
                />
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
//Lấy dữ liệu từ store về
const mapStateToProps = (state) => {
  return {
    credential: state.user.userSignin,
  };
};

export default connect(mapStateToProps)(Header);
