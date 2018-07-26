import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    items: []
}

// Game catelog successfully retrieved from Firebase
// Adds all Game item info into array in state
const gameSuccess = (state, action) =>{
    return updateObject(state, {
        items: action.items
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GAME_SUCCESS: return gameSuccess(state, action);
        default: return state;
    }
}

export default reducer;