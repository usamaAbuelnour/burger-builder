import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

export default function Checkout() {
    const ingrediens = useSelector(state=>state.ingredientSlice.ingredients);
    return(
        <div> 
            <CheckoutSummary ing={ingrediens}/>
        </div>
    );
}