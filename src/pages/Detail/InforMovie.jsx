import React, {useState,useEffect } from 'react'
import ModalVideo from 'react-modal-video';

export default function InforMovie(props) {
  //Lấy kích thước màn h
  const [isOpen, setOpen] = useState(false);

  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width
    };
  }

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

let col = "col-6";
windowDimensions.width <= 815 ?  col = "col-12" : col = "col-6";
let trailer = `${props.infor?.trailer.slice(32)}`
    return (
      <div className="row detail__trailer">
        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailer} onClose={() => setOpen(false)} />
        <div className={`${col} trailer`}>
          <img src={props.infor?.image}  alt="anh"/>
          <div className="booking">
            <a href="#lich">
              <button className="btn--booking mr-1">
                <i className="fas fa-money-check"></i>BOOKING
              </button>
            </a>
              <button type="button" className="btn--trailer" onClick={()=> setOpen(true)}>
                <i className="fas fa-play"></i>
                TRAILER
              </button>
          </div>
        </div>
        <div className={`${col} detail__text`}>
          <h2 className="info__tiltle">Thông tin phim</h2>
          <h5>{props.infor?.name}</h5>
          <p>
            <span>Mô tả :</span> {!props.infor?.content ? "Chưa có mô tả chi tiết, chúng tôi đang cập nhật !": `${props.infor?.content}`}
          </p>
          <p>
            <span>Đạo diễn :</span> {props.infor?.actors}
          </p>
          <p>
            <span>Thể loại :</span> {!props.infor?.type ? "Lãng mạn": `${props.infor?.type}` } 
          </p>
          <p>
            {!props.infor?.directors ? ("") : (<><span>Diễn viên :</span> {props.infor?.directors}</> ) }
          </p>
          <p>
            <span>Ngày khởi chiếu :</span> {props.infor?.release_date}
          </p>
          <p>
            <span>Thời lượng :</span> {props.infor?.time}
          </p>
          <p>
            <span>Ngôn ngữ :</span> {props.infor?.language}
          </p>
        </div>
      </div>
    );
}
