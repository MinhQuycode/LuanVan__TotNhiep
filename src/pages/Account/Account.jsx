import React from 'react'
// import { getInforAccountAPI } from '../../redux/actions/inforAccount.action';
// import {useSelector} from "react-redux";
// import Loading from "./../../Layouts/Loading/Loading";
import { Redirect } from 'react-router';

export default function Account() {
    // const accountUser = useSelector(state => state.account);
    // useEffect(() => {
    //     const account = {
	// 		taiKhoan: JSON.parse(localStorage.getItem('userLogin')).taiKhoan,
	// 	};
    //     getInforAccountAPI(account)
    // }, [])
    // if(accountUser.loading) return (<Loading/>);
    const userSignIn = JSON.parse(localStorage.getItem('userLogin'));
    return userSignIn ?(
        <section id="account">
            API này có vấn đề.
        </section>
    ) : (
        <Redirect to="/"/>
    )
}
