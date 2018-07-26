import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import authReducer from './store/Reducers/authReducer';
import apparelReducer from './store/Reducers/apparelReducer';
import gameReducer from './store/Reducers/gameReducer';
import toyReducer from './store/Reducers/toyReducer';
import navbarReducer from './store/Reducers/navbarReducer';
import cartReducer from './store/Reducers/cartReducer';

// Initialize Google Firebase
var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_URL,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: "allbuy-restore",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID
  };
firebase.initializeApp(config);

const rootReducer = combineReducers({
    auth: authReducer,
    apparel: apparelReducer,
    game: gameReducer,
    toy: toyReducer,
    navbar: navbarReducer,
    cart: cartReducer
})

// Chrome Redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();

