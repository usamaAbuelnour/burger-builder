import classes from './Order.css';
export default function Order(props) {
    let ingredients = Object.keys(props.ing)
    .map(key=><li key={key}><span style={{textTransform: 'capitalize'}}>
        {key}</span>: &nbsp;{props.ing[key]}</li>)
    let total = props.total;
    return(
        <div className={classes.order}>
            <h3>Ingredients :</h3>
            <ul>
                {ingredients}
            </ul>
            <strong>Total: {total} $</strong>
        </div>
    );
}