import BurgerLogo from '../../../assets/images/127 burger-logo.png';
import classes from './Logo.css';

export default function Logo(props) {
    return (
        <div className={[classes.logo, props.style].join(' ')} style={{height: props.height}}>
            <img src={BurgerLogo} />
        </div>
    );
}