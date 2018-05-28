import * as actionTypes from './actionTypes';

export const added = () => {
    return {
        type: actionTypes.ADDED
    }
}

export const reset = () => {
    return {
        type: actionTypes.RESET
    }
}
