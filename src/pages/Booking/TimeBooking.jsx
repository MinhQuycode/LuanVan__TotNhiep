import React from 'react';
import Countdown, { zeroPad }from "react-countdown";
import { useHistory } from 'react-router';
import Swal from "sweetalert2";

export default function TimeBooking() {
    const history = useHistory();
    const renderer = ({ minutes, seconds, completed }) => {
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
              <Countdown date={Date.now() + 90000} renderer={renderer} onComplete={handleCompleted}/>
            </div>
    )
}
