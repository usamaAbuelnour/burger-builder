import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSource } from '../../../store/slices/authSlice';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

export default function BurgerControls(props){
    const dispatch = useDispatch();
    const token = useSelector(state=>state.authSlice.token);
    const navigate = useNavigate();

    const signInToOrderHandler = () =>{
        navigate('/auth');
        dispatch(signInSource('button'));
    }

    return(
    <div className={classes.buildControls}>

        <h2>Total Price: {props.total} $</h2>

        {controls.map(el=><BuildControl
         key={el.label}
         label={el.label} 
         add={props.add.bind(this, el.type)}
         remove={props.remove.bind(this, el.type)}
         disabled={props.disabled[el.type]} />)}

        <button className={classes.orderButton}
         disabled={Object.values(props.disabled).reduce((prev, curr)=>prev&curr, true)}
          onClick={token ? props.purchase :signInToOrderHandler}>{token ? 'Order Now' : 'Sign In to Order'}</button>

    </div>
    );
};