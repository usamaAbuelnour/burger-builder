import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { useState } from 'react';

const Layout = (props) => {

    const [showDrawer, setShowDrawer] = useState(false);

    const openDrawerHandler = () => setShowDrawer(true);

    const hideDrawerHandler = ()=> setShowDrawer(false);


    return (
        <>
            <Toolbar showDrawer={showDrawer} open={openDrawerHandler}/>
            <SideDrawer closeDrawer={hideDrawerHandler} showDrawer={showDrawer} />
            <main className={classes.content}>
                {props.children}
            </main>
        </>
    );
}

export default Layout;