import classes from './BuildControl.css';

export default (props)=>(
    <div className={classes.buildControl}>
        <div className={classes.label}>{props.label}</div>

        <button className={classes.less}
                onClick={props.remove} disabled={props.disabled}>Less</button>

        <button className={classes.more}
                onClick={props.add} >More</button>

    </div>
);