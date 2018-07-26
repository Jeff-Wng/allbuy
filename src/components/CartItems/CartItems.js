import React from 'react';
import classes from './CartItems.css';

const cartItems = (props) => {
    return (
        <div className={classes.CartItems}>
            <div className={classes.LeftContent}>
                <img src={'' + props.img} alt='Product Img' />
                <div className={classes.Info}>
                    <h2>{props.name}</h2>
                    {/* ToFixed for better currency format */}
                    <p>Price: ${(props.price * props.quantity).toFixed(2)}</p>
                    {props.size ? <p>Size: {props.size}</p> : null}
                    {props.platform ? <p>Platform: {props.platform}</p> : null}
                    <p>Qty: {props.quantity}</p>
                </div>
            </div>
            {/* Trash icon to delete item from cart */}
            {!props.isCheckout ? <i className="fas fa-trash-alt fa-2x" onClick={props.deleteHandler}></i> : null}
        </div>
    )
}

export default cartItems;