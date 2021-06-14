import React,{useRef} from 'react';
import Countdown,{zeroPad}from "react-countdown";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from "sweetalert2";

export default function TimeBooking(props) {
    const history = useHistory();
    const stateStop = useSelector(state => state.chair.stopTimeBooking)
    const clockRef = useRef();
    const {controlled} = props;
    const handlePause = () => clockRef.current.pause(controlled);
    const renderer = ({ minutes, seconds, completed}) => {
        if (completed) {
          return <span>00:00</span>;
        } else {
          return (
            <span>
              {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
          );
        }
      };
    const handleCompleted = () => {
        Swal.fire({
          title: "Hết giờ",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          text: "Bạn có muốn đặt vé lại!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
        }).then((res) => {
          if (res.value) {
            window.location.reload();
          } else {
            history.push("/");
          }
        });
      };
      let dPlay = stateStop;
    return (
            <div className="col-5 time__booking text-right">
              <p>Thời gian giữ ghế</p>
              <div className={`${dPlay}`}>
                  <Countdown date={Date.now() + 180000} renderer={renderer} onComplete={handleCompleted} ref={clockRef}/>
              </div>
              <div className={`${dPlay==="d-none" ? "d-block" : "d-none"}`}>
                  <span style={{color:"red",fontSize:"30px",paddingRight:"2rem"}}>00:00</span>
              </div>
            </div>
    )
}
