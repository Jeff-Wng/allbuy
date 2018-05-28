import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    name: '',
    email: '',
    password: '',
    loggedIn: false,
    error: ''
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        email: action.email,
        password: action.password,
        loggedIn: true
    })
}

const authOut = (state, action) => {
    return updateObject(state, {
        name: '',
        email: '',
        password: '',
        loggedIn: false
    })
}

const getAuthErr = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
} 

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_OUT: return authOut(state, action);
        case actionTypes.GET_AUTH_ERR: return getAuthErr(state, action);
        default: return state;
    }
}

export default reducer;

