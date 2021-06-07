import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import ScrollToTop from "./../../Layouts/ScrollToTop/ScrollToTop";
import Loading from "./../../Layouts/Loading/Loading";
import { getInforAccountAPI } from "./../../redux/actions/inforAccount.action";
import { getInforDetailTicketAPI } from "./../../redux/actions/inforAccount.action";
import ListTab from "./ListTab";
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
         <ListTab/>
          <div className="col-9 tiltle__contents">
            <div className="tab-content" id="nav-tabContent">
             <InfoAccount info={info}/>
             <ChangeAccount info={info}/>
             <HistoryBooking/>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Redirect to="/" />
  );
}
