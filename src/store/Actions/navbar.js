import * as actionTypes from './actionTypes';

// Item added to cart
export const added = () => {
    return {
        type: actionTypes.ADDED
    }
}

// Reset notification status
export const reset = () => {
    return {
        type: actionTypes.RESET
    }
}
