import React from 'react'
import carouselData from './CarouselData';
import Slider from "react-slick";
import VideoTrailer from '../VideoTrailer/VideoTrailer';

export default function CarouselItem() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        arrows: true,
    };
    const renderCarousel = () => {
        return (
            carouselData.map((item, index) => {
                return (
                    <VideoTrailer key={index} item={item}/>
                )
            })
        )
    }
    if (!Array.isArray(carouselData) || carouselData.length <= 0) {
        return null;
    }
    return (
        <section id="carousel">
                <Slider {...settings}>
                    {renderCarousel()}
                </Slider>
        </section>
    )
}

