import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import 'firebase/database';

export const cartSuccess = (keys, cart, totalPrice) => {
    return {
        type: actionTypes.CART_SUCCESS,
        keys: keys,
        cart: cart,
        totalPrice: totalPrice.toFixed(2)
    }
}

export const deleteSuccess = () => {
    return {
        type: actionTypes.DELETE_SUCCESS
    }
}

export const getCart = () => {
    return dispatch => {
        let totalPrice = null;
            let dataRef = firebase.database().ref();
            dataRef.once('value')
                .then(snapshot => {
                    if(snapshot.child("Cart").exists()) {
                        let ref = firebase.database().ref("Cart").orderByKey();
                            ref.once('value')
                                .then(response => {
                                    let fetchedInfo = [];
                                    let keys = [];
                                    for(let key in response.val()) {
                                        keys.push(key);
                                        fetchedInfo.push(response.child(key).val());
                                        totalPrice += response.child(key).val().price * response.child(key).val().quantity;
                                    }
                                    dispatch(cartSuccess(keys, fetchedInfo, totalPrice));
                                })
                    }
                })
    }
}

export const deleteCart = (name) => {
    return dispatch => {
        var ref = firebase.database().ref('Cart');
        ref.orderByChild('name').equalTo(name).on("value", snapshot => {
            snapshot.forEach(child => {
                firebase.database().ref('Cart/' + child.key).remove();
            }) 
            if(!snapshot.exists()) {
                dispatch(deleteSuccess());
            }
        })
        dispatch(getCart());
    }
}

