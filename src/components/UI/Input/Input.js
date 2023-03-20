import classes from './Input.css';

export default function Input(props) {
    let inputElement = null;
    let inputClasses = [classes.inputElement];
    if(!props.valid) inputClasses.push(classes.invalid);
    switch(props.elementType) {
        case 'input' :
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} 
            defaultValue={props.defaultValue} onChange={props.changed}/>;
            break;
        case 'textarea' :
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} 
            defaultValue={props.defaultValue} onChange={props.changed}/>;
            break;
        case 'select' :
            inputElement = <select className={classes.inputElement} onChange={props.changed}>
                {props.elementConfig.options.map(el=><option key={el.value}>{el.value}</option>)}
            </select>
            break;
            
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig}
             defaultValue={props.defaultValue} onChange={props.changed}/>;
    }

    return(
        <div className={classes.input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
}