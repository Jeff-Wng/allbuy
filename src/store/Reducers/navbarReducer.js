import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    added: false
}

const added = (state, action) =>{
    return updateObject(state, {
        added: true
    })
}

const reset = (state, actin) => {
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