import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axiosFirebase from "../../../HttpRequests/axiosFirebaseDB";
import Spinner from "../../../components/UI/Spinner/spinner";
import Input from "../../../components/UI/Input/Input";
import { useSelector } from "react-redux";

export default function ContactData(props) {
    let navigate = useNavigate();

    const {token, userId} = useSelector(state=>state.authSlice);

    const {ingredients, total} = useSelector(state=>state.ingredientSlice);

    let [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            defaultValue: '',
            valid : false,
            validation: {
                required: true,
                minlength: 3
            }
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your E-mail'
            },
            defaultValue: '',
            valid : false,
            validation: {
                required: true
            }
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            defaultValue: '',
            valid : false,
            validation: {
                required: true
            }
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'cheapest'},
                    {value: 'fastest'}
                ]
            },
            defaultValue: 'cheapest',
            valid : true,
            validation: {
                required: true
            }
        }
    })







    const [formValidity, setFormValidity] = useState(false);

    const checkFormValidity = () =>{
        let validity = true;
        Object.keys(orderForm).map(key=>validity &= orderForm[key].valid);
        setFormValidity(!!validity);
        return !!validity;
    }


    //  checkformvalidity did update   LIFE SAVER 🥴
    useEffect(()=>{checkFormValidity()}, [orderForm]);




    const checkValidity = (value, rules) =>{
        let isValid = false;
        if(rules.required) isValid |= value.trim() !== ''; 
        if(rules.minlength) isValid &= value.trim().length >= rules.minlength;
        return isValid;
    }



    const changeHandler = (key, e) =>{
        let valueValidity = checkValidity(e.target.value, orderForm[key].validation);
        setOrderForm({...orderForm, [key]: {...orderForm[key], defaultValue: e.target.value
        , valid: !!valueValidity}});
    }
    const [loading, setLoading] = useState(false);

    const orderHandler = (e) => {
        e.preventDefault();

        let orderData = {};
        Object.keys(orderForm).map(key=>{
            orderData[key] = orderForm[key].defaultValue;
        })


        setLoading(true);
        let order = {ingredients, total, orderData, userId};

        axiosFirebase.post(`orders.json?auth=${token}`, order).then(()=>{
            setLoading(false); navigate('/');
        }, (_)=>setLoading(false));
    }

    if(!props.checkoutOpen) {navigate(-1); return null};



    let content = (
        <>
            <h3>Enter your Contact Data</h3>
            <form onSubmit={orderHandler}>
                {
                    Object.keys(orderForm).map(key=>{
                        return <Input 
                            key={key}
                            elementType={orderForm[key].elementType}
                            elementConfig={orderForm[key].elementConfig}
                            defaultValue={orderForm[key].defaultValue}
                            valid={orderForm[key].valid}
                            changed={changeHandler.bind(this, key)}
                            />
                    })
                }
                <Button type='success' disabled={!formValidity}>Order</Button>
                
            </form>
        </>
    );
    
    
    if(loading) content = <><h2>Please Wait</h2><Spinner /></>;
    
    

    return(
        <div className={classes.contactData}>
            {content}
        </div>
    );
}