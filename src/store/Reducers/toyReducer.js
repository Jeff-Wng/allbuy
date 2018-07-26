import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    items: []
}

// Toy items successfully retrieved from Firebase
const toySuccess = (state, action) =>{
    return updateObject(state, {
        items: action.items
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TOY_SUCCESS: return toySuccess(state, action);
        default: return state;
    }
}

export default reducer;