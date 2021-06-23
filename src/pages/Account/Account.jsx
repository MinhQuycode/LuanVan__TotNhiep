import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import ScrollToTop from "./../../Layouts/ScrollToTop/ScrollToTop";
import Loading from "./../../Layouts/Loading/Loading";
import { getInforAccountAPI } from "./../../redux/actions/inforAccount.action";
import InfoAccount from "./InfoAccount";
import ChangeAccount from "./ChangeAccount";
import HistoryBooking from "./HistoryBooking";

export default function Account() {
  const history = useHistory();
  const info = useSelector((state) => state.account.account);
  const loading = useSelector((state) => state.account.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInforAccountAPI());
  }, []);

  const user = JSON.parse(localStorage.getItem("userLogin"));
  
  if (loading) return <Loading />;
  return user ? (
    <section id="account">
      <ScrollToTop />
      <div className="container">
        <div className="account--user row">
        <div className="col-md-12 col-lg-3 tiltle__user">
            <p className="tiltle text-center">TÀI KHOẢN CỦA BẠN</p>
            <div className="list-group list--item" id="list-tab" role="tablist">
              <a
                className={`list-group-item list-group-item-action active`}
                id="list-home-list"
                data-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="home"
              >
                Thông tin chung
              </a>
              <a
                className={`list-group-item list-group-item-action `}
                id="list-profile-list"
                data-toggle="list"
                href="#list-profile"
                role="tab"
                aria-controls="profile"
              >
                Chi tiết tài khoản
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-messages-list"
                data-toggle="list"
                href="#list-messages"
                role="tab"
                aria-controls="messages"
              >
                Lịch sử giao dịch
              </a>
            </div>
          </div>
          <div className="col-md-12 col-lg-9 tiltle__contents">
            <div className="tab-content" id="nav-tabContent">
             <InfoAccount info={info}/>
             <ChangeAccount info={info}/>
             <HistoryBooking info={info}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Redirect to="/" />
  );
}
