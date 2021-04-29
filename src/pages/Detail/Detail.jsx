import React from 'react'
import InforMovie from './InforMovie'
import ShowTimeMovie from './ShowTimeMovie'
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getMovieListAPI } from "./../../redux/actions/movie.action";
import ScrollToTop from '../../Layouts/ScrollToTop/ScrollToTop';
import Loading from '../../Layouts/Loading/Loading';
import Notfound from '../PageNotFound/Notfound';

export default function Detail(props) {
    let error = useSelector((state) => state.inforMovie.error);
    const {idMovie} = useParams();
    // console.log(idMovie)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieListAPI());        
    },[dispatch]);

    const inforMovie = useSelector(state => state.movie.movieList);
    // console.log(inforMovie);
    const loading = useSelector(state => state.movie.loading);

    let movie = inforMovie?.find(movieItem => movieItem.id == idMovie);
    // console.log(movie);

    if(error) return (<Notfound/>) 
    if(loading === true) return (<Loading/>) 
    return (
        <div id="detail">
            <ScrollToTop/>
            <InforMovie infor={movie}/>
            <p id="lich">Lịch chiếu</p>
            <ShowTimeMovie showTime={inforMovie}/>
        </div>
    )
}
