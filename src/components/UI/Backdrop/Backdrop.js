import classes from './Backdrop.css';

export default (props)=>(
    <div className={[classes.backdrop, !props.hide ? classes.close : null,
        props.purchase || props.checkoutOpen ? classes.open : null].join(' ')}
        onClick={props.close || props.checkoutClose}>
            
        </div>
);