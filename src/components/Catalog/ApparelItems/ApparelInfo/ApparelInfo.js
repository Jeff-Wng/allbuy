import React from 'react';
import classes from './ApparelInfo.css';
import {Link} from 'react-router-dom';

const apparelInfo = (props) => {
    let largeImg = null;
    // Changes preview image
    if(props.changeImg) {
        largeImg = props.img1;
    } else if (!props.changeImg) {
        largeImg = props.img2;
    }

    let sizes = [];
    // Retrieve available sizes and stored in array
    for(let key in props.sizes) {
        sizes.push(props.sizes[key]);
    }

    // Map those sizes into a dropdown
    let choices = sizes.map(choices => {
        return <option value={'' + choices} key={choices}>{choices}</option>
    })

    return (
        <div className={classes.ApparelInfo}>
            {/* Back button to return to previous page */}
            <Link to={'' + props.prevPath}><i className={classes.Arrow} /></Link>
            <h1>{props.name}</h1>
            <div className={classes.Pictures}>
                <img className={classes.Large} src={'' + largeImg} alt='Apparel Img' />
                <img className={classes.Small} src={'' + props.img1} alt='Apparel Img' onClick={props.onChangeImgHandler} />
                <img className={classes.Small} src={'' + props.img2} alt='Apparel Img' onClick={props.onChangeImgHandler} />
            </div>
            <div className={classes.SideInfo}>
                <p>{props.description}</p>
                <p>${props.price}</p>
                <select className={classes.Sizes} name='size' onChange={props.onChangeHandler}>
                    <option value=''>Size</option>
                    {choices}
                </select>
                <select name='quantity' onChange={props.onChangeHandler}>
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

export default apparelInfo;