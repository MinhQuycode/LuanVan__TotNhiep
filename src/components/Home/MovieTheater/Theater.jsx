import React, { useEffect,useState } from 'react';
import { getCinemasListAPI } from '../../../redux/actions/cinemas.action';
import {useSelector,useDispatch} from "react-redux";
import { postShowTimesChoose } from '../../../redux/actions/showtimes.action';


function Theater() {
    const stateTheater = useSelector(state => state.cinemas.cinemasList);
    const logoTheater = useSelector(state => state.showTimes.theaterGroupChoosed);
    const [isRowSelected, setIsRowSelected] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCinemasListAPI());
  }, []);

    const chooseTheater = (idTheaterChoosed, index) => {
      setIsRowSelected(index);
      dispatch(postShowTimesChoose(idTheaterChoosed));
    };
    let nonClassActive = 'non_active_theater';
    let Active = 'active_theater'
    let theaterTheoHeThong = stateTheater?.filter((tile) => tile.theaters_id === logoTheater.maHeThongRap)
    const renderTheater = () =>{
        return (
          theaterTheoHeThong?.map((cinemas,index) =>{
                // console.log(cinemas)
                return (
                  <div key={index} className={`chon__item ${isRowSelected===index ? Active : nonClassActive}`}  
                  onClick={() => (isRowSelected === index ? '' : chooseTheater(cinemas.id,index))}>
                    <img src={logoTheater.logo} alt="anh"/>
                    <div className="detail__rap">
                      <h5 className="tenRap">{cinemas.name}</h5>
                      <p className="diaChi">
                        {cinemas.address}
                      </p>
                    </div>
                  </div>
                );
            })
        )
    }
    return (
        <div className="col-lg-6 col-md-12 rap">
        <div className="row chon__tenRap">
            {renderTheater()}
        </div>
    </div>
    )
}
export default React.memo(Theater);