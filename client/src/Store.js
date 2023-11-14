import { applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import {composeWithDevTools}  from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const intialState = {}
const middleware = []

const Store = configureStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store

