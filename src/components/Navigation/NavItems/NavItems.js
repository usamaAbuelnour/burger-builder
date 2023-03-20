
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Navitems.css';
import { signOut, signInSource } from '../../../store/slices/authSlice';
import { clearIngredients } from '../../../store/slices/ingredientSlice';
import {clearOrders} from '../../../store/slices/ordersSlice';

export default function NavItems(props) {
    const token = useSelector(state=>state.authSlice.token);
    const dispatch = useDispatch();
    const signOutHandler = () =>{
        dispatch(signOut());
        dispatch(clearIngredients());
        dispatch(clearOrders());
        
    }


    return (
        <ul className={classes.navItems}>
            <li>
                <NavLink to='' onClick={props.closeDrawer}>Burger Builder</NavLink>
                {
                    token ?
                        <>
                            <NavLink to='orders' onClick={props.closeDrawer}>Orders</NavLink>
                            {
                                props.closeDrawer ?
                                    <NavLink to='auth' onClick={()=>{signOutHandler(); props.closeDrawer()}} >Sign Out</NavLink>
                                 :    
                                    <NavLink to='auth' onClick={()=>{signOutHandler()}} >Sign Out</NavLink>
                            }
                        </>
                        :
                            props.closeDrawer ?
                                 <NavLink to='auth' onClick={()=>{dispatch(signInSource('link')); props.closeDrawer()}}>Sign In</NavLink>
                            
                            :
                                 <NavLink to='auth' onClick={()=>{dispatch(signInSource('link'));}}>Sign In</NavLink>
                        
                    
                }
            </li>
        </ul>
    );
}