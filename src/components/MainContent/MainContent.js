import React from 'react';
import classes from './MainContent.css';
import {Link} from 'react-router-dom';

const mainContent = () => {
    return (
        // Homepage, displays all categories with over lay
        <div className={classes.mainContent}>
            <div className={classes.Apparel}>
                <Link to='/apparel'>
                    <div className={classes.Overlay}>Apparel</div>
                </Link>
                <img src={require('../../imgs/ApparelBanner.jpg')} alt='Apparel'/>
            </div>
            <div className={classes.Games}>
                <Link to='/games'>
                    <div className={classes.Overlay}>Games</div>
                </Link>
                <img src={require('../../imgs/GamesBanner.jpg')} alt='Apparel'/>
            </div>
            <div className={classes.Collectables}>
                <Link to='/toys'>
                    <div className={classes.Overlay}>Toys</div>
                </Link><img src={require('../../imgs/CollectablesBanner.jpg')} alt='Apparel'/>
            </div>
        </div>
    )
}

export default mainContent;