import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { bookChairAction } from "../../redux/actions/booking.action";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";


export default function ChairRoom(props) {
    const {chair} = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const chairBooking = useSelector(state => state.chair.chairBooking);
    const  renderRowChair = () => {

        let theMiddle = Math.floor(chair.length / 2);

        return (
            chair?.map((item,index) =>{
                // console.log(item)
                let disabled = false;
                let loaiGhe = "";
                if(item.seat_type.type === "standard"){
                    loaiGhe = 'gheThuong';
                }
                if(item.seat_type.type === "vip"){
                    loaiGhe = 'gheVip';
                }
                if(item.daDat){
                    loaiGhe = 'daDat';
                    disabled = true;
                }
                //Xét trạng thái ghê đang đặt
                let cssGheDangDat = "";
                let indexGheDangDat = chairBooking.findIndex(gheDangDat => gheDangDat?.maGhe === item?.maGhe);
                // console.log(indexGheDangDat)
                if(indexGheDangDat !== -1){
                    cssGheDangDat = "dangChon";
                }
                let ghe ;
                if (indexGheDangDat !== -1) {
                    ghe = item.tenGhe
                }
                let gheMid = "";
                if (item.number === theMiddle){
                    gheMid = "gheGiua";
                }
                return (
                        <button disabled={disabled} className={`ml-2 ghe ${gheMid} ${loaiGhe} ${cssGheDangDat}`} key={index} onClick={() =>{
                            if(chairBooking.length < 5){
                            dispatch(bookChairAction(item.id,item.seat_type.price,item.number,item.row,history));
                            }else{
                                Swal.fire({
                                    title: "Bạn không thể chọn quá 5 ghế",
                                    icon: "warning",
                                    confirmButtonText: "Oke",
                                })
                            }
                        }
                        }>
                            {ghe}
                        </button>
                )
            })
        )
    }
    
    return (
            <div className="chairRoom">
                {renderRowChair()}
            </div>
    );
}
