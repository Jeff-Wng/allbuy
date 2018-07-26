import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    items: []
}

// Apparel items successfully retrieved from Firebase
const apparelSuccess = (state, action) =>{
    return updateObject(state, {
        items: action.items
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.APPAREL_SUCCESS: return apparelSuccess(state, action);
        default: return state;
    }
}

export default reducer;