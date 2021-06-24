import React, { useEffect } from 'react'

export default function Pay() {
    const getLink = JSON.parse(localStorage.getItem("payLink"))
    useEffect(() => {
        if(getLink){
        window.location.replace(getLink);
    }
    }, [])
    return (
        <div style={{marginTop:"3rem"}}>
            
        </div>
    )
}
