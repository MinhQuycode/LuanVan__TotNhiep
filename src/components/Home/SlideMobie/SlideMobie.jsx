import React from 'react'
import Slider from "react-slick";
import slideMobileData from './DataSlideMobie'

export default function SlideMobie() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    const renderSlideMobile = () => {
        return (
            slideMobileData.map((slide, index) => {
                return (
                    <div key={index}>
                        <img className="img-fluid img__mobile" src={slide.hinhAnh}  alt="anh"/>
                    </div>
                )
            })
        )
    }
    return (
        <section id="ungdung">
            <div className="row ungdung__mobile">
                <div className="col-sm-12 col-md-6  text-center text__title">
                    <p className="title_ungdung">Ứng dụng tiện lợi dành cho</p>
                    <p className="title_ungdung">người yêu điện ảnh</p><br />
                    <p className="subtitle">Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p><br />
                    <button className="btn_ungdung">App miễn phí - Tải về ngay!</button>
                    <p className="subtitle">TIX có hai phiên bản <a href="#!">iOS</a> &amp;<a href="#!">Android</a>
                    </p>
                </div>
                <div className="col-sm-12 col-md-6 text-center">
                    <div className="mobile">
                        <Slider {...settings}>
                            {renderSlideMobile()}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>

    )
}
