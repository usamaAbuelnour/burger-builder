import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import {useState, useEffect} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import axiosFirebase from "../../HttpRequests/axiosFirebaseDB";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import * as ingredientsActions from '../../store/slices/ingredientSlice';

function BurgerBuilder() {
    const {ingredients, total} = useSelector(state=>state.ingredientSlice);
    const dispatch = useDispatch();

     

    const [purchase, setPurchase] = useState(false);
    const [error, setError] = useState({state: false, message: null});

    useEffect(()=>{
        axiosFirebase.interceptors.response.use(null, err=>{
            setError({state: true, message: err.code});
            return Promise.reject();
        })
    }, []);

    const disabled = {...ingredients};
    for(let key in disabled){

        disabled[key] = disabled[key] === 0
    }

    const calc =(type)=>{
        let price;
        switch(type){
            case 'salad':
                price =  2.5;
            break;
            case 'bacon':
                price = 5;
            case 'cheese':
                price =  3.5;
            break;
            case 'meat':
                price = 9.5;
            break;
        }
        return price;
    }

    const addHandler =(type)=>{
        dispatch(ingredientsActions.addIngredient({ingType: type, ingPrice: calc(type)}));
    }

    const removeHandler =(type)=>{
        dispatch(ingredientsActions.removeIngredient({ingType: type, ingPrice: calc(type)}));
    }

    const purchaseHandler = ()=> setPurchase(true);



    const purchaseCancelHandler = () => setPurchase(false);

    let navigate = useNavigate();

    const continueHandler = () =>  navigate('checkout');
    
    return (
        <>
            <Modal ing={ingredients} purchase={purchase} close={purchaseCancelHandler} 
            total={total} continue={continueHandler} err={error} />
            <Burger ing={ingredients}/>
            <BuildControls add={addHandler} remove={removeHandler}
             disabled={disabled} total={total}
             purchase={purchaseHandler} />
        </>
    )
}

export default BurgerBuilder;