import React, {useEffect,useState} from 'react'
import { getTheaterListAPI } from '../../../redux/actions/theater.action';
import {useSelector,useDispatch} from 'react-redux'
import { postTheaterGroup } from '../../../redux/actions/showtimes.action';
import Theater from './Theater';
import TimeMovie from './TimeMovie';
import {postShowTimesChoose} from "./../../../redux/actions/showtimes.action";

function MovieTheater(props) {
    const [isSelected, setIsSelected] = useState(0);
    const dispatch = useDispatch();
    const listTheater = useSelector(state => state.theater.listTheater);
    const listCinemas = useSelector(state => state.cinemas.cinemasList);
    // console.log(listTheater);
    // console.log(listCinemas);
    useEffect(() => {
        dispatch(getTheaterListAPI());
        if (listCinemas?.length > 0) dispatch(postShowTimesChoose(listCinemas[0].id));
    }, [dispatch, listCinemas]);

    let nonClassActive = 'non_active_theater';
    let Active = 'active_theater'

    const chooseTheaterGroup = (id, logo, index) => {
		setIsSelected(index);
		dispatch(postTheaterGroup(id,logo));
	};

    const renderTheater = () => {
        return (
            listTheater?.map((theater,index) =>{
                // console.log(theater)
                return (
                    <div key={index} className={`col-2 cumrap__item ${isSelected===index ? Active : nonClassActive}`}  
                    onClick={() => (isSelected === index ? '' : chooseTheaterGroup(theater.id,theater.logo, index))}>
                        <img src={theater.logo} alt="anh"/>
                    </div>
                )
            })
        )
    }
    return (
        <section id="cumrap">
            <h3 className="title__cumrap">Cụm rạp</h3>
            <div className="row cumrap__main">
                {renderTheater()}
            </div>
            <div className="row chon__rap">
                <Theater/>
                <TimeMovie/>     
            </div>     
        </section>
    )
}
export default React.memo(MovieTheater);