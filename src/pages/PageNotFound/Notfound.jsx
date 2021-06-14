import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import notFound from "../../assets/images/notFound.png";
import { getInforAccountAPI } from '../../redux/actions/inforAccount.action';

export default function Notfound(props) {
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(getInforAccountAPI()); 
    }, [])
    return (
        <div id="notFound">
            {/* Không tồn tại trang {props.match.url} !!! */}
            <img src={notFound} alt="Notfound"/>
        </div>
    )
}
