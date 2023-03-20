import Logo from "../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import classes from './SideDrawer.css';
import Backdrop from "../../UI/Backdrop/Backdrop";

export default function SideDrawer(props) {

    let styles = [classes.sideDrawer]; 
    
    if(!props.showDrawer)
        styles.push(classes.close);
    else
        styles.push(classes.open);

    return (

        <>
            <Backdrop close={props.closeDrawer} hide={props.showDrawer}/>
            <div className={styles.join(' ')}>
                <Logo height='11%' />
                <nav>
                    <NavItems closeDrawer={props.closeDrawer}/>
                </nav>
            </div>
        </>
    );
}