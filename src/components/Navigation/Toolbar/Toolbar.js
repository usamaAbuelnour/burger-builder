import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import MenuButton from '../MenuButton/MenuButton';

export default function Toolbar(props){
    return (
        <header className={classes.toolbar}>
            <MenuButton  showDrawer={props.showDrawer} open={props.open}/>
            <Logo height='80%' style={classes.logo}/>
            <nav className={classes.hide}>
                <NavItems />
            </nav>
        </header>
    );
}