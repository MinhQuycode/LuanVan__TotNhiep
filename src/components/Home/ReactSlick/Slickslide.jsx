import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Slider from "react-slick";
import { getMovieListAPI } from '../../../redux/actions/movie.action';
import MovieItems from '../MovieItems/MovieItems';
import {connect} from 'react-redux';
import Loading from './../../../Layouts/Loading/Loading'


function Slickslide(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieListAPI());
    },[]);
    const renderListMovie = () =>{
        return (
            props.movieDetail?.map((item,index) =>{
                return (
                    <MovieItems item={item}  key={index}/>
                )           
            } )
        )
        
    }

    const settings = {
        rows:2,
        dots: false,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll:4,
        autoplay: true,
        arrows: true,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    };

    if(props.loading) return <Loading/>
    return (
        <section id="slide__movie">
            <ul className="nav nav-pills justify-content-center title">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="pill" href="#dangChieu" style={{color:'orangered',fontWeight:"bold"}}>Đang chiếu</a>
                </li>
            </ul>
            <div className="tab-content slideMovie__item">
                <div className="tab-pane active" id="dangChieu">
                    <Slider {...settings}>
                        {renderListMovie()}
                    </Slider>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state) =>({
    movieDetail : state.movie.movieList,
    loading : state.movie.loading,
});

export default connect(mapStateToProps)(Slickslide);