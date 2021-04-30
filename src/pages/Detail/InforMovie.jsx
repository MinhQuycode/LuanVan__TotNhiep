import React, {useState,useEffect } from 'react'
import ReactPlayer from 'react-player';

export default function InforMovie(props) {
  //Lấy kích thước màn h
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
// console.log(windowDimensions);

let col = "col-6";
windowDimensions.width <= 815 ?  col = "col-12" : col = "col-6";

const renderStar = (n) =>{
  var ListProduct = [];
  for (var i = 0; i < n; i++) {
    ListProduct = ListProduct.concat(<i key={i} style={{ color: "white",height:'17px' }} className="fas fa-star"></i>);
  };
  return ListProduct;
}

const getRandomInt = () => {
  return Math.floor(Math.random() * 5) + 1;
}
const n = getRandomInt();

    return (
      <div className="row detail__trailer">
        <div className={`${col} trailer`}>
          <img src={props.infor?.image}  alt="anh"/>
          <div className="booking">
            <a href="#lich">
              <button className="btn--booking mr-1">
                <i className="fas fa-money-check"></i>BOOKING
              </button>
            </a>
              <button type="button" className="btn--trailer" data-toggle="modal" data-target=".bd-example-modal-lg">
                <i className="fas fa-play"></i>
                TRAILER
              </button>
              <div
                className="modal fade bd-example-modal-lg"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <ReactPlayer width="100%" height="460px" controls url={props.infor?.trailer}/>
                </div>
                </div>
              </div>
          </div>
        </div>
        <div className={`${col} detail__text`}>
          <h3>{props.infor?.name}</h3>
          <p>
            <span>Mô tả :</span> {props.infor?.content}{" "}
          </p>
          <p>
            <span>Đạo diễn :</span> {props.infor?.actors}
          </p>
          <p>
            <span>Thể loại :</span> {props.infor?.type === "" ? "Lãng mạn": `${props.infor?.type}` } 
          </p>
          <p>
            <span>Diễn viên :</span> {props.infor?.directors === "" ? "Trấn Thành" : `${props.infor?.directors}` } 
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
          <p>
            <span>Đánh giá :</span> 
            {renderStar(n)}
          </p>
        </div>
      </div>
    );
}