import classes from './spinner.css';

export default function Spinner(props) {
    const spinnerClasses = [classes.loader];
    if(props.ordersLoading) spinnerClasses.push(classes.order);
    return <div className={spinnerClasses.join(' ')}>Loading...</div>;

}