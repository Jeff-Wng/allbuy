import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    keys: [],
    cart: [],
    totalPrice: '',
    hasItems: false
}

// Item added to cart success, update state with item info
const cartSuccess = (state, action) =>{
    return updateObject(state, {
        keys: action.keys,
        cart: action.cart,
        totalPrice: action.totalPrice,
        hasItems: true
    })
}

const deleteSuccess = (state, action) => {
    return updateObject(state, {
        hasItems: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CART_SUCCESS: return cartSuccess(state, action);
        case actionTypes.DELETE_SUCCESS: return deleteSuccess(state, action);
        default: return state;
    }
}

export default reducer;