import React,{memo} from 'react'
// import star1 from '../../../assets/images/star1.png'
// import star2 from '../../../assets/images/star2.png'
import {useHistory} from "react-router-dom";

function MovieItems(props) {
    const history = useHistory();
    
    const handleClickMovie = (idMovie) =>{
        history.push({pathname : `/detail/${idMovie}`});
    }
    return (
        <div className="movieItem" onClick={()=>{
            handleClickMovie(props.item.id)
        }}>
        <div className="movieItem__img">
            <a className="img__link">
                <img className="img-fluid img__movie" src={props.item.image} alt="anh"/>
            </a>
        </div>
        <div className="showing__head">
            <span className="showing__age">{props.item.age_type.substring(0,3)}</span>
            <div className="nameMovie">
                {props.item.name}
            </div>
            <div className="showing__point">
                <div className="star">
                    {props.item.time}
                </div> 
            </div>
        </div>
        <div className="showing__btn">
            <button className="btn__movie" onClick={()=>{
                handleClickMovie(props.item.maPhim)
            }}>
                MUA VÉ
            </button>
        </div>
        
    </div>
    )
}
export default memo(MovieItems);