import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Ordered.css';
import {Link} from 'react-router-dom';

const ordered = () => {
    return (
        <React.Fragment>
            <Navbar />
            <div className={classes.Ordered}>
               <p className={classes.Title}>Thank you for your shopping with us!</p>
               <p>Your items will arrive in approximately <strong>NEVER</strong></p>
               <Link to='/'>Return to homepage</Link>
            </div>
        </React.Fragment>
    )
}

export default ordered;