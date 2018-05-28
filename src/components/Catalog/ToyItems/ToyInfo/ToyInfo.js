import React from 'react';
import classes from './ToyInfo.css';
import {Link} from 'react-router-dom';

const toyInfo = (props) => {
    let largeImg = null;
    if(props.changeImg) {
        largeImg = props.img1;
    } else if (!props.changeImg) {
        largeImg = props.img2;
    }

    return (
        <div className={classes.ToyInfo}>
            <Link to={'' + props.prevPath}><i className={classes.Arrow} /></Link>
            <h1>{props.name}</h1>
            <div className={classes.Pictures}>
                <img className={classes.Large} src={'' + largeImg} alt='Toy Img' />
                <img className={classes.Small} src={'' + props.img1} alt='Toy Img' onClick={props.onChangeImgHandler} />
                <img className={classes.Small} src={'' + props.img2} alt='Toy Img' onClick={props.onChangeImgHandler} />
            </div>
            <div className={classes.SideInfo}>
                <p>{props.description}</p>
                <p>${props.price}</p>
                <select onChange={props.changeQuantityHandler}>
                    <option value=''>Qty</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
                <p className={classes.Max}><i>Maximum 5 per customer</i></p>
                <button onClick={props.addCartHandler} disabled={!props.isValid}>Add to Cart</button>
            </div>
        </div>
    )
} 

export default toyInfo;