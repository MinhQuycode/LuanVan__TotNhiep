import React,{useState} from 'react'
import play from '../../../assets/images/play.png';
import ModalVideo from 'react-modal-video';

export default function VideoTrailer(props) {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="trailer position-relative">
            <img  className="image" src={props.item?.hinhAnh} alt={props.item.tenPhim}/> 
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={props.item?.trailer} onClose={() => setOpen(false)} />
            <button className="btn__trailer" onClick={()=> setOpen(true)}>
                <img width="60px" src={play} alt="Play"/>
            </button>
        </div>
    )
}
