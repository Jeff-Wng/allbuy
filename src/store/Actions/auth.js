import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import 'firebase/auth';

export const authSuccess = (name, email, password) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        name: name,
        email: email,
        password: password,
        loggedIn: true
    }
}

export const authOut = () => {
    localStorage.removeItem('displayName');
    localStorage.removeItem('email');
    localStorage.removeItem('passwsord');
    return {
        type: actionTypes.AUTH_OUT
    }
}

export const getAuthErr = (error) => {
    return {
        type: actionTypes.GET_AUTH_ERR,
        error: error
    }
}

export const auth = (name, email, password, signUp) => {
    return dispatch => {
        if(signUp) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => { 
                    user = firebase.auth().currentUser;
                    if(user) {
                        user.updateProfile({
                            displayName: name
                        })
                    }
                    dispatch(authSuccess(name, email, password));
                    localStorage.setItem('displayName', name);
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                })
                .catch(err => {
                    dispatch(getAuthErr(err.message));
                })
        } else if (!signUp) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(response => {
                    dispatch(authSuccess(response.user.displayName, response.user.email, password));
                    localStorage.setItem('displayName', response.user.displayName);
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                })
                .catch(err => {
                    dispatch(getAuthErr(err.message));
                })
        }
    }
}

export const signOut = () => {
    return dispatch => {
        firebase.auth().signOut()
        .then(response => {;
            dispatch(authOut());
        })
        .catch(err => {
            dispatch(getAuthErr(err.message));
        })
    }
}

export const checkAuth = () => {
    return dispatch => {
        const name = localStorage.getItem('displayName');
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        if(email) {
            dispatch(authSuccess(name, email, password));
        } else {
            dispatch(authOut());
        }
    }
}
