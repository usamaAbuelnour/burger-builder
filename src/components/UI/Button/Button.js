import classes from './Button.css';

export default (props)=>{
    let buttonClasses = [classes.button, classes[props.type]];
    if(props.switch) buttonClasses.push(classes.switch)
    if(props.signOut) buttonClasses.push(classes.signOut)
    return(
        <button className={buttonClasses.join(' ')}
        onClick={props.clicked || props.close} disabled={props.disabled} >

            {props.children}

        </button>
    );
}