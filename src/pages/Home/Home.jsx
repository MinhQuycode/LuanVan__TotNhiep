import React,{useEffect} from 'react'
import {useDispatch} from "react-redux";
import CarouselItem from '../../components/Home/Carousel/CarouselItem';
import SlideMovie from '../../components/Home/SlideMovie/SlideMovie';
import SlideMobie from '../../components/Home/SlideMobie/SlideMobie';
import New from '../../components/Home/New/New';
import MovieTheater from '../../components/Home/MovieTheater/MovieTheater';
import ScrollToTop from "../../Layouts/ScrollToTop/ScrollToTop";
import {getInforAccountAPI} from "./../../redux/actions/inforAccount.action";


export default function Home(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInforAccountAPI())
      }, [])
    return (
        <>
            <ScrollToTop/>
            <CarouselItem/>
            <SlideMovie/>
            <MovieTheater/>
            <New/>
            <SlideMobie/>
        </>
    )
    
}
