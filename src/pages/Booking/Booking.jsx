import React, { useEffect} from "react";
import screen from "../../assets/images/screen.png";
import ChairRoom from "./ChairRoom";
import InforBookChair from "./InforBookChair";
import { getChairListAPI, resetReducerChair } from "../../redux/actions/booking.action";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../../Layouts/Loading/Loading";
import {Redirect,useParams} from "react-router-dom";
import ScrollToTop from "../../Layouts/ScrollToTop/ScrollToTop";
import TimeBooking from "./TimeBooking";
import Notfound from "../PageNotFound/Notfound";
import NameChair from "./NameChair";

export default function Booking(props) {
  let inforBK = useSelector((state) => state.chair.inforBooking);
  let chairList = useSelector((state) => state.chair.chairList);
  let error = useSelector((state) => state.chair.error);
  const { id } = useParams();
  const userSignIn = JSON.parse(localStorage.getItem('userLogin'));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetReducerChair());
  },[])
  useEffect(() => {
    dispatch(getChairListAPI(id));
  }, [dispatch,id]);

  //Chia mảng ghế
  const chunkArray = (myArray, chunk_size) => {
    var results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  };
  // Kiểm tra chairList và đếm số ghế
  if(chairList && chairList.length > 0){
    var countChair = chairList.length
  }
  switch (countChair) {
    case 120:
    case 144:
      let listChair = [...chairList];
      var result = chunkArray(listChair,12);
      break;   
    case 140:
    case 154:
    case 168:
      let listChair1 = [...chairList];
      var result = chunkArray(listChair1,14);
      break;  
    default:
      console.log("Không tồn tại mảng ghế !")
      break;
  }

  const renderChairList = () => {
    return result?.map((item, index) => {
      return <ChairRoom chair={item} key={index}/>;
    });
  };
  
  if(error) return (<Notfound/>)
  if(chairList === null ) return (<Loading/>);
 
  return userSignIn ? (
    <section id="booking" className="container-fluid">
      <ScrollToTop/>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="row infor__movie">
            <div className="col-6 info__movie">
              <img className="imgMovie" src={inforBK?.hinhAnh} alt="anh"/>
              <div className="infor">
                <p>{inforBK?.tenPhim}</p>
                <p>{inforBK?.diaChi}</p>
              </div>
            </div>
            <TimeBooking/>
          </div>
          <div className="row screen">
            <img src={screen} alt="anh"/>
          </div>
          <div className="row chair">
            <NameChair name={chairList}/>
            <div className="chairlist">
              {renderChairList()}
            </div>
            <NameChair name={chairList}/>
          </div>
          <div className="row note">
            <div className="noteseat">
              <span className="note__item">
                <div className="seat-normal" />
                <p className="seat-info">Thường</p>
              </span>
              <span className="note__item">
                <div className="seat-vip" />
                <p className="seat-info">VIP</p>
              </span>
              <span className="note__item">
                <div className="seat-current" />
                <p className="seat-info">Đang chọn</p>
              </span>
              <span className="note__item">
                <div className="seat-taken" />
                <p className="seat-info">Đã được chọn</p>
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <InforBookChair info={inforBK}/>
        </div>
      </div>
    </section>
  ) : (
    <Redirect to="/" />
  )
}
