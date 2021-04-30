import React,{useEffect} from 'react'
import { getInforAccountAPI } from '../../redux/actions/inforAccount.action';
import {useSelector,useDispatch} from "react-redux";
import Loading from "./../../Layouts/Loading/Loading";
import { Redirect } from 'react-router';

export default function Account() {
    const userSignIn = JSON.parse(localStorage.getItem('userLogin'));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getInforAccountAPI());
    }, []); //Lỗi 
    return userSignIn ?(
        <section id="account">
        </section>
    ) : (
        <Redirect to="/"/>
    )
}
