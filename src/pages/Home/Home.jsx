import React from 'react'
import CarouselItem from '../../components/Home/Carousel/CarouselItem';
import SlideMovie from '../../components/Home/SlideMovie/SlideMovie';
import SlideMobie from '../../components/Home/SlideMobie/SlideMobie';
import New from '../../components/Home/New/New';
import MovieTheater from '../../components/Home/MovieTheater/MovieTheater';
import ScrollToTop from "../../Layouts/ScrollToTop/ScrollToTop";


export default function Home(props) {
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
