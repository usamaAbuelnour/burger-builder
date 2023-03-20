import classes from './MenuButton.css';
import Menu from '../../../assets/images/menu.png';

export default function MenuButton (props) {
    return(
        <button className={classes.menuButton} onClick={props.open}>
            <img src={Menu} /></button>
    );
}