import React ,{useState,useEffect,memo} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { postTheaterGroup } from '../../redux/actions/showtimes.action';
import { postDateGroup } from '../../redux/actions/showtimes.action';
import { useHistory } from 'react-router-dom';
import {useParams} from "react-router-dom";
import { getShowTimeAPI } from "./../../redux/actions/showtimes.action";
import { getTheaterListAPI } from '../../redux/actions/theater.action';
import { getCinemasListAPI } from '../../redux/actions/cinemas.action';

function ShowTimeMovie(props) {
    const history = useHistory();
    const [isSelected,setIsSelected] = useState(0);
    const [isSelectedDate,setIsSelectedDate] = useState(0);
    const dispatch = useDispatch();
    const {idMovie} = useParams();

       //Lấy kích thước màn h
    const hasWindow = typeof window !== 'undefined';
    const getWindowDimensions = () => {
      const width = hasWindow ? window.innerWidth : null;
      return {
        width
      }
    };
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
      if (hasWindow) {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [hasWindow]);
    // console.log(windowDimensions);
    
    // Điều kiện chọn lịch chiếu
    const userSignIn = useSelector((state) => state.user.userSignin);
    const handleChoiceShowsTime = (id) => {
        if (userSignIn?.access_token.length > 0) {
          history.push({ pathname: `/booking/${id}`})
        } else {
          history.push({pathname: '/login'});
        } 
      };

    // Render theo rạp khi click
    const theaterChoose = useSelector(state => state.showTimes.theaterGroupChoosed);
    // console.log(theaterChoose);

    // Lấy lịch chiếu của phim  
    useEffect(() => {
      dispatch(getShowTimeAPI());
    }, [dispatch]);

    //Lấy thông tin rạp chiếu
    useEffect(() => {
      dispatch(getCinemasListAPI());
    }, [dispatch]);
    const theaterbranch = useSelector(state => state.cinemas.cinemasList);
    // console.log(theaterbranch);

    // Lấy thông tin rạp theo phim
    useEffect(() => {
      dispatch(getTheaterListAPI())
    }, [dispatch]);
    const theater = useSelector(state => state.theater.listTheater);

    const showTimes = useSelector(state => state.showTimes.showTimes);
    // console.log(showTimes);
    
    //Lọc danh sách lịch chiếu theo phim
    const showTimesMovie = showTimes?.filter(time => time.movies_id == idMovie);
    console.log(showTimesMovie);

    //RENDER THEATER
    // Lấy id theater
      let theaterId = showTimesMovie?.map(theater => theater.theaters_id);
      /* 
        let a = ["1", "1", "2", "3", "3", "1"];
        result a = [1,2,3]; 
      */
     //Tìm các giá trị khác trong mảng 
      let theaterid = theaterId?.filter((item, i, ar) => ar.indexOf(item) === i);
      // console.log(theaterid);
      const TheaterMovie = () =>{
        let arrTheater = [];
        for (let index = 0; index < theaterid?.length; index++) {
          const element = theaterid[index];
          // console.log(element);
          let id = theater.filter(item => item.id === element);
          // console.log(time)
          let arr = arrTheater.push(id);
        }
        return arrTheater;
      }
      let arrayTimeMovie = TheaterMovie();

      //RENDER SHOWTIME
      // Lấy date trong mảng
      let date = showTimesMovie?.map(dateItem => dateItem.date);
      // console.log(date)
      let dateShows = date?.filter((item, i, ar) => ar.indexOf(item) === i);
      // console.log(dateShows);
      let arrDate = [];
      let itemDate = dateShows?.map((item) => item.substring(5,10));
      let arr = arrDate.push(itemDate);
      // console.log(arrDate);
      const chooseDateGroup = (date,index)=>{
        setIsSelectedDate(index);
        dispatch(postDateGroup(date,index));
        console.log(date,index);
    }

      //REDER CINEMAS
      let cinemas = showTimesMovie?.map(item=>item.theater_branch_id);
      let cinemasId = cinemas?.filter((item,i,arr)=>arr.indexOf(item)===i);
      console.log(cinemasId);
      const TimeCinemas = () =>{
        let arrayTime = [];
        for (let index = 0; index < cinemasId?.length; index++) {
          const element = cinemasId[index];
          let arrTime = showTimesMovie.filter(item=> item.theater_branch_id === element);
          arrayTime.push(arrTime);
        }
        return arrayTime;
      }
      const arrtime = TimeCinemas();
      console.log(arrtime);




    // Change theater
    const chooseTheaterGroup = (id,logo,index)=>{
        setIsSelected(index);
        dispatch(postTheaterGroup(id,logo,index));
    }
    let nonClassActive = 'non_active_theater';
    let Active = 'active_theater';
    const renderTheater = () =>{
        return (
          arrayTimeMovie?.map((theater)=>{
                return (
                  theater.map((itemtt,index)=>{
                    return (
                  <div  key={index} className={`theater_item ${isSelected===index ? Active : nonClassActive}`}
                      onClick={()=>(
                         isSelected === index ? '':chooseTheaterGroup(itemtt.id,itemtt.logo,index)
                      )} 
                  >
                    <img src={itemtt?.logo} alt="anh"/>
                    <span style={{fontWeight:'bold'}}>{itemtt?.name}</span>
                  </div>
                    )
                  })
                  
                );
            })
        )
    };

let col1 = "col-4";
let col2 = "col-8";
windowDimensions.width <= 845 ?  col1 = "col-12" : col1 = "col-4";
windowDimensions.width <= 845 ?  col2 = "col-12" : col2 = "col-8";

    // const render
    return (
      <div className="row showsTime">
        <div className={`${col1} showTheater`}>{renderTheater()}</div>
        <div className={`${col2} showTime`}>
          <div className="row day">
            {arrDate?.map((date) => {
              return date?.map((item,index) => {
                return <div key={index} className={`col-2 day_show ${isSelectedDate===index ? Active : nonClassActive}`}
                onClick={()=>(
                  isSelectedDate === index ? '':chooseDateGroup(item,index)
                )}
                >{item}</div>;
              });
            })}
          </div>
              <div className="hour">
                <div className="hour__theater">
                  {cinemasId?.map((itemId) =>{
                    return (
                      theaterbranch?.filter((branch) => branch.id === itemId)
                      .map((item, index) => {
                        console.log(item)
                      return (
                        <div className="branch" key={index}>
                          <div className="branch--theater">
                            <img src={theaterChoose.logo} alt="anh" />
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
                          {
                            arrtime?.map((itemtime) =>{
                              console.log(itemtime)
                              return(
                                itemtime.filter(itemt => itemt.theater_branch_id === item.id)
                                .map((time,index)=>{
                                  return(
                                    <button key={index}
                                    className={`btn--time mr-2 mb-2`}
                                    onClick={() => {
                                      handleChoiceShowsTime(time.id);
                                    }}
                                  >
                                    <b> {time.time}</b>
                                  </button>
                                  )
                                })
                              )
                            })
                          }
                          </div>
                        </div>
                      );
                    })
                    )
                  })
                  }
                </div>
              </div>
        </div>
      </div>
    ); 
}

export default memo(ShowTimeMovie);
