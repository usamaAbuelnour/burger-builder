import { useEffect } from "react";
import Spinner from "../../components/UI/Spinner/spinner";
import Order from "../Layout/Order/Order";
import { useSelector, useDispatch } from "react-redux";
import { ordersThunk } from "../../store/slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import classes from './Orders.css';

export default function Orders() {
    const navigate = useNavigate();
    let orders = useSelector(state=>state.ordersSlice);
    const {token, userId} = useSelector(state=>state.authSlice);
    const dispatch = useDispatch();
    let myOrders;
    
    
    useEffect(()=>{
         dispatch(ordersThunk({token, userId}));
         if(!token) navigate('/auth');
    }, []);
    
    if(!orders) orders = <Spinner />;
    else if(orders.length === 0) myOrders = <h1 className={classes.heading}>Sorry, No Orders!</h1>;
    else {
        myOrders = orders.map(el=>el.map((el,i)=>{
            if(i===2)
                return <Order key={Math.random()} ing={el.ing} total={el.total} />
        }))
    }
    return myOrders ? myOrders :<Spinner ordersLoading={true}/>;


}
