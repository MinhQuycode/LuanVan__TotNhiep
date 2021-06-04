import React, { useEffect } from "react";
import { getShowTimeAPI } from "../../../redux/actions/showtimes.action";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function TimeMovie() {
  const history = useHistory();
  const idTheaterChoose = useSelector(
    (state) => state.showTimes.idTheaterChoose
  );
  // console.log(idTheaterChoose)
  const codeTheater = useSelector(
    (state) => state.showTimes.theaterGroupChoosed
  );

  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.user.userSignin);
  // console.log(userSignIn);

  const handleChoiceShowsTime = (id) => {
    if (userSignIn?.access_token?.length > 0) {
      history.push({ pathname: `/booking/${id}` });
    } else {
      history.push({ pathname: "/login" });
    }
  };

  useEffect(() => {
    dispatch(getShowTimeAPI());
  }, [dispatch]);

  const movie = useSelector((state) => state.movie.movieList);
  // console.log(movie);

  //Lấy thời gian lịch chiếu
  const stateShowtime = useSelector((state) => state.showTimes.showTimes);
  // console.log(stateShowtime);

  //Lấy lịch chiếu theo rạp cụ thể
  let theaterTheoHeThong = stateShowtime?.filter(
    (tile) =>
      tile.theaters_id === codeTheater.maHeThongRap &&
      tile.theater_branch_id === idTheaterChoose
  );

  //Lọc ra nhưng phim khác nhau theo lịch chiếu của Rạp
  // Lấy id theater
  let MovieId = theaterTheoHeThong?.map((Idmovie) => Idmovie.movies_id);
  // console.log(MovieId);

  let movieTheater = MovieId?.filter((item, i, ar) => ar.indexOf(item) === i);
  // console.log(movieTheater);

  const TimOfMovie = () => {
    let arrTimeMovie = [];
    for (let index = 0; index < movieTheater?.length; index++) {
      const element = movieTheater[index];
      // console.log(element);
      let time = theaterTheoHeThong.filter(
        (item) => item.movies_id === element
      );
      // console.log(time)
      let arr = arrTimeMovie.push(time);
    }
    return arrTimeMovie;
  };
  let arrayTimeMovie = TimOfMovie();

  const renderShowTimes = () => {
    return movieTheater?.map((showTime, index) => {
      return (
        <div key={index} className="chieu">
          {movie
            ?.filter((item) => item.id === showTime)
            .map((img, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-4">
                    <p
                      className="name_movie text-center"
                      style={{ fontWeight: "bold", color: "orangered" }}
                    >
                      {img.name}
                    </p>
                    <img src={img.image} alt="anh" />
                    <div
                      className="mt-2 text-center"
                      style={{ fontWeight: "bold", fontSize: 20 }}
                    >
                      2D Digital
                    </div>
                  </div>
                  <div className="col-8 info_lich">
                  <p className="text-center mr-4" style={{fontWeight:"bold",fontSize:12}}>
                      LỊCH CHIẾU
                  </p>
                  <div className="lich__chieu__phim">
                    {arrayTimeMovie?.map((item) => {
                      return item
                        .filter((date) => date.movies_id === img.id)
                        .map((times, index) => {
                          return (
                                <button
                                  key={index}
                                  className="btn__time m-2"
                                  onClick={() => {
                                    handleChoiceShowsTime(times.id);
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "green",
                                    }}
                                  >
                                    {times.time}~
                                  </span>
                                  {times.date.substring(8, 10)}-
                                  {times.date.substring(5, 7)}
                                </button>
                          );
                        });
                    })}
                  </div>
                  </div>
                </div>
              );
            })}
        </div>
      );
    });
  };
  return stateShowtime?.length > 0 ? (
    <div className="col-lg-6 col-md-12 lich__chieu">
      <div className="lich">{renderShowTimes()}</div>
    </div>
  ) : (
    <div></div>
  );
}
export default React.memo(TimeMovie);
