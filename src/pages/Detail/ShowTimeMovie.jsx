import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postDateReducer,
  postTheaterGroup,
} from "../../redux/actions/showtimes.action";
import { postDateGroup } from "../../redux/actions/showtimes.action";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getShowTimeAPI } from "./../../redux/actions/showtimes.action";
import { getTheaterListAPI } from "../../redux/actions/theater.action";
import { getCinemasListAPI } from "../../redux/actions/cinemas.action";
import { redirectBookingPage } from "../../redux/actions/login.action";
// import LinkButton from "./../../components/Home/LinkButton/LinkButton";

function ShowTimeMovie(props) {
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(0);
  const [isSelectedDate, setIsSelectedDate] = useState(0);
  const dispatch = useDispatch();
  const { idMovie } = useParams();

  //Lấy kích thước màn h
  const hasWindow = typeof window !== "undefined";
  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width,
    };
  };
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  // Điều kiện chọn lịch chiếu
  const userSignIn = JSON.parse(localStorage.getItem("userLogin"))
  const handleChoiceShowsTime = (id) => {
    dispatch(redirectBookingPage(id));
    if (userSignIn) {
      history.push({ pathname: `/booking/${id}` });
    } else {
      history.push({ pathname: "/login" });
    }
  };

  // Render theo rạp khi click
  const theaterChoose = useSelector(
    (state) => state.showTimes.theaterGroupChoosed
  );
  // Lấy lịch chiếu của phim
  useEffect(() => {
    dispatch(getShowTimeAPI());
  }, []);

  //Lấy thông tin rạp chiếu
  useEffect(() => {
    dispatch(getCinemasListAPI());
  }, []);
  const theaterbranch = useSelector((state) => state.cinemas.cinemasList);

  // Lấy thông tin rạp theo phim
  useEffect(() => {
    dispatch(getTheaterListAPI());
  }, []);
  const theater = useSelector((state) => state.theater.listTheater);
  const showTimes = useSelector((state) => state.showTimes.showTimes);

  //Lọc danh sách lịch chiếu theo phim
  const showTimesMovie = showTimes?.filter((time) => time.movies_id == idMovie);

  //RENDER THEATER
  // Lấy id theater
  let theaterId = showTimesMovie?.map((theater) => theater.theaters_id);
  /* 
        let a = ["1", "1", "2", "3", "3", "1"];
        result a = [1,2,3]; 
      */
  //Tìm các giá trị khác trong mảng
  let theaterid = theaterId?.filter((item, i, ar) => ar.indexOf(item) === i);
  // console.log(theaterid);
  const TheaterMovie = () => {
    let arrTheater = [];
    for (let index = 0; index < theaterid?.length; index++) {
      const element = theaterid[index];
      let id = theater.filter((item) => item.id === element);
      arrTheater.push(id);
    }
    return arrTheater;
  };
  let arrayTimeMovie = TheaterMovie();

  //RENDER SHOWTIME
  // Lấy date trong mảng
  let date = showTimesMovie?.map((dateItem) => dateItem.date);
  let dateShows = date?.filter((item, i, ar) => ar.indexOf(item) === i);
  let arrDate = [];
  let itemDate = dateShows?.map((item) => item.substring(5, 10));
  arrDate.push(itemDate);

  useEffect(() => {
    if (itemDate) {
      dispatch(postDateReducer(itemDate[0]));
    }
  }, []);
  const showTimeWithDate = () => {
    return itemDate?.map((date) => {
      return showTimesMovie?.filter(
        (item) => item.date.substring(5, 10) === date
      );
    });
  };
  //Lấy thời gian chiếu theo ngày
  const day = showTimeWithDate();

  const chooseDateGroup = (date, index) => {
    setIsSelectedDate(index);
    dispatch(postDateGroup(date, index));
  };
  const dateSelect = useSelector((state) => state.showTimes.dateGroupChoosed);
  //REDER CINEMAS
  const cinemas12 = () => {
    return day?.map((item) => {
      return item.map((dayItem) => dayItem.theater_branch_id);
    });
  };
  const cinemas1 = cinemas12();
  // Lọc id branch khác nhau
  const cinemasid1 = () => {
    return cinemas1?.map((item) => {
      return item?.filter((item, i, arr) => arr.indexOf(item) === i);
    });
  };
  let cinemasid = cinemasid1();
  let cinemas = showTimesMovie?.map((item) => item.theater_branch_id);
  const TimeCinema = () => {
    return day ? day[dateSelect.index] : "";
  };
  const time = TimeCinema();

  // Change theater
  const chooseTheaterGroup = (id, logo, index) => {
    setIsSelected(index);
    dispatch(postTheaterGroup(id, logo, index));
  };

  let nonClassActive = "non_active_theater";
  let Active = "active_theater";
  const httpImg = "http://cinemasummary.herokuapp.com";
  const renderTheater = () => {
    return arrayTimeMovie?.map((theater) => {
      return theater.map((itemtt, index) => {
        return (
          <div
            key={index}
            className={`theater_item ${
              isSelected === index ? Active : nonClassActive
            }`}
            onClick={() =>
              isSelected === index
                ? ""
                : chooseTheaterGroup(itemtt.id, itemtt.logo, index)
            }
          >
            <img src={httpImg.concat(itemtt?.logo)} alt="anh" />
            <span style={{ fontWeight: "bold" }}>{itemtt?.name}</span>
          </div>
        );
      });
    });
  };

  let col1 = "col-4";
  let col2 = "col-8";
  windowDimensions.width <= 845 ? (col1 = "col-12") : (col1 = "col-4");
  windowDimensions.width <= 845 ? (col2 = "col-12") : (col2 = "col-8");

  // const render
  return (
    <div className="row showsTime">
      <div className={`${col1} showTheater`}>{renderTheater()}</div>
      <div className={`${col2} showTime`}>
        <div className="row day">
          {arrDate?.map((date) => {
            return date?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`col-2 day_show ${
                    isSelectedDate === index ? Active : nonClassActive
                  }`}
                  onClick={() =>
                    isSelectedDate === index ? "" : chooseDateGroup(item, index)
                  }
                >
                  {item}
                </div>
              );
            });
          })}
        </div>
        <div className="hour">
          <div className="hour__theater">
            {cinemas
              ? cinemasid[dateSelect.index]?.map((itemId) => {
                  return theaterbranch
                    ?.filter((branch) => branch.id === itemId)
                    .map((item, index) => {
                      return (
                        <div className="branch" key={index}>
                          <div className="branch--theater">
                            <img
                              src={httpImg.concat(theaterChoose.logo)}
                              alt="anh"
                            />
                            <div>
                              <span style={{ fontWeight: "bold" }}>
                                {item.name}
                              </span>
                              <span style={{ display: "inline-block" }}>
                                {item.address}
                              </span>
                            </div>
                          </div>
                          <p>Giờ chiếu :</p>
                          <div className="gio">
                            {time
                              ?.filter(
                                (itemt) => itemt.theater_branch_id === item.id
                              )
                              .map((time, index) => {
                                return (
                                  // <LinkButton
                                  //   key={index}
                                  //   to={`/booking/${time.id}`}
                                  //   className="btn btn--time mr-2 mb-2"
                                  // >
                                  //   <b>{time.time}</b>
                                  // </LinkButton>
                                    <button key={index}
                                    className={`btn--time mr-2 mb-2`}
                                    onClick={() => {
                                      handleChoiceShowsTime(time.id);
                                    }}
                                  >
                                    <b> {time.time}</b>
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      );
                    });
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ShowTimeMovie);
