import {Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactData from "../../../containers/Checkout/ContactData/ContactData";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from './CheckoutSummary.css';
import { useSelector } from "react-redux";

export default function CheckoutSummary(props) {
    let navigate = useNavigate();
    const signInSource = useSelector(state=>state.authSlice.signInSource);

    let [checkoutOpen, setCheckoutOpen] = useState(false);
    
    const checkoutCloseHandler = () => setCheckoutOpen(false);



    const cancelHandler = () =>{
        if(signInSource==='button') navigate('/');
        else navigate(-1);
    }
    const continueHandler = () => {
        setCheckoutOpen(true);
        navigate('contact-data');
    }


    // Empty check when reloading checkout summary

    useEffect(()=>{
        let isEmpty = !Object.values(props.ing).reduce((sum, curr)=>sum+curr);
        if(isEmpty) navigate('/');
    }, []);

    

    return(
        <>
            <Backdrop checkoutOpen={checkoutOpen} checkoutClose={checkoutCloseHandler}/>
            <div className={classes.checkoutSummary}>
                <h1> We hope it tastes well!</h1>
                <Burger ing={props.ing} />
                <div className={classes.buttons}>
                    <Button type='danger' clicked={cancelHandler}>Cancel</Button>
                    <Button type='success' clicked={continueHandler}>Continue</Button>
                </div>
                <Routes>
                    <Route path='contact-data' element={<ContactData checkoutOpen={checkoutOpen}/>} />
                </Routes>
            </div>
        </>
    );
}