import React,{useState,useEffect} from "react";
import { NavLink, useHistory} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { actLogout, resetIdBooking } from "../../redux/actions/login.action";
import { useDispatch, useSelector} from "react-redux";
import {getMovieSearchAPI} from "./../../redux/actions/searchMovie.action";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

function Header(props) {
  const [state, setstate] = useState({nameMovie:''});
  const dispatch = useDispatch();
  const history = useHistory();
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

  const { hash } = useLocation();
  const [isHashLink, setIsHashLink] = useState(false);
  useEffect(() => {
    if (hash.includes("#")) {
      setIsHashLink(true);
    } else {
      setIsHashLink(false);
    }
  }, [hash]);
  const user = useSelector(state => state.account.account)
  const user1 = JSON.parse(localStorage.getItem("userLogin"));
  return (
    <header>
      <nav className="navbar navbar--header navbar-expand-lg navbar-dark">
        <NavLink className="ml-3 navbar-brand" to="/">
          <img className="img-fluid logoWeb" src={logo} alt="logo" onClick={() => window.scrollTo(0, 0)} />
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
              <Link className="nav-link" to="/#slide__movie" replace={isHashLink}>
                Lịch Chiếu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#cumrap" replace={isHashLink}>
                Cụm rạp
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#new" replace={isHashLink}>
                Tin tức
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#ungdung" replace={isHashLink}>
                Ứng dụng
              </Link>
            </li>
            {user1 ? (
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
                    Hi, {user.name}
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
                    onClick={()=>{
                      dispatch(resetIdBooking())
                    }}
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

export default Header;
