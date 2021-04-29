import React from 'react'
import notFound from "../../assets/images/notFound.png";

export default function Notfound(props) {
    return (
        <div id="notFound">
            {/* Không tồn tại trang {props.match.url} !!! */}
            <img src={notFound} alt="Notfound"/>
        </div>
    )
}
