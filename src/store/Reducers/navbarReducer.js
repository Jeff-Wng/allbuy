import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    added: false
}

// changes state added to true to reveal 'Add to cart' notification
const added = (state, action) =>{
    return updateObject(state, {
        added: true
    })
}

// Resets added state on each componentDidMount to close 'Add to cart' notification
const reset = (state, action) => {
    return updateObject(state, {
        added: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADDED: return added(state, action);
        case actionTypes.RESET: return reset(state, action);
        default: return state;
    }
}

export default reducer;