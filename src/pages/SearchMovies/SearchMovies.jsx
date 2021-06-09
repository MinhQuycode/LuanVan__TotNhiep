import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import MovieItems from "../../components/Home/MovieItems/MovieItems";
import Loading from "../../Layouts/Loading/Loading";
import ScrollToTop from "../../Layouts/ScrollToTop/ScrollToTop";
export default function SearchMovies() {
  const history = useHistory();
  const searchMovies = useSelector((state) => state.movieSearch.movieSearch);
  const loading = useSelector((state) => state.movieSearch.loading);
  const error = useSelector((state) => state.movieSearch.error);
  const renderResultSearchMovie = () => {
    return searchMovies?.map((item, index) => {
      return (
        <div key={index} className="col-3">
          <MovieItems item={item} />
        </div>
      );
    });
  };
  if (loading) return <Loading />;
  if (typeof error === {}) {
    history.push("/home");
  }

  console.log(searchMovies);
  return (
    <div className="search__movie">
      <ScrollToTop />
      <p>KẾT QUẢ TÌM KIẾM</p>
      {searchMovies.length > 0 ? (
        <div className="row">{renderResultSearchMovie()}</div>
      ) : (
        <div>
          <p>Không có kết quả nào cho bạn !</p>
        </div>
      )}
    </div>
  );
}
