import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import 'firebase/auth';

// Auth success, user info passed to state
export const authSuccess = (name, email, password) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        name: name,
        email: email,
        password: password,
        loggedIn: true
    }
}

// User log out, remove all user info stored in sessionStorage
export const authOut = () => {
    sessionStorage.removeItem('displayName');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('passwsord');
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

// User authentication
export const auth = (name, email, password, signUp) => {
    return dispatch => {
        // If user is signing up, calls firebase with new email and password
        if(signUp) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => { 
                    // Fetch new user data
                    user = firebase.auth().currentUser;
                    if(user) {
                        user.updateProfile({
                            displayName: name
                        })
                    }
                    // Stores new user data in sessionStorage
                    dispatch(authSuccess(name, email, password));
                    sessionStorage.setItem('displayName', name);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('password', password);
                })
                .catch(err => {
                    dispatch(getAuthErr(err.message));
                })
        // If user is returning, calls firebase with existing email and password
        } else if (!signUp) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(response => {
                    // Stores current user data in sessionStorage
                    dispatch(authSuccess(response.user.displayName, response.user.email, password));
                    sessionStorage.setItem('displayName', response.user.displayName);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('password', password);
                })
                .catch(err => {
                    dispatch(getAuthErr(err.message));
                })
        }
    }
}

// User sign out
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

// Checks authentication, checks if sessionStorage has a user stored
// If has info stored, someone is authenicated, else no one is
export const checkAuth = () => {
    return dispatch => {
        const name = sessionStorage.getItem('displayName');
        const email = sessionStorage.getItem('email');
        const password = sessionStorage.getItem('password');
        if(email) {
            dispatch(authSuccess(name, email, password));
        } else {
            dispatch(authOut());
        }
    }
}
