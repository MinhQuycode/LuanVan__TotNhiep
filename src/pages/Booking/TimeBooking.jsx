import React,{useRef} from 'react';
import Countdown,{zeroPad}from "react-countdown";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from "sweetalert2";

export default function TimeBooking(props) {
    const history = useHistory();
    const clockRef = useRef();
    const {controlled} = props;
    console.log(controlled);
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
    return (
            <div className="col-6 time__booking text-right">
              <p>Thời gian giữ ghế</p>
              <Countdown date={Date.now() + 150000} renderer={renderer} onComplete={handleCompleted} ref={clockRef}/>
              {/* <button className="btn btn-infor" onClick={()=>{
                {handlePause()}
              }}>Pause</button> */}
            </div>
    )
}
